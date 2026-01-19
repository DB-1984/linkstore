import clientPromise from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("linkstore_db");

  const result = await db.collection("links").insertOne({
    title: "My First Link",
    url: "https://google.com",
    createdAt: new Date(),
  });

  return NextResponse.json({ message: "Success!", id: result.insertedId });
}
