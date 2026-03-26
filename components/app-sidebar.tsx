"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronDown, ChevronRight } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

const data = {
  sections: [
    {
      title: "About",
      defaultOpen: true,
      items: [
        { title: "Introduction", url: "/introduction" },
        { title: "Showcase", url: "/showcase" },
      ],
    },
    {
      title: "REST API",
      defaultOpen: true,
      items: [
        { title: "Products", url: "/dashboard/product", isActive: true },
        { title: "Filter products", url: "/filter-products" },
        { title: "Categories", url: "/categories" },
        { title: "Users", url: "/users" },
        { title: "Auth JWT", url: "/auth-jwt" },
        { title: "Locations", url: "/locations" },
        { title: "Files", url: "/files" },
        { title: "Swagger Docs", url: "/swagger-docs" },
      ],
    },
    {
      title: "GraphQL",
      defaultOpen: true,
      items: [
        { title: "Products", url: "/graphql/products" },
        { title: "Filter products", url: "/graphql/filter-products" },
        { title: "Categories", url: "/graphql/categories" },
        { title: "Users", url: "/graphql/users" },
        { title: "Auth JWT", url: "/graphql/auth-jwt" },
        { title: "Playground", url: "/graphql/playground" },
      ],
    },
    {
      title: "Resources",
      defaultOpen: true,
      items: [
        { title: "Postman", url: "/resources/postman" },
        { title: "Insomnia", url: "/resources/insomnia" },
      ],
    },
  ],
}

type AppSidebarProps = React.ComponentProps<typeof Sidebar>

export function AppSidebar(props: AppSidebarProps) {
  return (
    <Sidebar
      {...props}
      className="border-r bg-white text-slate-900"
    >
      <SidebarHeader className="border-b px-4 py-5">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-emerald-500 text-white font-bold">
            P
          </div>

          <div className="text-[20px] font-bold text-indigo-600 leading-none">
            Platzi Fake Store API
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        {data.sections.map((section) => (
          <Collapsible
            key={section.title}
            defaultOpen={section.defaultOpen}
            className="mb-4"
          >
            <SidebarGroup>
              <CollapsibleTrigger asChild>
                <button className="flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-[15px] font-bold text-slate-900 hover:bg-slate-100">
                  <span>{section.title}</span>
                  <ChevronDown className="h-4 w-4 shrink-0 transition-transform data-[state=closed]:rotate-[-90deg]" />
                </button>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu className="mt-2 space-y-1 border-l border-slate-200 pl-3">
                    {section.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          isActive={item.isActive}
                          className={`h-10 justify-start rounded-md px-3 text-[15px] font-medium ${
                            item.isActive
                              ? "bg-indigo-600 text-white hover:bg-indigo-600 hover:text-white"
                              : "text-slate-800 hover:bg-slate-100"
                          }`}
                        >
                          <Link href={item.url}>{item.title}</Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  )
}