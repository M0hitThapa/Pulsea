import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { createProject } from "@/app/actions/createProject";
import { SubmitButton } from "./submit-button";
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
            Create a new project to get started
          </DialogDescription>
        </DialogHeader>
        <form action={createProject} className="flex flex-col gap-2 ">
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" placeholder="Project Name" />
          <Label htmlFor="url">URL</Label>
          <Input id="url" name="url" placeholder="https://example.com" />
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Description(Optional)"
          />
        </form>
        <SubmitButton />
      </DialogContent>
    </Dialog>
  );
};

export default NewProjectButton;
