import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

const navLinks = [{ name: "Home", href: "/" }];

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between top-0 z-20 sticky py-2 px-6 bg-dark-primary">
      <Link to="/">
        <img src="/logo.png" alt="Logo" className="w-16 h-16" />
      </Link>

      <div className="hidden md:flex space-x-6">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-white hover:text-red-primary font-poppins font-semibold text-lg transition duration-300"
          >
            {link.name}
          </a>
        ))}
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button className="md:hidden bg-transparent hover:bg-white hover:text-red-primary transition duration-300">
            <Menu className="size-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 bg-dark-primary text-white">
          <div className="flex flex-col space-y-4 p-4">
            <img src="/logo.png" alt="Logo" className="w-16 h-16" />
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white hover:text-red-primary font-poppins font-semibold text-lg transition duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
