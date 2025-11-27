"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { createProject } from "@/actions/createProject";
import SubmitButton from "./submit-button";
import CustomButton from "../custom-button";
import { useState } from "react";
import { Upload, X } from "lucide-react";
import { uploadFile } from "@/lib/supabase";
import { toast } from "sonner";

const NewProjectButton = ({ className }: { className?: string }) => {
  const [open, setOpen] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleLogochange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("logo file must be less than 2MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }
      setLogoFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string | null);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
  };
  const handleSubmit = async (formData: FormData) => {
    try {
      if (logoFile) {
        const fileName = `${Date.now()}-${logoFile.name}`;
        const logoUrl = await uploadFile("project-logos", fileName, logoFile);
        formData.append("logoUrl", logoUrl);
      }

      await createProject(formData);
      setOpen(false);
      setLogoFile(null);
      setLogoPreview(null);
    } catch (error) {
      toast.error("failed to upload image");
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          New Project
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

        <form action={handleSubmit} className="flex flex-col gap-2">
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
          <div className="flex flex-col gap-2">
            <Label htmlFor="logo">Project Logo: (optional)</Label>
            {logoPreview ? (
              <div className="relative w-32 h-32 border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-md overflow-hidden">
                <img
                  src={logoPreview}
                  alt="logo preview"
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={removeLogo}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 hover:bg-red-600 transition-colors"
                >
                  <X className="size-4 " />
                </button>
              </div>
            ) : (
              <Label
                htmlFor="logo"
                className="flex flex-col items-center justify-center border-2 border-dashed border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 hover:dark:border-neutral-600 cursor-pointer rounded-md transition-colors w-full h-32"
              >
                <Upload className="size-8 text-neutral-400 mb-2" />
                <span className="text-sm text-neutral-500">
                  click to upload logo
                </span>
                <span className="text-xs mt-1 text-neutral-400">
                  PNG, JPG up to 2MB
                </span>
                <input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={handleLogochange}
                  className="hidden"
                />
              </Label>
            )}
          </div>
          <SubmitButton />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewProjectButton;
