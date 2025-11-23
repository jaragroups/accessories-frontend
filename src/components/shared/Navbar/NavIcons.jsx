"use client";

import { logout } from "@/app/_actions/auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import useCart from "@/hooks/useCart";
import { PopoverClose } from "@radix-ui/react-popover";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { FaBagShopping } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";

export default function NavIcons() {
  const { cart } = useCart();

  return (
    <div className="flex items-center gap-3 text-2xl text-white md:order-last md:text-3xl">
      <Popover>
        <PopoverTrigger>
          <CgProfile className="hover:cursor-pointer" />
        </PopoverTrigger>

        <PopoverAnchor>
          <PopoverContent
            side="right"
            align="top"
            alignOffset={300}
            className={"mt-6.5 mr-4 max-w-[200px] p-3"}
          >
            <PopoverClose asChild>
              <Link href={"/profile/dashboard"} className="block h-full w-full">
                <Button
                  className={"w-[84%] cursor-pointer justify-start py-0"}
                  variant={"ghost"}
                >
                  Dashboard
                </Button>
              </Link>
            </PopoverClose>

            <PopoverClose asChild>
              <Link
                href={"/profile/my-profile"}
                className="block h-full w-full"
              >
                <Button
                  className={"w-[84%] cursor-pointer justify-start py-0"}
                  variant={"ghost"}
                >
                  Profile
                </Button>
              </Link>
            </PopoverClose>

            <Separator className={"my-2"} />

            <PopoverClose asChild>
              <Button
                className={"w-[88%] cursor-pointer"}
                variant={"destructive"}
                onClick={logout}
              >
                <FiLogOut />
                Log Out
              </Button>
            </PopoverClose>
          </PopoverContent>
        </PopoverAnchor>
      </Popover>

      <Link href="/cart" className="relative w-fit">
        <FaBagShopping className="hover:cursor-pointer" />
        <Badge className="absolute -top-2 -right-2 rounded-full bg-[#2F9ECF]">
          {cart?.length}
        </Badge>
      </Link>
    </div>
  );
}
