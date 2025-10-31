import { Container } from "@/components/container";
import NewProjectButton from "@/components/newproject-btn";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";

const Page = () => {
  return (
    <Container>
      <header className="my-2 flex items-center justify-between">
        <Link href="/">Pulsea</Link>
        <div className="bg-neutral-900 text-white px-4 py-2 rounded-md">
          <SignOutButton />
        </div>
      </header>
      <NewProjectButton />
    </Container>
  );
};

export default Page;
