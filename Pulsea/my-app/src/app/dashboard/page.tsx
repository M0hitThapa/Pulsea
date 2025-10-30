import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";

const Page = () => {
  return (
    <Container className="my-2 flex items-center justify-between">
      <Link href="/">Pulsea</Link>
      <Button type="button">
        <SignOutButton />
      </Button>
    </Container>
  );
};

export default Page;
