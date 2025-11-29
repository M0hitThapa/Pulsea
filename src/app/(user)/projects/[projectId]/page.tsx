"use client";

import { FeedbackSidebar } from "@/components/feedback/feedback-sidebar";
import { useProjectDetails } from "@/hooks/use-project-details";
import { useParams } from "next/navigation";
import { PageLoaderComponent } from "@/components/page-loader";

const Page = () => {
  const params = useParams();
  const projectId = params?.projectId as string;

  const { data: project, isLoading, error } = useProjectDetails(projectId);

  if (!projectId) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-neutral-600 dark:text-neutral-400">
          Invalid project ID
        </p>
      </div>
    );
  }

  if (isLoading) {
    return <PageLoaderComponent isLoading={isLoading} />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4 text-center">
        <div className="text-4xl mb-4">⚠️</div>
        <h2 className="text-xl font-semibold mb-2">Failed to load project</h2>
        <p className="text-neutral-600 dark:text-neutral-300 max-w-sm">
          {error instanceof Error
            ? error.message
            : "An error occurred while loading the project."}
        </p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-neutral-600 dark:text-neutral-400">
          Project not found
        </p>
      </div>
    );
  }

  return (
    <div>
      <div>
        <FeedbackSidebar
          projectId={parseInt(projectId)}
          feedbackData={project.feedbacks}
        />
      </div>
    </div>
  );
};

export default Page;
