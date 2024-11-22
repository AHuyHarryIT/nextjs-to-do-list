"use client"

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const PROTECTED_PATHS = ["/tasks"]

const Wrapper = ({
    children }: Readonly<{ children: React.ReactNode }>
) => {
    const { status } = useSession();
    const pathname = usePathname();
    const router = useRouter();
    useEffect(() => {
        if (status === "authenticated" && pathname === "/login") {
            router.push("/");
        } else if (
            status === "unauthenticated" &&
            PROTECTED_PATHS.includes(pathname)
        ) {
            router.push("/login");
        }
    }, [pathname, router, status])

    if (pathname === "/login") {
        return <>{children}</>
    }
    if (status === "authenticated") {
        return <>{children}</>
    } else if (!PROTECTED_PATHS.includes(pathname)) {
        return <>{children}</>
    }

}

export default Wrapper;