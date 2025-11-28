"use client";

import NewProjectButton from "@/components/project/newproject-btn";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const Sidebar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-72 bg-neutral-100 border-r-2 border-neutral-200 dark:border-neutral-800 dark:bg-neutral-900 h-screen flex flex-col items-start">
      <Link
        href="/"
        className="text-lg md:text-2xl font-semibold text-shadow-2xl flex gap-1 items-center justify-center p-2 "
      >
        <Image
          src="/navlogo.png"
          alt="logoimage"
          height={500}
          width={500}
          className="size-12"
        />{" "}
        Pulsea
      </Link>
      <div className="flex flex-col items-center justify-center gap-2 mt-5 ml-4 ">
        <NewProjectButton />
      </div>
    </div>
  );
};
