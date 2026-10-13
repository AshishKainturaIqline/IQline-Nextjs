"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react";
;
import { motion, useScroll, useTransform } from "framer-motion";
import { MenuIcon } from "lucide-react";
import logoDark from "@/assets/logo/Logo-Darktheme.svg";
import logoLight from "@/assets/logo/Logo-Lighttheme.svg";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import { assetSrc, cn } from "@/lib/utils";
const primaryNav = [
  { to: "/about", label: "About" },
  // { to: "/about#why", label: "Why Us" },
  { to: "/products", label: "Products" },
  { to: "/founders", label: "Founders" },
  { to: "/blog", label: "Blogs" },
  { to: "/careers", label: "Careers" }
];
function BrandLogo({ className }) {
  return <>
      <img
    src={assetSrc(logoLight)}
    alt=""
    width={188}
    height={93}
    className={cn("w-auto sm:w-[188px] dark:hidden", className)}
  />
      <img
    src={assetSrc(logoDark)}
    alt=""
    width={188}
    height={93}
    className={cn("hidden dark:block w-auto sm:w-[188px]", className)}
  />
    </>;
}
function MobileNav() {
  const [open, setOpen] = useState(false);
  return <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
    variant="outline"
    size="icon-sm"
    className="md:hidden"
    aria-label="Open menu"
  >
          <MenuIcon className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent
    side="right"
    className="flex w-[min(100vw-2rem,22rem)] flex-col gap-0 p-0"
  >
        <SheetHeader className="border-b border-border px-6 py-4 text-left">
          <SheetTitle className="sr-only">IQ-Line</SheetTitle>
          <div className="flex items-center" aria-hidden>
            <BrandLogo className="" />
          </div>
        </SheetHeader>
        <ScrollArea className="flex-1">
          <div className="flex flex-col gap-1 p-4">
            {primaryNav.map(({ to, label }) => <Link
    key={to}
    href={to}
    onClick={() => setOpen(false)}
    className={cn(
      navigationMenuTriggerStyle(),
      "justify-start rounded-lg"
    )}
  >
                {label}
              </Link>)}
            <Separator className="my-3" />
          </div>
        </ScrollArea>
        <div className="border-t border-border p-4">
          <Button className="w-full" asChild>
            <Link href="/contact" onClick={() => setOpen(false)}>
              Book a demo
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>;
}
function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 60], [0, 1]);
  const pathname = usePathname();
  const isHome = pathname === "/";
  useEffect(() => {
    const unsub = scrollY.on("change", (y) => setScrolled(y > 30));
    return unsub;
  }, [scrollY]);
  const alwaysSolid = !isHome;
  return <header
    className={cn(
      "sticky z-40 flex justify-center transition-[top,padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
      scrolled ? "top-0 md:top-3 md:px-4 lg:px-12 xl:px-20" : "top-0 px-0"
    )}
  >
      <div
    className={cn(
      "relative w-full overflow-hidden border-b transition-[border-radius,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
      scrolled || alwaysSolid ? "border-border/60" : "border-transparent",
      scrolled && "md:rounded-2xl md:border md:shadow-lg md:shadow-black/5 dark:md:shadow-black/40"
    )}
  >
        <motion.div
    className="pointer-events-none absolute inset-0 bg-background/90 backdrop-blur-md"
    style={{ opacity: alwaysSolid ? 1 : headerOpacity }}
  />

        <div className="relative mx-auto flex h-20 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          {
    /* Logo */
  }
        <motion.div
    whileHover={{ scale: 1.04 }}
    whileTap={{ scale: 0.97 }}
    transition={{ duration: 0.15 }}
  >
          <Link
    href="/"
    className="flex shrink-0 items-center"
    aria-label="IQ-Line home"
  >
            <BrandLogo />
          </Link>
        </motion.div>

        {
    /* Desktop nav */
  }
        <NavigationMenu
    viewport
    className="z-30 hidden md:flex"
  >
          <NavigationMenuList>
            {primaryNav.map(({ to, label }) => <NavigationMenuItem key={to}>
                <NavigationMenuLink asChild>
                  <Link href={to} className={navigationMenuTriggerStyle()}>
                    {label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>)}
          </NavigationMenuList>
        </NavigationMenu>

        {
    /* Right */
  }
        <div className="relative z-40 flex items-center gap-2">
          <ModeToggle />
          <Button size="sm" className="hidden sm:inline-flex" asChild>
            <Link href="/contact">Request a demo</Link>
          </Button>
          <MobileNav />
        </div>
        </div>
      </div>
    </header>;
}
export {
  SiteHeader
};
