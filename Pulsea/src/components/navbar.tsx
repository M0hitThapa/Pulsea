"use client";
import Link from "next/link";
import { Container } from "./container";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

export const Navbar = () => {
  const { isLoaded, isSignedIn } = useUser();
  const router = useRouter();

  function onSend() {
    if (!isLoaded) return;
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }
    router.push("/dashboard");
  }
  return (
    <Container className="flex items-center justify-between my-2 ">
      <Link href="/">Pulsea</Link>
      <div>
        {isSignedIn ? (
          <>
            <Button onClick={() => onSend()}>Dashboard</Button>
          </>
        ) : (
          <>
            <Button onClick={() => onSend()}>SignIn</Button>
          </>
        )}
      </div>
    </Container>
  );
};
