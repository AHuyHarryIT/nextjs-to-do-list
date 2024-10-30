import Link from "next/link";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Link
        href={"/tasks"}
        className="font-semibold text-blue-500 hover:text-blue-700 hover:underline"
      >
        {`< Back`}
      </Link>
      {children}
    </>
  );
}

export default Layout;
