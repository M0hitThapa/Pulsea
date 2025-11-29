import { db } from "@/db";
import { projects as dbProjects } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, and } from "drizzle-orm";
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

        const projectData = await db.query.projects.findMany({
            where: eq(dbProjects.id, parseInt(projectId)),
            with: {
                feedbacks: true,
            },
        });

        const project = projectData[0];

        if (!project) {
            return NextResponse.json(
                { error: "Project not found" },
                { status: 404 }
            );
        }

        // Verify ownership
        if (project.userId !== userId) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        return NextResponse.json(project);
    } catch (error) {
        console.error("Error fetching project:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ projectId: string }> }
) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { projectId } = await params;
        const projectIdNum = parseInt(projectId);

        // First verify the project exists and user owns it
        const existingProject = await db.query.projects.findFirst({
            where: eq(dbProjects.id, projectIdNum),
        });

        if (!existingProject) {
            return NextResponse.json(
                { error: "Project not found" },
                { status: 404 }
            );
        }

        if (existingProject.userId !== userId) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        // Delete the project (cascade delete will handle feedbacks if configured)
        await db.delete(dbProjects)
            .where(and(
                eq(dbProjects.id, projectIdNum),
                eq(dbProjects.userId, userId)
            ));

        return NextResponse.json(
            { message: "Project deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting project:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
