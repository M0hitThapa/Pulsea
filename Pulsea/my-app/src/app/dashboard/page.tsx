import { Container } from "@/components/container";
import NewProjectButton from "@/components/newproject-btn";
import { db } from "@/db";
import { Projects } from "@/db/schema";

import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";

const Page = async () => {
  const { userId } = await auth();
  const user = await currentUser();
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
