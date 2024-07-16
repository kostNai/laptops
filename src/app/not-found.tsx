import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold">404 Somthing wrong, try later.</h2>
        <Link href='/' className="font-bold underline">Back to home page</Link>
    </div>
  )
}
