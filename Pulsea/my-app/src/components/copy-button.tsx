"use client";

import { Clipboard } from "lucide-react";
import { Button } from "./ui/button";

export const CopyButton = ({ text }: { text: string }) => {
  const copyToClipboard = ({ text }: { text: string }) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log("copied to clipboard");
    });
  };
  return (
    <div>
      <Button onClick={() => copyToClipboard({ text })}>
        <Clipboard />
      </Button>
    </div>
  );
};
