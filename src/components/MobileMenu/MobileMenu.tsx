import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const menuItems = [
  {
    icon: "📰",
    label: "News",
    href: "/news"
  },
  {
    icon: "📚",
    label: "Syllabus",
    href: "/syllabus"
  },
  {
    icon: "📅",
    label: "Calendar",
    href: "/calendar"
  },
  {
    icon: "🎓",
    label: "Programs",
    href: "/programs"
  },
  {
    icon: "💼",
    label: "Career",
    href: "/career"
  },
  {
    icon: "📞",
    label: "Contact",
    href: "/contact"
  }
];

export const MobileMenu = () => {
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
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50"
                onClick={() => setOpen(false)}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium text-gray-900">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Footer Actions */}
          <div className="border-t p-4 space-y-2">
            <Button 
              className="w-full justify-start gap-2 bg-[#12A5BF] hover:bg-[#0f8fa6]"
              asChild
              onClick={() => setOpen(false)}
            >
              <Link to="/apply">
                <span className="text-xl">✏️</span>
                <span>Apply Now</span>
              </Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};