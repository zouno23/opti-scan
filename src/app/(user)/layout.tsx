import { SidebarProvider } from "@/components/ui/app-sidebar";
import { SideBar } from "./_components/SideBar";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/server/db";
import RouteManager from "./_components/RouteManager";

export default async function RootLayout({ children }: { 
  children: React.ReactNode,
}) {
  const {userId} = await auth()
  if(!userId) return
  const user = await db.user.findUniqueOrThrow({where:{clerkId:userId}})
 
  return (
    <SidebarProvider>
      <SideBar>
        <RouteManager user={user}/>
        {children}
        </SideBar>
    </SidebarProvider>
  );
}
