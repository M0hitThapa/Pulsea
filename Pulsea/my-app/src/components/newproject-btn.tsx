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
        <form className="flex flex-col gap-2 ">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Project Name" />
          <Label htmlFor="url">URL</Label>
          <Input id="url" placeholder="https://example.com" />
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" placeholder="Description(Optional)" />
        </form>
        <DialogFooter>
          <Button>Create Project</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewProjectButton;
