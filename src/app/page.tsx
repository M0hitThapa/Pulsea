import { Container } from "@/components/container";
import CustomButton from "@/components/custom-button";
import { Navbar } from "@/components/navbar";
import { Widget } from "@/components/widget";
import Image from "next/image";

import Link from "next/link";

export default function Home() {
  return (
    <Container>
      <Navbar />
      <div className=" mt-12 md:mt-20">
        <div className="flex flex-col justify-center items-center">
          <div className="my-5 bg-neutral-100 dark:bg-neutral-900 px-5 font-medium text-sm text-neutral-600 dark:text-neutral-400 py-0.5 rounded-full ">
            <h1 className="flex items-center gap-1 justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-mailbox text-teal-500"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10 21v-6.5a3.5 3.5 0 0 0 -7 0v6.5h18v-6a4 4 0 0 0 -4 -4h-10.5" />
                <path d="M12 11v-8h4l2 2l-2 2h-4" />
                <path d="M6 15h1" />
              </svg>
              Fulfill user request{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
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
              and grow more.
            </h1>
          </div>
          <div className="flex flex-col items-center justify-center gap-2 text-md sm:text-3xl md:4xl lg:text-5xl font-semibold text-shadow-md text-neutral-900 dark:text-neutral-200 ">
            <span>Collect User Feedback Effortlessly</span>{" "}
            <span>Right Inside Your SaaS.</span>
          </div>
          <p className="text-xs md:text-sm text-neutral-500 flex flex-col justify-center items-center mt-4 gap-1 mx-4 md:mx-10">
            <span className="text-center">
              Embed a lightweight widget into your product and start capturing
              real-time
            </span>{" "}
            <span className="text-center">
              user feedback, bugs, and insights—without interrupting the user
              experience.
            </span>
          </p>
          <Link href="/dashboard">
            <CustomButton className="mt-6">Get Started</CustomButton>
          </Link>
        </div>

        <Image
          src="/hero1.png"
          alt="hero-section"
          height={949}
          width={1771}
          className="rounded mt-6   "
        />

        <div></div>
      </div>
      <Widget />
    </Container>
  );
}
