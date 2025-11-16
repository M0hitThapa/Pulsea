"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import CustomButton from "./custom-button";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <CustomButton type="submit">
      {pending ? (
        <>
          <Loader2 className="animate-spin mr-2 h-4 w-4" />
          creating...
        </>
      ) : (
        "create project"
      )}
    </CustomButton>
  );
};

export default SubmitButton;
