import { Container } from "@/components/container";
import NewProjectButton from "@/components/newproject-btn";
import { db } from "@/db";
import { Projects } from "@/db/schema";

import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import ProjectList from "./project-list";

const Page = async () => {
  const { userId } = await auth();
  if (!userId) {
    return null;
  }

  const userProjects = await db
    .select()
    .from(Projects)
    .where(eq(Projects.userId, userId));
  return (
    <Container>
      <header className="my-2 flex items-center justify-between">
        <Link href="/">Pulsea</Link>
        <div className="bg-neutral-900 text-white px-4 py-2 rounded-md">
          <SignOutButton />
        </div>
      </header>
      <NewProjectButton />
      <ProjectList projects={userProjects} />
    </Container>
  );
};

export default Page;
