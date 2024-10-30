import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center">
      <h2 className="text-8xl font-bold">404</h2>
      <h2 className="text-2xl font-semibold">Page Not Found </h2>
      <p>Could not find requested resource</p>
      <Link
        href="/"
        className="text-xl font-semibold text-blue-500 hover:text-blue-700 hover:underline"
      >
        {"<- Return Home"}
      </Link>
    </div>
  );
}
