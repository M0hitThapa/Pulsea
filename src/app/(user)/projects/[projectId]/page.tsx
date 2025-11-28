import { FeedbackSidebar } from "@/components/feedback/feedback-sidebar";
import { db } from "@/db";
import { projects as dbProjects } from "@/db/schema";
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
    return <div>Invalid project Id</div>;
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

  return (
    <div>
      <div>
        {/* <Table data={project.feedbacks} /> */}
        <FeedbackSidebar
          projectId={parseInt(projectId)}
          feedbackData={project.feedbacks}
        />
      </div>
    </div>
  );
};

export default Page;
