"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
export default function BreadcrumbComponent() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((segment) => segment !== "").map((segment)=>segment.replace(/-/g, " "));
  return (
    <Breadcrumb>
      <BreadcrumbList className="capitalize">
        {segments.length > 1 && (
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink href="#">{segments[0]}</BreadcrumbLink>
          </BreadcrumbItem>
        )}
        {segments.map(
          (segment, index) =>
            index > 0 &&
            index < segments.length - 1 && (
              <BreadcrumbItem key={index}>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbLink
                  href={`/${segments.slice(0, index + 1).join("/")}`}
                >
                  {segment}
                </BreadcrumbLink>
              </BreadcrumbItem>
            ),
        )}
        <BreadcrumbItem>
          <BreadcrumbPage>{segments[segments.length - 1]}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
