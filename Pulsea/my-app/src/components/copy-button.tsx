import { Clipboard } from "lucide-react";
import { Button } from "./ui/button";

export const CopyButton = ({ text }: { text: string }) => {
  return (
    <div>
      <Button>
        <Clipboard />
      </Button>
    </div>
  );
};
