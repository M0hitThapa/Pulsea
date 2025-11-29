"use client";

import { Container } from "@/components/container";
import CustomButton from "@/components/custom-button";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useUser();

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
      <Navbar />

      <div className=" mt-18 md:mt-24">
        <div className="flex flex-col justify-center items-center">
          <div className=" text-xs  md:text-sm text-neutral-600 dark:text-neutral-400 py-1 mb-3 ">
            <h1 className="flex items-start gap-1 justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-user-question text-rose-500"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                <path d="M6 21v-2a4 4 0 0 1 4 -4h3.5" />
                <path d="M19 22v.01" />
                <path d="M19 19a2.003 2.003 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" />
              </svg>
              Fulfill user request and grow more.
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-trending-up text-blue-500 "
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M3 17l6 -6l4 4l8 -8" />
                <path d="M14 7l7 0l0 7" />
              </svg>
            </h1>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 md:gap-2 text-md sm:text-3xl md:4xl lg:text-5xl font-semibold text-shadow-md text-neutral-900 dark:text-neutral-200 ">
            <span className="text-neutral-600 dark:text-neutral-400">
              Collect User Feedback Effortlessly
            </span>{" "}
            <span>Right Inside Your SaaS.</span>
          </div>
          <p className="text-xs md:text-sm text-neutral-500 flex flex-col justify-center items-center mt-7 md:mt-5 gap-1 mx-4 md:mx-10 tracking-tighter md:tracking-normal">
            <span className="text-center">
              Embed a lightweight widget into your product and start capturing
              real-time
            </span>{" "}
            <span className="text-center">
              user feedback, bugs, and insights—without interrupting the user
              experience.
            </span>
          </p>

          <Button
            onClick={onSend}
            className="mt-12 md:mt-8 cursor-pointer bg-neutral-800 hover:bg-neutral-700 dark:bg-neutral-200 dark:hover:bg-neutral-100 rounded-sm text-neutral-100 dark:text-neutral-800 border-neutral-600 dark:border-neutral-400 p-5 border-2"
          >
            Get Started
          </Button>
        </div>

        <div className=" squircle mt-12 md:mt-8 bg-neutral-300 rounded-lg dark:bg-neutral-800 mx-4">
          <Image
            src="/hero-black.png"
            alt="hero-section"
            height={949}
            width={1771}
            className="  rounded-lg squircle  skew-y-2 -skew-2 border-4 border-neutral-400 dark:border-neutral-800"
          />
        </div>
      </div>
    </Container>
  );
}
