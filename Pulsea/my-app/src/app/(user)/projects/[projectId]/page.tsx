import { db } from "@/db";
import { Projects } from "@/db/schema";
import { eq } from "drizzle-orm";

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

  const project = await db.query.Projects.findMany({
    where: eq(Projects.id, parseInt(projectId)),
  });

  console.log(project);
  return <div>Project Page{projectId}</div>;
};

export default Page;
