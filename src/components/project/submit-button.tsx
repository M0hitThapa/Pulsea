"use client";

import { useFormStatus } from "react-dom";

import { Loader2 } from "lucide-react";
import CustomButton from "../custom-button";
import { Button } from "../ui/button";

const SubmitButton = ({ disabled }: { disabled?: boolean }) => {
  const { pending } = useFormStatus();
  const isLoading = pending || disabled;

  return (
    <Button
      type="submit"
      disabled={isLoading}
      className="flex gap-1 items-center justify-center bg-neutral-800 hover:bg-neutral-700 dark:hover:bg-neutral-100 cursor-pointer dark:bg-neutral-200 rounded-sm text-neutral-100 dark:text-neutral-800 border-neutral-600 dark:border-neutral-400 p-4 border-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoading ? (
        <div className="flex gap-1 items-center justify-center">
          <Loader2 className="animate-spin mr-2 h-4 w-4" />
          creating...
        </div>
      ) : (
        "create project"
      )}
    </Button>
  );
};

export default SubmitButton;
