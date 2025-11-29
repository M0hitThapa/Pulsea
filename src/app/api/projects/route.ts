import { db } from "@/db";
import { projects } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userProjects = await db
            .select()
            .from(projects)
            .where(eq(projects.userId, userId));

        return NextResponse.json(userProjects);
    } catch (error) {
        console.error("Error fetching projects:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { name, description, url, logoUrl } = body;

        // Validate required fields
        if (!name || !url) {
            return NextResponse.json(
                { error: "Name and URL are required" },
                { status: 400 }
            );
        }

        const [newProject] = await db
            .insert(projects)
            .values({
                name,
                description: description || "",
                url,
                logoUrl: logoUrl || null,
                userId,
            })
            .returning({ id: projects.id });

        return NextResponse.json({ id: newProject.id }, { status: 201 });
    } catch (error) {
        console.error("Error creating project:", error);
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

        // Verify ownership before deleting
        const project = await db.query.projects.findFirst({
            where: eq(projects.id, parseInt(projectId)),
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

        await db.delete(projects).where(eq(projects.id, parseInt(projectId)));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting project:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
