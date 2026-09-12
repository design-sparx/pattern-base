"use client";

import { IconLayoutGrid } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { categories, getPatternsByCategory } from "@/data/patterns";
import { getCategoryIcon } from "@/lib/category-icons";

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Patterns</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            isActive={pathname === "/patterns"}
            tooltip="All patterns"
          >
            <Link href="/patterns">
              <IconLayoutGrid />
              <span>All patterns</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        {categories.map((cat) => {
          const Icon = getCategoryIcon(cat.id);
          const catPatterns = getPatternsByCategory(cat.id);
          const isOpen = pathname.includes(`/patterns/${cat.id}`);

          return (
            <SidebarMenuItem key={cat.id}>
              <SidebarMenuButton asChild isActive={isOpen} tooltip={cat.name}>
                <Link href={`/patterns/${cat.id}`}>
                  <Icon />
                  <span>{cat.name}</span>
                  <SidebarMenuBadge>{catPatterns.length}</SidebarMenuBadge>
                </Link>
              </SidebarMenuButton>
              {isOpen ? (
                <SidebarMenuSub>
                  {catPatterns.map((p) => (
                    <SidebarMenuSubItem key={p.id}>
                      <SidebarMenuSubButton
                        asChild
                        isActive={pathname === `/patterns/${cat.id}/${p.slug}`}
                      >
                        <Link href={`/patterns/${cat.id}/${p.slug}`}>
                          {p.name}
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              ) : null}
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
