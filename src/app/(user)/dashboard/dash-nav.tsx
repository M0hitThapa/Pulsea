import { Container } from "@/components/container";

import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import NewProjectButton from "@/components/newproject-btn";

const DashNav = async () => {
  const { userId } = await auth();
  if (!userId) {
    return null;
  }

  return (
    <Container>
      <header className="my-2 flex items-center justify-between">
        <Link href="/" className="text-2xl font-semibold text-shadow-2xl">
          Pulsea
        </Link>
        <div className="flex gap-2 items-center justify-center">
          <NewProjectButton />

          <div className="px-4 py-2 rounded-md shadow-md/20 shadow-neutral-900 cursor-pointer hover:bg-neutral-600 dark:bg-neutral-100 dark:shadow-neutral-200 bg-neutral-700 dark:hover:bg-neutral-200 text-md font-semibold text-shadow-2xs text-neutral-50 dark:text-neutral-950 ">
            <SignOutButton />
          </div>
        </div>
      </header>
    </Container>
  );
};

export default DashNav;
