"use server";
import dbConnect from "./db";
import LinkModel from "@/models/Link";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import User from "@/models/User";

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

export async function updatePassword(formData) {
  try {
    const session = await auth();
    if (!session) return { success: false, error: "Unauthorized" };

    await dbConnect();

    const currentPassword = formData.get("currentPassword");
    const newPassword = formData.get("newPassword");
    const confirmPassword = formData.get("confirmPassword");

    // Basic validation
    if (newPassword !== confirmPassword) {
      return { success: false, error: "New passwords do not match" };
    }

    if (newPassword.length < 8) {
      return {
        success: false,
        error: "Password must be at least 8 characters",
      };
    }

    // 1. Find the user (explicitly select password because it's usually hidden)
    const user = await User.findById(session.user.id).select("+password");
    if (!user) return { success: false, error: "User not found" };

    // 2. Use your Schema Method to check current password
    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      return { success: false, error: "Current password is incorrect" };
    }

    // 3. Set new password
    // The pre-save hook in your User model will automatically hash this
    user.password = newPassword;
    await user.save();

    return { success: true };
  } catch (error) {
    console.error("Password Update Error:", error);
    return { success: false, error: "Internal server error" };
  }
}

export async function registerUser(formData) {
  try {
    await dbConnect();
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    const userExists = await User.findOne({ email });
    if (userExists)
      return { success: false, error: "Email already registered" };

    // Mongoose hashes the password automatically via the pre-save hook
    await User.create({ name, email, password });

    return { success: true };
  } catch (error) {
    return { success: false, error: "Registration failed. Try again." };
  }
}
