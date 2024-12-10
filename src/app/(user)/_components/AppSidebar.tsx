"use client";
import { Home, Settings, Users2, Files } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { SignOutButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import { SidebarHeader } from "@/components/ui/app-sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function AppSidebar() {
  const [user, setUser] = useState<Record<string, string>>({});
  const pathname = usePathname();
  const isDoctor = pathname.startsWith("/doctor");
  const { user: clerkUser } = useUser();
  const refetch = useMemo(() => {
    if (!clerkUser) return;
    return fetch("/api/user?user=" + clerkUser?.id, { method: "GET" })
      .then((res) => res.json())
      .then((res) => setUser(res as Record<string, string>));
  }, [clerkUser]);
  let items = [
    {
      title: "Home",
      url: `/${isDoctor ? "doctor" : "patient"}`,
      icon: Home,
    },
  ];
  if (isDoctor) {
    items = [
      ...items,
      {
        title: "Patients",
        url: `/${isDoctor ? "doctor" : "patient"}/patients`,
        icon: Users2,
      },
      {
        title: "Reports",
        url: `/${isDoctor ? "doctor" : "patient"}/reports`,
        icon: Files,
      },
      {
        title: "Edit Account",
        url: `/${isDoctor ? "doctor" : "patient"}/edit-account`,
        icon: Settings,
      },
    ];
  } else {
    items = [
      ...items,
      {
        title: "My Reports",
        url: `/${isDoctor ? "doctor" : "patient"}/my-reports`,
        icon: Files,
      },
      {
        title: "Edit Account",
        url: `/${isDoctor ? "doctor" : "patient"}/edit-account`,
        icon: Settings,
      },
    ];
  }
  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="cursor-pointer text-center text-3xl font-bold text-black">
          Opti<span className="text-blue-800">Scan</span>
        </h1>
        <div className="flex items-center gap-2 py-2">
          <Avatar className="size-16">
            <AvatarFallback className="capitalize">
              {user?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0.5">
            <h3 className="text-lg font-semibold capitalize">{user?.name}</h3>
            <p>{user.role == "PATIENT" ?"Patient" :"Doctor"} N: {user?.id?.slice(0, 8)}</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button variant={"destructive"} asChild>
          <SignOutButton />
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
