"use client";

import { useQuery } from "@tanstack/react-query";
import { projects as dbProjects, feedbacks as dbFeedbacks } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

type Project = InferSelectModel<typeof dbProjects>;
type Feedback = InferSelectModel<typeof dbFeedbacks>;

export type ProjectWithFeedbacks = Project & {
    feedbacks: Feedback[];
};

// Fetch a single project with its feedbacks
async function fetchProjectDetails(
    projectId: string
): Promise<ProjectWithFeedbacks> {
    const response = await fetch(`/api/projects/${projectId}`);
    if (!response.ok) {
        throw new Error("Failed to fetch project details");
    }
    return response.json();
}

export function useProjectDetails(projectId: string) {
    return useQuery({
        queryKey: ["project", projectId],
        queryFn: () => fetchProjectDetails(projectId),
        enabled: !!projectId,
        staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    });
}
