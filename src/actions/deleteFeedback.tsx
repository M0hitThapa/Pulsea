"use server";

import { db } from "@/db";
import { feedbacks } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function deleteFeedback(feedbackId: number) {
  try {
    await db.delete(feedbacks).where(eq(feedbacks.id, feedbackId));
    return {
      success: true,
    };
  } catch (error) {
    console.log("failed to delete feedback", error);
    return {
      success: false,
      error: "failed to delete feedback",
    };
  }
}
