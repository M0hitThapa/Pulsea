import { db } from "@/db";
import { feedbacks } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages, projectId } = await req.json();

    if (!projectId) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }

    const projectFeedbacks = await db
      .select()
      .from(feedbacks)
      .where(eq(feedbacks.projectId, projectId));

    const systemPrompt = `
      You are an AI assistant for a SaaS owner. You have access to the feedback received for a specific project.
      Here is the feedback data:
      ${JSON.stringify(projectFeedbacks, null, 2)}

      Your goal is to answer the user's specific questions based on this data.
            - Do NOT provide a general summary unless explicitly asked.
      - Answer directly and concisely.
      - If the user asks about features, look for suggestions or feature requests in the feedback.
      - If the user asks about bugs, look for bug reports.
      - If the user asks for general insights, then you can provide a broader analysis.
      - Be helpful, professional, and conversational.
    `;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY} `,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.0-flash-001",
          messages: [{ role: "system", content: systemPrompt }, ...messages],
        }),
      }
    );

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in AI chat:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
