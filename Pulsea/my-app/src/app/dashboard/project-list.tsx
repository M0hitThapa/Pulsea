import { Projects } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

type Project = InferSelectModel<typeof Projects>;

type Props = {
  projects: Project[];
};

const ProjectList = (props: Props) => {
  return (
    <div>
      <h1>Project List</h1>

      <ul>
        {props.projects.map((project: Project) => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
