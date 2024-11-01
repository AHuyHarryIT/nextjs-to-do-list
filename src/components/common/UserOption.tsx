"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const UserOption = () => {
  const {data:session} = useSession();
  const router = useRouter();
  return session ? (
    <>
    <li>Hello, {session.user?.name}</li>
    <li className=" hover:text-blue-500">
      <button onClick={() => signOut({ callbackUrl: "/" })}>Sign Out</button>
    </li>
    </>
  ) : (
    <li className=" hover:text-blue-500">
      <button onClick={() => router.push("/login")}>Login</button>
    </li>
  );
};

export default UserOption;
