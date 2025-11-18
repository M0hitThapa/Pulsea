import { Container } from "@/components/container";
import { Navbar } from "@/components/navbar";
import { Widget } from "@/components/widget";
import Image from "next/image";

export default function Home() {
  return (
    <Container>
      <Navbar />
      <div className=" mt-16 md:mt-28">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col items-center justify-center gap-2 text-md sm:text-3xl md:text-4xl font-semibold text-shadow-md text-neutral-900 dark:text-neutral-200 ">
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
        </div>

        <div className="max-w-4xl flex mt-12 mx-4 md:mx-10">
          <Image
            src="/hero.png"
            alt="hero-section"
            height={2000}
            width={2000}
            className="rounded "
          />
        </div>
      </div>
      <Widget />
    </Container>
  );
}
