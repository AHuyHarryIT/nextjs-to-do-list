import { SidebarTrigger } from "@components/ui/sidebar";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-background/95 w-full shadow-md">
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <Link href={"/"}>LOGO</Link>
        </div>
      </div>
    </header>
  );
}
