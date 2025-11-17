import { projects } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";
import {
  Card,
  CardTitle,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Container } from "@/components/container";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Project = InferSelectModel<typeof projects>;

type Props = {
  projects: Project[];
};

const ProjectList = async (props: Props) => {
  return (
    <Container>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {props.projects.map((project: Project) => (
          <li
            key={project.id}
            className="shadow-inner shadow-neutral-950 dark:shadow-neutral-100"
          >
            <Card className="h-88 w-80   z-10 inset-0 flex flex-col justify-between bg-linear-to-b from-neutral-100  to-white dark:from-neutral-900 dark:to-neutral-800">
              <CardHeader className="flex items-start justify-between">
                <div className="flex flex-col gap-5">
                  <CardTitle className="text-2xl font-semibold text-shadow-2xs">
                    {project.name}
                  </CardTitle>
                  <CardDescription className="text-sm font-medium ">
                    {project.description}
                  </CardDescription>
                </div>
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
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="icon icon-tabler icons-tabler-outline icon-tabler-link"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
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
              </CardHeader>

              <CardFooter className="flex justify-between items-center">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link href={`/projects/${project.id}/instructions`}>
                      <Button
                        variant="outline"
                        className="cursor-pointer  border-e-2 bg-white dark:bg-neutral-900 dark:text-neutral-100  rounded-md shadow-md/20 p-1 text-neutral-900 font-semibold text-shadow-2xs"
                      >
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
                  <button className="cursor-pointer text-xs px-3 py-1.5 border border-neutral-300 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-950 rounded-md flex  gap-0.5 items-center justify-center   ">
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
                      className="icon icon-tabler icons-tabler-outline icon-tabler-eye-dotted"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                      <path d="M21 12h.01" />
                      <path d="M3 12h.01" />
                      <path d="M5 15h.01" />
                      <path d="M5 9h.01" />
                      <path d="M19 15h.01" />
                      <path d="M12 18h.01" />
                      <path d="M12 6h.01" />
                      <path d="M8 17h.01" />
                      <path d="M8 7h.01" />
                      <path d="M16 17h.01" />
                      <path d="M16 7h.01" />
                      <path d="M19 9h.01" />
                    </svg>
                    View Project
                  </button>
                </Link>

                {/* Embed Code Button */}
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default ProjectList;
