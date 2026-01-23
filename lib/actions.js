"use server";

import dbConnect from "./db";
import LinkModel from "@/models/Link";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function createLink(formData) {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  await dbConnect();

  const title = formData.get("title");
  const url = formData.get("url");
  const description = formData.get("description");
  const rawTags = formData.get("tags") || "";

  // THE SLUGIFY LOGIC
  const cleanTags = rawTags
    .split(",") // Split by comma
    .map(
      (tag) =>
        tag
          .trim()
          .toLowerCase()
          .replace(/\s+/g, "-") // Replace spaces with hyphens
          .replace(/[^a-z0-9-]/g, "") // Remove special characters
    )
    .filter((tag) => tag.length > 0); // Remove empty strings

  try {
    await LinkModel.create({
      title,
      url,
      description,
      tags: cleanTags,
      owner: session.user.id,
    });

    revalidatePath("/links");
    revalidatePath("/tags"); // Important to refresh the Cloud page too!
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export async function deleteLink(linkId) {
  const session = await auth();
  if (!session) return { success: false, error: "Unauthorized" };

  await dbConnect();

  try {
    // Security: Only delete if the link belongs to the logged-in user
    const result = await LinkModel.deleteOne({
      _id: linkId,
      owner: session.user.id,
    });

    if (result.deletedCount === 1) {
      revalidatePath("/links");
      revalidatePath("/tags"); // Refresh tags in case this was the last link with a certain tag
      return { success: true };
    }
    return { success: false, error: "Link not found or unauthorized" };
  } catch (e) {
    return { success: false, error: "Database error" };
  }
}

export async function deleteTagGlobally(tagName) {
  const session = await auth();
  if (!session) return { success: false };

  await dbConnect();

  try {
    // $pull removes the specific string from the 'tags' array in all matching documents
    await LinkModel.updateMany(
      { owner: session.user.id, tags: tagName },
      { $pull: { tags: tagName } }
    );

    revalidatePath("/links");
    revalidatePath("/tags");
    return { success: true };
  } catch (e) {
    return { success: false };
  }
}

export async function updateLink(linkId, formData) {
  const session = await auth();
  if (!session) return { success: false };

  await dbConnect();

  const title = formData.get("title");
  const url = formData.get("url");
  const description = formData.get("description");
  const rawTags = formData.get("tags") || "";

  // Reuse your slugify logic
  const cleanTags = rawTags
    .split(",")
    .map((tag) =>
      tag
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
    )
    .filter((tag) => tag.length > 0);

  try {
    await LinkModel.findOneAndUpdate(
      { _id: linkId, owner: session.user.id }, // Security: Must own it
      { title, url, description, tags: cleanTags },
      { new: true }
    );

    revalidatePath("/links");
    revalidatePath("/tags");
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
