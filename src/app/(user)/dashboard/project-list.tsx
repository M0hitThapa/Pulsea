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

type Project = InferSelectModel<typeof projects>;

type Props = {
  projects: Project[];
};

const ProjectList = (props: Props) => {
  return (
    <div>
      <h1>Project List</h1>

      <ul className="grid grid-cols-1 md:grid-cols-3">
        {props.projects.map((project: Project) => (
          <li key={project.id}>
            <Card>
              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href={`/projects/${project.id}`}>
                  <Button>View Project</Button>
                </Link>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
