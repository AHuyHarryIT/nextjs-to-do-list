import Link from "next/link";
import React from "react";
import UserOption from "../common/UserOption";

export default function Header() {
  return (
    <header className="bg-gray-200">
      <div className="container mx-auto">
        <nav>
          <ul className="flex items-center gap-2 px-4 py-2 text-xl">
            <li className="hover:text-blue-500">
              <Link href={"/"}>Home</Link>
            </li>
            <li className="hover:text-blue-500">
              <Link href={"/tasks"}>To do list</Link>
            </li>
            <li className="flex-1"></li>
            <UserOption />
          </ul>
        </nav>
      </div>
    </header>
  );
}
