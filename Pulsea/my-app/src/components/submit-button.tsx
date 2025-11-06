"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit">
      {pending ? (
        <>
          <Loader2 className="animate-spin mr-2 h-4 w-4" />
          creating...
        </>
      ) : (
        "create project"
      )}
    </Button>
  );
};

export default SubmitButton;
