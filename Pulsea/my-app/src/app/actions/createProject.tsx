"use server";

import { db } from "@/db";
import { Projects } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function createProject(formData: FormData) {
  const { userId } = await auth();

  const project = {
    name: formData.get("name") as string,
    description: formData.get("description") as string,
    url: formData.get("url") as string,
    userId,
  };

  const [newProject] = await db
    .insert(Projects)
    .values(project)
    .returning({ insertedId: Projects.id });

  return newProject.insertedId;
}
