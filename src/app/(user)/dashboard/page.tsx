import { Container } from "@/components/container";

import { db } from "@/db";
import { projects } from "@/db/schema";

import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { ProjectListClient } from "./project-list";
import DashNav from "./dash-nav";

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
    <Container>
      <DashNav />
      <div className="flex items-start justify-between mt-20">
        <ProjectListClient initialProjects={userProjects} />
      </div>
    </Container>
  );
};

export default Page;
