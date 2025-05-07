"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useMediaQuery } from "@/hooks/use-media-query"

const navItems = [
  {
    title: "Accueil",
    href: "/",
  },
  {
    title: "Galerie",
    href: "/gallery",
    children: [
      {
        title: "Toutes les œuvres",
        href: "/gallery",
        description: "Explorez notre collection complète d'œuvres d'art gabonais",
      },
      {
        title: "Sculptures",
        href: "/gallery?category=sculpture",
        description: "Découvrez nos sculptures traditionnelles et contemporaines",
      },
      {
        title: "Peintures",
        href: "/gallery?category=painting",
        description: "Admirez nos peintures aux styles et techniques variés",
      },
      {
        title: "Art mixte",
        href: "/gallery?category=mixed",
        description: "Explorez des œuvres combinant différentes techniques artistiques",
      },
    ],
  },
  {
    title: "Artistes",
    href: "/artists",
    children: [
      {
        title: "Tous nos artistes",
        href: "/artists",
        description: "Découvrez les talents qui donnent vie à l'art gabonais",
      },
      {
        title: "Artistes en vedette",
        href: "/artists?featured=true",
        description: "Rencontrez nos artistes les plus populaires",
      },
      {
        title: "Par région",
        href: "/artists?view=regions",
        description: "Explorez les artistes par région du Gabon",
      },
      {
        title: "Par style",
        href: "/artists?view=styles",
        description: "Découvrez les artistes par style artistique",
      },
    ],
  },
  {
    title: "Comment ça marche",
    href: "/how-it-works",
  },
  {
    title: "Contact",
    href: "/contact",
  },
]

export function MainNav() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  return (
    <div className="flex items-center justify-start w-full pr-8">
      {isDesktop ? (
        <NavigationMenu>
          <NavigationMenuList>
            {navItems.map((item) => (
              <NavigationMenuItem key={item.title}>
                {item.children ? (
                  <>
                    <NavigationMenuTrigger
                      className={cn(
                        "text-sm font-medium transition-colors",
                        pathname === item.href ? "text-primary-500" : "hover:text-primary-500",
                      )}
                    >
                      {item.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {item.children.map((child) => (
                          <ListItem
                            key={child.title}
                            title={child.title}
                            href={child.href}
                            className={pathname === child.href ? "bg-muted" : ""}
                          >
                            {child.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "text-sm font-medium transition-colors",
                        pathname === item.href ? "text-primary-500 bg-primary-500/10" : "hover:text-primary-500",
                      )}
                    >
                      {item.title}
                    </NavigationMenuLink>
                  </Link>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      ) : (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <div className="flex-1 overflow-auto py-4">
              <nav className="grid gap-6 text-lg font-medium">
                {navItems.map((item) => (
                  <div key={item.title}>
                    {item.children ? (
                      <div className="space-y-3">
                        <h4 className="font-semibold text-primary-500">{item.title}</h4>
                        <div className="grid gap-2 pl-4">
                          {item.children.map((child) => (
                            <Link
                              key={child.title}
                              href={child.href}
                              className={cn(
                                "transition-colors hover:text-primary-500",
                                pathname === child.href ? "text-primary-500 font-medium" : "",
                              )}
                              onClick={() => setIsOpen(false)}
                            >
                              {child.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          "transition-colors hover:text-primary-500",
                          pathname === item.href ? "text-primary-500 font-medium" : "",
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.title}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>
            </div>
            <div className="border-t pt-4">
              <div className="flex flex-col gap-4">
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Connexion
                  </Button>
                </Link>
                <Link href="/register" onClick={() => setIsOpen(false)}>
                  <Button className="w-full">Inscription</Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, href, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <Link
            ref={ref}
            href={href || "#"}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/10 hover:text-accent focus:bg-accent/10 focus:text-accent",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </Link>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"
