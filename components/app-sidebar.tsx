"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpen,
  Boxes,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  Settings,
  SlidersHorizontal,
  Store,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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

type AppSidebarProps = React.ComponentProps<typeof Sidebar>

const shopItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Product Listing",
    url: "/dashboard/product",
    icon: Boxes,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
]

const bottomItems = [
  {
    title: "Models",
    url: "/models",
    icon: SlidersHorizontal,
  },
  {
    title: "Documentation",
    url: "/documentation",
    icon: BookOpen,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar(props: AppSidebarProps) {
  const pathname = usePathname()
  const [shopOpen, setShopOpen] = React.useState(true)

  const isActive = (url: string) => {
    if (url === "/dashboard") return pathname === url
    return pathname.startsWith(url)
  }

  return (
    <Sidebar
      {...props}
      className="border-r bg-white text-slate-900"
    >
      <SidebarHeader className="border-b px-4 py-4">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
              <Store className="h-5 w-5" />
            </div>

            <div className="leading-tight">
              <p className="text-sm font-semibold text-slate-900">Acme Inc</p>
              <p className="text-xs text-slate-500">Enterprise</p>
            </div>
          </Link>

          <button className="rounded-md p-1 hover:bg-slate-100">
            <ChevronRight className="h-4 w-4 text-slate-500" />
          </button>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <div className="mb-3 px-2 text-xs font-medium uppercase tracking-wide text-slate-400">
          Platform
        </div>

        <Collapsible open={shopOpen} onOpenChange={setShopOpen} className="mb-4">
          <SidebarGroup>
            <CollapsibleTrigger asChild>
              <button className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-left hover:bg-slate-100">
                <div className="flex items-center gap-2">
                  <Store className="h-4 w-4 text-slate-700" />
                  <span className="text-[15px] font-medium text-slate-900">
                    iSTAD Shop
                  </span>
                </div>

                <ChevronDown
                  className={`h-4 w-4 text-slate-500 transition-transform ${
                    shopOpen ? "rotate-0" : "-rotate-90"
                  }`}
                />
              </button>
            </CollapsibleTrigger>

            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu className="mt-2 space-y-1 pl-6">
                  {shopItems.map((item) => {
                    const Icon = item.icon
                    const active = isActive(item.url)

                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton
                          asChild
                          isActive={active}
                          className={`h-10 justify-start rounded-lg px-3 text-sm font-medium ${
                            active
                              ? "bg-slate-100 text-slate-900"
                              : "text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <Link href={item.url} className="flex items-center gap-2">
                            <Icon className="h-4 w-4" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        <SidebarMenu className="space-y-1">
          {bottomItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.url)

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={active}
                  className={`h-10 justify-between rounded-lg px-3 text-sm font-medium ${
                    active
                      ? "bg-slate-100 text-slate-900"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Link href={item.url} className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
              N
            </div>

            <div className="leading-tight">
              <p className="text-sm font-medium text-slate-900">shadcn</p>
              <p className="text-xs text-slate-500">m@example.com</p>
            </div>
          </div>

          <button className="rounded-md p-1 hover:bg-slate-100">
            <ChevronRight className="h-4 w-4 text-slate-500" />
          </button>
        </div>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}