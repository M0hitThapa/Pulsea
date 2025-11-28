"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { projects as dbProjects } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

type Project = InferSelectModel<typeof dbProjects>;

// Fetch all projects for the current user
async function fetchProjects(): Promise<Project[]> {
  const response = await fetch("/api/projects");
  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }
  return response.json();
}

// Delete a project
async function deleteProject(projectId: number): Promise<void> {
  const response = await fetch(`/api/projects/${projectId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete project");
  }
}

export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      // Invalidate and refetch projects
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}
