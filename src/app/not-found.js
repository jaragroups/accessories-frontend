"use client";

import Image from "next/image";
import Link from "next/link";

export default function Error() {
  return (
    <div className="relative flex min-h-screen min-w-screen items-center justify-center overflow-hidden">
      <div className="relative min-h-full items-center overflow-hidden rounded-3xl bg-white p-10 text-center text-gray-800 shadow-xl md:flex md:text-left lg:p-20">
        <div className="w-full overflow-hidden md:w-1/2">
          <div className="mb-10 lg:mb-20">
            <Image src={"/logo.png"} alt="logo" width={100} height={70} />
          </div>
          <div className="mb-10 font-light text-gray-600 md:mb-20">
            <h1 className="mb-10 text-3xl font-black text-[#2f9ecf] uppercase lg:text-5xl">
              You seem to be lost!
            </h1>
            <p>The page you&apos;re looking for isn&apos;t available.</p>
            <p>Try searching again or use the Go Back button below.</p>
          </div>

          <Link
            href={"/"}
            className="mb-20 transform cursor-pointer rounded bg-[#2f9ecf] px-5 py-2 text-lg font-light text-white transition-all outline-none hover:bg-[#2583ac] focus:outline-none md:mb-0"
          >
            Go Back
          </Link>
        </div>
        <div className="w-full text-center md:w-1/2">
          <Image src={"/error.svg"} alt="error" width={500} height={700} />
        </div>

        <div className="bg-opacity-30 pointer-events-none absolute -top-64 right-20 h-96 w-64 -rotate-45 transform rounded-full bg-blue-200/20 md:-top-[28rem] md:right-32 md:h-full md:w-96" />
        <div className="bg-opacity-20 pointer-events-none absolute right-64 -bottom-[30rem] h-full w-96 -rotate-45 transform rounded-full bg-yellow-200/20" />
      </div>
    </div>
  );
}
