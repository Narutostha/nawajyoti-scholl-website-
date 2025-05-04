import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu, X, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface MainMenuItem {
  label: string;
  href: string;
  submenu?: { label: string; href: string; }[];
}

interface MainMobileMenuProps {
  items: MainMenuItem[];
}

export const MainMobileMenu: React.FC<MainMobileMenuProps> = ({ items }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-gray-700">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px] sm:w-[350px] p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <img
                src="/navajyoti.jpg"
                alt="Nava Jyoti"
                className="h-12 w-12 rounded-lg"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-gray-900">Nava Jyoti</span>
                <span className="text-sm text-gray-500">Higher Secondary School</span>
              </div>
            </div>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-500">
                <X className="h-6 w-6" />
              </Button>
            </SheetTrigger>
          </div>

          {/* Menu Items */}
          <div className="flex-1 overflow-y-auto py-2">
            {items.map((item) => (
              <div key={item.label}>
                {item.submenu ? (
                  <details className="group">
                    <summary className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-gray-50">
                      <span className="font-medium text-gray-900">{item.label}</span>
                      <ChevronRight className="w-5 h-5 transition-transform group-open:rotate-90" />
                    </summary>
                    <div className="pl-4 pr-2 py-2 bg-gray-50">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.label}
                          to={subItem.href}
                          className="block px-4 py-2 text-gray-700 hover:text-[#12A5BF] rounded"
                          onClick={() => setOpen(false)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </details>
                ) : (
                  <Link
                    to={item.href}
                    className="flex items-center px-4 py-3 text-gray-900 hover:bg-gray-50"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};