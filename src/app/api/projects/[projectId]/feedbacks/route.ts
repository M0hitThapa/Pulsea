import { db } from "@/db";
import { feedbacks as dbFeedbacks, projects as dbProjects } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ projectId: string }> }
) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { projectId } = await params;

        // Verify project ownership
        const project = await db.query.projects.findFirst({
            where: eq(dbProjects.id, parseInt(projectId)),
        });

        if (!project) {
            return NextResponse.json(
                { error: "Project not found" },
                { status: 404 }
            );
        }

        if (project.userId !== userId) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        // Fetch feedbacks
        const projectFeedbacks = await db
            .select()
            .from(dbFeedbacks)
            .where(eq(dbFeedbacks.projectId, parseInt(projectId)));

        return NextResponse.json(projectFeedbacks);
    } catch (error) {
        console.error("Error fetching feedbacks:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
