import { Container } from "@/components/container";

import { db } from "@/db";
import { projects } from "@/db/schema";

import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { ProjectListClient } from "./project-list";
import DashNav from "./dash-nav";
import { Sidebar } from "./dash-project";
import { useState } from "react";

const Page = async () => {
  const { userId } = await auth();
  if (!userId) {
    return null;
  }

  const userProjects = await db
    .select()
    .from(projects)
    .where(eq(projects.userId, userId));
  return (
    <div>
      <div className=" ">
        <DashNav />

        <ProjectListClient initialProjects={userProjects} />
      </div>
    </div>
  );
};

export default Page;
