"use server";

import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function deleteProject(projectId: number) {
  try {
    // Delete the project from the database
    await db.delete(projects).where(eq(projects.id, projectId));

    // Revalidate the projects page to reflect the changes
    revalidatePath("/projects");

    return { success: true };
  } catch (error) {
    console.error("Error deleting project:", error);
    return {
      success: false,
      error: "Failed to delete project. Please try again.",
    };
  }
}
