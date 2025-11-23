"use client";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarItem({ item }) {
  const pathname = usePathname();

  return (
    <SidebarMenuItem
      key={item.title}
      className={cn(item.url === pathname && "rounded-l-sm bg-[#2F9ECF]/20")}
    >
      <SidebarMenuButton asChild>
        <Link href={item.url}>
          <item.icon />
          <span className="text-base">{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
