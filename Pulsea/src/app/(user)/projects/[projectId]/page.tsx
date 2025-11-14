import { db } from "@/db";
import { projects as dbProjects } from "@/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

const Page = async ({
  params,
}: {
  params: Promise<{
    projectId: string;
  }>;
}) => {
  const { projectId } = await params;

  if (!projectId) {
    return <div>Invalid ProjectId</div>;
  }

  const projects = await db.query.projects.findMany({
    where: eq(dbProjects.id, parseInt(projectId)),
    with: {
      feedbacks: true,
    },
  });

  const project = projects[0];

  if (!project) {
    return <div>Project not found</div>;
  }

  console.log(project);
  return (
    <div>
      <h1>{project.name}</h1>
      <h2>{project.description}</h2>
      {project.url ? <Link href={project.url}>Visit site</Link> : null}
    </div>
  );
};

export default Page;
