"use client";
import Link from "next/link";
import { Container } from "./container";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import CustomButton from "./custom-button";
import Image from "next/image";

export const Navbar = () => {
  const { isLoaded, isSignedIn } = useUser();
  const [scrolled, setScrolled] = useState<boolean>(false);
  const router = useRouter();

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 20) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  function onSend() {
    if (!isLoaded) return;
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }
    router.push("/dashboard");
  }
  return (
    <Container className="">
      <nav className=" inset-x-0 top-0 z-50 mx-auto flex max-w-5xl items-center justify-between rounded-full p-2">
        <Link
          href="/"
          className="text-lg md:text-2xl font-semibold text-shadow-2xl flex gap-1 items-center justify-center "
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
        <div className="flex gap-2 justify-center items-center  ">
          <ModeToggle />
          <div className="rounded-md">
            {isSignedIn ? (
              <>
                <Button
                  className="bg-neutral-800 cursor-pointer dark:bg-neutral-200 hover:bg-neutral-700 dark:hover:bg-neutral-100 rounded-sm text-neutral-100 dark:text-neutral-800 border-neutral-600 dark:border-neutral-400 p-4 border-2"
                  onClick={() => onSend()}
                >
                  Dashboard
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="bg-neutral-800 cursor-pointer hover:bg-neutral-700 dark:hover:bg-neutral-100 dark:bg-neutral-200 rounded-sm text-neutral-100 dark:text-neutral-800 border-neutral-600 dark:border-neutral-400 p-4 border-2"
                  onClick={() => onSend()}
                >
                  SignIn
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>
    </Container>
  );
};
