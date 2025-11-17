"use server";

import { projects as dbProjects } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { eq } from "drizzle-orm";

export async function deleteProject(projectId: number) {
  try {
    await db.delete(dbProjects).where(eq(dbProjects.id, projectId));
    revalidatePath("/dashboard");
    return {
      success: true,
    };
  } catch (error) {
    console.log("failed to delete the project", error);
    return {
      success: false,
      error: "failed to delete project",
    };
  }
}
