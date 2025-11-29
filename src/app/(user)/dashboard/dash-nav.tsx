"use client";

import { Container } from "@/components/container";

import { SignOutButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import NewProjectButton from "@/components/project/newproject-btn";
import Image from "next/image";

const DashNav = () => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <Container className="flex  items-center justify-between border-b border-r border-l px-5 ">
      {/* <h1 className="text-2xl font-semibold text-shadow-2xs ">Projects</h1> */}
      <Link
        href="/"
        className="text-lg md:text-2xl font-semibold text-shadow-2xl flex gap-1 items-center justify-center py-2"
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
      <div className="flex gap-2 items-center justify-center ">
        <NewProjectButton />

        <Button
          asChild
          className="bg-red-500 cursor-pointer  rounded-sm text-neutral-50 font-semibold  border-red-200 dark:border-red-700 p-4 border-2 hover:bg-red-600"
        >
          <SignOutButton />
        </Button>
      </div>
    </Container>
  );
};

export default DashNav;
