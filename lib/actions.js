"use server";

import { auth } from "@/auth";
import dbConnect from "@/lib/db";
import LinkModel from "@/models/Link";
import { revalidatePath } from "next/cache";

export async function createLink(formData) {
  const session = await auth();

  // 1. Security Check
  if (!session?.user?.id) {
    throw new Error("You must be logged in to perform this action");
  }

  await dbConnect();

  const title = formData.get("title");
  const url = formData.get("url");
  const rawTags = formData.get("tags") || "";

  // 2. Process Tags (Turn "Work, Tech" into ["work", "tech"])
  const tagsArray = rawTags
    .split(",")
    .map((tag) => tag.trim().toLowerCase())
    .filter((tag) => tag !== "");

  try {
    // 3. Create the document in MongoDB
    await LinkModel.create({
      title,
      url,
      tags: tagsArray,
      owner: session.user.id, // The "ID Stamp" we talked about!
    });

    // 4. Tell Next.js to refresh the data on the links page
    revalidatePath("/links");
    return { success: true };
  } catch (error) {
    console.error("Database Error:", error);
    return { error: "Failed to create link." };
  }
}
