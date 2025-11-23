"use client";

import { BaggageClaim, Inbox, LayoutDashboard, Star } from "lucide-react";

import { logout } from "@/app/_actions/auth";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Button } from "../../ui/button";
import SidebarItem from "./SidebarItem";

// Menu items
const items = [
  {
    title: "My Dashboard",
    url: "/profile/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Orders",
    url: "/profile/orders",
    icon: BaggageClaim,
  },
  {
    title: "My Wishlist",
    url: "/profile/wishlist",
    icon: Star,
  },
  {
    title: "My Profile",
    url: "/profile",
    icon: Inbox,
  },
];

export default function ProfileSidebar() {
  return (
    <Sidebar className={cn("sticky top-20 h-full")}>
      <SidebarContent className="h-full overflow-x-hidden">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarItem key={item.url} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <Button
          variant="destructive"
          className="cursor-pointer"
          onClick={logout}
        >
          Logout
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
