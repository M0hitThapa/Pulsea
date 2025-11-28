"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { feedbacks as dbFeedbacks } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import { deleteFeedback } from "@/actions/deleteFeedback";
type Feedback = InferSelectModel<typeof dbFeedbacks>;

// Fetch feedbacks for a specific project
async function fetchFeedbacks(projectId: string): Promise<Feedback[]> {
  const response = await fetch(`/api/projects/${projectId}/feedbacks`);
  if (!response.ok) {
    throw new Error("Failed to fetch feedbacks");
  }
  return response.json();
}

export function useFeedbacks(projectId: string) {
  return useQuery({
    queryKey: ["feedbacks", projectId],
    queryFn: () => fetchFeedbacks(projectId),
    enabled: !!projectId,
  });
}

export function useDeleteFeedback(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFeedback,
    onMutate: async (feedbackId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["feedbacks", projectId] });

      // Snapshot the previous value
      const previousFeedbacks = queryClient.getQueryData<Feedback[]>([
        "feedbacks",
        projectId,
      ]);

      // Optimistically update to the new value
      queryClient.setQueryData<Feedback[]>(
        ["feedbacks", projectId],
        (old) => old?.filter((f) => f.id !== feedbackId) ?? []
      );

      // Return a context object with the snapshotted value
      return { previousFeedbacks };
    },
    onError: (err, feedbackId, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      queryClient.setQueryData(
        ["feedbacks", projectId],
        context?.previousFeedbacks
      );
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ["feedbacks", projectId] });
    },
  });
}
