"use client";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  const welcome = session ? `Welcome, ${session.user?.name}` : "Welcome";
  
  return (
    <div className="flex h-screen items-center justify-center text-3xl font-bold uppercase">
      <h1>{welcome}</h1>
    </div>
  );
}
