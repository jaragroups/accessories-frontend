import Image from "next/image";

import Link from "next/link";
import { Suspense } from "react";
import CenterLinks from "./CenterLinks";
import NavIcons from "./NavIcons";
import SearchBar from "./SearchBar";
import SmDvSidebar from "./SmDvSidebar/SmDvSidebar";

export default function Navbar() {
  return (
    <nav className="sticky top-0 left-0 z-50 flex h-[150px] flex-wrap items-center justify-between bg-[#163340] px-[21px] md:h-[82px] md:px-[47px]">
      <SmDvSidebar />

      <Link href="/">
        <Image src="/logo.png" alt="logo" width={160} height={46} priority />
      </Link>

      <CenterLinks />

      <Suspense fallback={<div>Loading...</div>}>
        <SearchBar />
      </Suspense>

      <NavIcons />
    </nav>
  );
}
