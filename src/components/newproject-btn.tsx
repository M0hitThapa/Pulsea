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

const NewProjectButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Project</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Project</DialogTitle>
          <DialogDescription>
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
