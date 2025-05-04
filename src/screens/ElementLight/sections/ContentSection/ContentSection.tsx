import { SearchIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../../../../components/ui/navigation-menu";

export const ContentSection = (): JSX.Element => {
  // Navigation menu items data
  const menuItems = [
    {
      label: "Home",
      href: "https://babylonschool.edu.np/",
      hasDropdown: false,
    },
    { label: "About", hasDropdown: true },
    { label: "Gallery", hasDropdown: true },
    { label: "Information Center", hasDropdown: true },
    { label: "Babylon Buds", hasDropdown: true },
    {
      label: "Parents Portal",
      href: "https://babylonschool.edu.np/parents-portal",
      hasDropdown: false,
    },
  ];

  return (
    <header className="w-full flex justify-center bg-babylonschooledunpwhite py-[5px] border-b">
      <div className="max-w-[1200px] w-full flex items-center justify-between pl-[15px] pr-10">
        {/* School Logo */}
        <div className="relative max-w-[250px] w-[250px] h-[40.94px] bg-[url(/link---babylon-national-school.png)] bg-cover bg-[50%_50%]" />

        {/* Navigation Menu */}
        <NavigationMenu>
          <NavigationMenuList className="flex">
            {menuItems.map((item, index) => (
              <NavigationMenuItem key={index}>
                {item.hasDropdown ? (
                  <NavigationMenuTrigger className="px-2.5 py-5 [font-family:'Quicksand',Helvetica] font-medium text-babylonschooledunptundora text-base leading-6">
                    {item.label}
                  </NavigationMenuTrigger>
                ) : (
                  <a
                    href={item.href}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="flex px-2.5 py-5 [font-family:'Quicksand',Helvetica] font-medium text-babylonschooledunptundora text-base leading-6"
                  >
                    {item.label}
                  </a>
                )}
                {item.hasDropdown && (
                  <NavigationMenuContent>
                    <div className="p-4 w-[200px]">
                      {/* Dropdown content would go here */}
                    </div>
                  </NavigationMenuContent>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="relative w-[30px] h-[18px] flex flex-col justify-between p-0"
        >
          <span className="w-5 h-[3px] bg-babylonschooledunptundora rounded-[30px]" />
          <span className="w-5 h-[3px] bg-babylonschooledunptundora rounded-[30px]" />
          <span className="w-5 h-[3px] bg-babylonschooledunptundora rounded-[30px]" />
        </Button>

        {/* SearchIcon Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-[17px] right-[60px] p-2 rounded-[20px]"
        >
          <SearchIcon className="w-6 h-6" />
        </Button>
      </div>
    </header>
  );
};
