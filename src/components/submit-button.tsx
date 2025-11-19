"use client";

import { useFormStatus } from "react-dom";

import { Loader2 } from "lucide-react";
import CustomButton from "./custom-button";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <CustomButton type="submit">
      {pending ? (
        <div className="flex gap-1 items-center justify-center">
          <Loader2 className="animate-spin mr-2 h-4 w-4" />
          creating...
        </div>
      ) : (
        "create project"
      )}
    </CustomButton>
  );
};

export default SubmitButton;
