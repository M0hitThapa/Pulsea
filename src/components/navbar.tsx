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
    <Container>
      <motion.nav
        animate={{
          boxShadow: scrolled ? "var(--shadow-acertinity)" : "none",
          width: scrolled ? "40%" : "100%",
          y: scrolled ? 10 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: "linear",
        }}
        className=" inset-x-0 top-0 z-50 mx-auto flex max-w-5xl items-center justify-between rounded-full p-2"
      >
        <Link
          href="/"
          className="text-lg md:text-2xl font-semibold text-shadow-2xl flex gap-1 items-center justify-center "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="icon icon-tabler icons-tabler-filled icon-tabler-bubble-text size-10 text-neutral-900 dark:text-neutral-100 p-1 border border-neutral-200 dark:border-neutral-900 rounded-md shadow-inner shadow-neutral-300 dark:shadow-neutral-700"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12.4 2l.253 .005a6.34 6.34 0 0 1 5.235 3.166l.089 .163l.178 .039a6.33 6.33 0 0 1 4.254 3.406l.105 .228a6.334 6.334 0 0 1 -5.74 8.865l-.144 -.002l-.037 .052a5.26 5.26 0 0 1 -5.458 1.926l-.186 -.051l-3.435 2.06a1 1 0 0 1 -1.508 -.743l-.006 -.114v-2.435l-.055 -.026a3.67 3.67 0 0 1 -1.554 -1.498l-.102 -.199a3.67 3.67 0 0 1 -.312 -2.14l.038 -.21l-.116 -.092a5.8 5.8 0 0 1 -1.887 -6.025l.071 -.238a5.8 5.8 0 0 1 5.42 -4.004h.157l.15 -.165a6.33 6.33 0 0 1 4.33 -1.963zm1.6 11h-5a1 1 0 0 0 0 2h5a1 1 0 0 0 0 -2m3 -4h-10a1 1 0 1 0 0 2h10a1 1 0 0 0 0 -2" />
          </svg>
          Pulsea
        </Link>
        <div className="flex gap-2 justify-center items-center ">
          <ModeToggle />
          <div className="rounded-md">
            {isSignedIn ? (
              <>
                <CustomButton onClick={() => onSend()}>Dashboard</CustomButton>
              </>
            ) : (
              <>
                <CustomButton onClick={() => onSend()}>SignIn</CustomButton>
              </>
            )}
          </div>
        </div>
      </motion.nav>
    </Container>
  );
};
