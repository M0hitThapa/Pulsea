"use client";

import { useState } from "react";
import { InferSelectModel } from "drizzle-orm";
import { projects as dbProjects } from "@/db/schema";
import {
  Card,
  CardTitle,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DeleteProjectComponent } from "@/components/project/delete-project-component";
import { Container } from "@/components/container";

type Project = InferSelectModel<typeof dbProjects>;

export function ProjectListClient({
  initialProjects,
}: {
  initialProjects: Project[];
}) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const handleDelete = (projectId: number) => {
    setProjects((prev) => prev.filter((project) => project.id !== projectId));
  };
  if (projects.length === 0) {
    return (
      <div className="w-full flex flex-col items-center justify-center py-20 text-center">
        <div className="text-4xl mb-4">🗂️</div>

        <h2 className="text-xl font-semibold mb-2">No projects created yet</h2>

        <p className="text-neutral-600 dark:text-neutral-300 max-w-sm mb-6">
          Start by creating your first project — it only takes a few seconds.
        </p>
      </div>
    );
  }

  return (
    <Container className=" border-r border-l px-5 min-h-screen ">
      <h1 className=" text-xl md:text-3xl font-semibold tracking-tight text-shadow-2xs py-5 text-neutral-800 dark:text-neutral-200 flex items-center justify-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-big-down-lines size-4 md:size-8 font-black"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M15 12h3.586a1 1 0 0 1 .707 1.707l-6.586 6.586a1 1 0 0 1 -1.414 0l-6.586 -6.586a1 1 0 0 1 .707 -1.707h3.586v-3h6v3z" />
          <path d="M15 3h-6" />
          <path d="M15 6h-6" />
        </svg>
        Projects
      </h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6  pt-5  ">
        {projects.map((project: Project) => (
          <li key={project.id} className="">
            <Card className="h-80 w-auto z-10 inset-0 flex flex-col justify-between border-2 border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
              <CardHeader className="flex items-start justify-between">
                <div className="flex flex-col gap-5">
                  {project.logoUrl && (
                    <div className="size-12 rounded-lg overflow-hidden border border-neutral-200 dark:border-neutral-800 shadow-sm shrink-0">
                      <img
                        src={project.logoUrl}
                        alt={`${project.name} logo`}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <CardTitle className="text-2xl font-semibold text-shadow-2xs flex gap-1 items-center justify-start">
                    {project.name}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        {project.url ? (
                          <Link
                            href={project.url}
                            className="flex gap-1 items-center justify-center"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="icon icon-tabler icons-tabler-outline icon-tabler-link"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M9 15l6 -6" />
                              <path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464" />
                              <path d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463" />
                            </svg>
                          </Link>
                        ) : null}
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>visit your site</p>
                      </TooltipContent>
                    </Tooltip>
                  </CardTitle>
                  <CardDescription className="text-sm font-medium">
                    {project.description}
                  </CardDescription>
                </div>

                <DeleteProjectComponent
                  projectId={project.id}
                  onDelete={handleDelete}
                />
              </CardHeader>

              <CardFooter className="flex justify-between items-center">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href={`/projects/${project.id}/instructions`}>
                      <Button
                        variant="outline"
                        className="cursor-pointer border-e-2 bg-white dark:bg-neutral-900 dark:text-neutral-100 rounded-md shadow-md/20 p-1 text-neutral-900 font-semibold text-shadow-2xs"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="icon icon-tabler icons-tabler-outline icon-tabler-code"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M7 8l-4 4l4 4" />
                          <path d="M17 8l4 4l-4 4" />
                          <path d="M14 4l-4 16" />
                        </svg>
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Embed Code</p>
                  </TooltipContent>
                </Tooltip>

                <Link href={`/projects/${project.id}`}>
                  <button className="cursor-pointer text-sm  px-4 py-2 font-semibold border-2 border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-900 rounded-md flex gap-0.5 items-center justify-center">
                    Open
                  </button>
                </Link>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
    </Container>
  );
}
