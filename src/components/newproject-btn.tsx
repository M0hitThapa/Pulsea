import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { createProject } from "@/actions/createProject";
import SubmitButton from "./submit-button";
import CustomButton from "./custom-button";

const NewProjectButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <CustomButton className="flex gap-1 items-center justify-center">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="icon icon-tabler icons-tabler-filled icon-tabler-library-plus"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18.333 2a3.667 3.667 0 0 1 3.667 3.667v8.666a3.667 3.667 0 0 1 -3.667 3.667h-8.666a3.667 3.667 0 0 1 -3.667 -3.667v-8.666a3.667 3.667 0 0 1 3.667 -3.667zm-4.333 4a1 1 0 0 0 -1 1v2h-2a1 1 0 0 0 0 2h2v2a1 1 0 0 0 2 0v-2h2a1 1 0 0 0 0 -2h-2v-2a1 1 0 0 0 -1 -1" />
            <path d="M3.517 6.391a1 1 0 0 1 .99 1.738c-.313 .178 -.506 .51 -.507 .868v10c0 .548 .452 1 1 1h10c.284 0 .405 -.088 .626 -.486a1 1 0 0 1 1.748 .972c-.546 .98 -1.28 1.514 -2.374 1.514h-10c-1.652 0 -3 -1.348 -3 -3v-10.002a3 3 0 0 1 1.517 -2.605" />
          </svg>{" "}
          Create Project
        </CustomButton>
      </DialogTrigger>
      <DialogContent className="bg-neutral-100 dark:bg-neutral-950 ">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-shadow-2xs">
            New Project
          </DialogTitle>
          <DialogDescription className="text-sm font-medium ">
            Create a new Project to get started.
          </DialogDescription>
        </DialogHeader>

        <form action={createProject} className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Project Name" />
          <Label htmlFor="url">URL</Label>
          <Input id="url" name="url" placeholder="https://example.dom" />
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Description(Optional)"
          />
          <SubmitButton />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewProjectButton;
