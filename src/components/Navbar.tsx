import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Trending", href: "/trending" },
  { name: "Movie", href: "/movie" },
  { name: "Tv Series", href: "/tv-series" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <header className="flex items-center justify-between top-0 z-20 sticky py-2 px-6 bg-dark-gray">
      <Link to="/">
        <img src="/logo.png" alt="Logo" className="w-16 h-16" />
      </Link>

      <nav aria-label="Main Navigation" className="hidden md:flex">
        <ul className="flex items-center space-x-6">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <li key={link.name}>
                <Link
                  to={link.href}
                  className={`font-poppins font-bold text-lg transition duration-300 ${
                    isActive
                      ? "text-red-600 border-b-2 border-red-primary"
                      : "text-white hover:text-red-600"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <Sheet>
        <SheetTrigger asChild>
          <Button
            className="md:hidden bg-transparent hover:bg-white hover:text-red-600 transition duration-300"
            aria-label="Open Menu"
          >
            <Menu className="size-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 bg-dark-primary text-white">
          <nav
            aria-label="Mobile Navigation"
            className="flex flex-col space-y-4 p-4"
          >
            <Link to="/">
              <img src="/logo.png" alt="Logo" className="w-16 h-16" />
            </Link>
            <ul className="flex flex-col space-y-3">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.href;
                return (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className={`font-poppins font-bold text-lg transition duration-300 ${
                        isActive
                          ? "text-red-600 border-b-2 border-red-primary"
                          : "text-white hover:text-red-600"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
