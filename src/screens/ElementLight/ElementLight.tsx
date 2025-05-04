import {
  ChevronRightIcon,
  MailIcon,
  MapPinIcon,
  MenuIcon,
  PhoneIcon,
  XIcon,
} from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import { Separator } from "../../components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "../../components/ui/sheet";
import { ContentSection } from "./sections/ContentSection";
import { HomeSection } from "./sections/HomeSection/HomeSection";
import { ServicesSection } from "./sections/ServicesSection";

export const ElementLight = (): JSX.Element => {
  // Contact information data
  const contactInfo = [
    {
      icon: <MailIcon className="w-[18px] h-[18px]" />,
      text: "info@babylonschool.edu.np",
      link: "mailto:info@babylonschool.edu.np",
      hasSeparator: true,
    },
    {
      icon: <PhoneIcon className="w-[18px] h-[18px]" />,
      text: "+977-1-4108905, 4108973",
      hasSeparator: true,
    },
    {
      icon: <MapPinIcon className="w-[18px] h-[18px]" />,
      text: "BalaBhadra Marga, Kathmandu",
      link: "https://www.google.com/maps/search/",
    },
  ];

  // Navigation menu items
  const navItems = [
    { text: "About", hasSubmenu: true },
    { text: "Gallery", hasSubmenu: true },
    { text: "Information Center", hasSubmenu: true },
    { text: "Babylon Buds", hasSubmenu: true },
    {
      text: "Parents Portal",
      link: "https://babylonschool.edu.np/parents-portal",
    },
    { text: "News", link: "https://babylonschool.edu.np/news" },
    { text: "Syllabus", hasSubmenu: true },
    { text: "Calendar", hasSubmenu: true },
    { text: "Programs", link: "https://babylonschool.edu.np/programs" },
    { text: "Career", link: "https://babylonschool.edu.np/career" },
    { text: "Contact", link: "https://babylonschool.edu.np/contact" },
  ];

  return (
    <div className="flex flex-col w-full items-start relative bg-babylonschooledunpwhite">
      <div className="relative w-full overflow-auto bg-babylonschooledunpwhite shadow-[0px_10px_50px_#a6d1ed33]">
        {/* Top header bar */}
        <header className="flex flex-col w-full items-center py-[5px] bg-babylonschooledunpeastern-blue">
          <div className="relative max-w-[1200px] w-full h-[34.5px]">
            {/* Contact information */}
            <div className="inline-flex items-start gap-3 absolute top-2 left-[15px]">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="inline-flex items-start justify-center pl-0 pr-3 py-0 relative flex-[0_0_auto]"
                >
                  <div className="flex items-center gap-[5px] relative flex-1 grow">
                    {item.icon}

                    {item.link ? (
                      <a
                        className="relative w-fit [font-family:'Quicksand',Helvetica] font-medium text-babylonschooledunpwhite text-sm tracking-[0] leading-[0.1px]"
                        href={item.link}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <div className="relative w-fit [font-family:'Quicksand',Helvetica] font-medium text-babylonschooledunpwhite text-sm tracking-[0] leading-[0.1px]">
                        {item.text}
                      </div>
                    )}
                  </div>

                  {item.hasSeparator && (
                    <Separator
                      orientation="vertical"
                      className="absolute w-px h-[18px] top-0 right-0 bg-babylonschooledunpwhite"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* E-Portal button */}
            <Button
              variant="outline"
              className="gap-[5px] px-1.5 py-[5px] top-0 left-[985px] rounded-[5px] border border-solid border-[#fca000] inline-flex min-w-16 items-center justify-center absolute bg-transparent"
              asChild
            >
              <a
                href="https://edigitalnepal.com/e/babylon"
                rel="noopener noreferrer"
                target="_blank"
              >
                <img
                  className="w-[18px] h-[18px]"
                  alt="Component"
                  src="/component-1-13.svg"
                />
                <span className="[font-family:'Quicksand',Helvetica] font-medium text-babylonschooledunpwhite text-sm tracking-[0] leading-[24.5px] whitespace-nowrap">
                  E-Portal
                </span>
              </a>
            </Button>

            {/* Login button */}
            <Button
              variant="ghost"
              className="inline-flex min-w-16 items-center justify-center gap-[5px] px-[5px] py-1 absolute top-px left-[1093px] rounded-[5px] bg-transparent"
            >
              <img
                className="w-[18px] h-[18px]"
                alt="Component"
                src="/component-1-45.svg"
              />
              <span className="[font-family:'Quicksand',Helvetica] font-medium text-babylonschooledunpwhite text-sm text-center tracking-[0] leading-[24.5px] whitespace-nowrap">
                Login
              </span>
              <img
                className="w-[18px] h-[18px]"
                alt="Component"
                src="/component-1-26.svg"
              />
            </Button>
          </div>
        </header>

        {/* Main content sections */}
        <main>
          <ContentSection />
          <HomeSection />
          <ServicesSection />
        </main>
      </div>

      {/* Apply Now floating button */}
      <div className="fixed w-[80px] h-[80px] top-0 right-[115px]">
        <Button
          className="flex w-20 h-20 items-center justify-center pt-[17.7px] pb-[18.4px] px-0 relative bg-babylonschooledunpeastern-blue rounded-[40px] hover:bg-babylonschooledunpeastern-blue/90"
          asChild
        >
          <a
            href="https://edigitalnepal.com/ca/apply/babylon"
            rel="noopener noreferrer"
            target="_blank"
            className="text-center"
          >
            <span className="font-babylonschool-edu-np-semantic-heading-4 font-[number:var(--babylonschool-edu-np-semantic-heading-4-font-weight)] text-babylonschooledunpwhite text-[length:var(--babylonschool-edu-np-semantic-heading-4-font-size)] tracking-[var(--babylonschool-edu-np-semantic-heading-4-letter-spacing)] leading-[var(--babylonschool-edu-np-semantic-heading-4-line-height)] [font-style:var(--babylonschool-edu-np-semantic-heading-4-font-style)]">
              Apply
              <br />
              Now!
            </span>
          </a>
        </Button>
      </div>

      {/* Mobile navigation menu */}
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed top-4 left-4 md:hidden"
          >
            <MenuIcon className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-[300px] bg-babylonschooledunpeastern-blue p-0"
        >
          <div className="flex flex-col items-start justify-center px-[25px] py-[35px] h-full">
            <SheetClose className="absolute w-6 h-6 top-2 right-2 text-babylonschooledunpwhite">
              <XIcon className="h-6 w-6" />
            </SheetClose>

            <div className="flex flex-col items-start gap-[25px] relative flex-1 self-stretch w-full grow overflow-auto">
              <div className="flex flex-col items-start justify-center relative self-stretch w-full">
                {navItems.map((item, index) =>
                  item.link ? (
                    <Button
                      key={index}
                      variant="ghost"
                      className="flex min-w-16 items-center pt-[9px] pb-[10.25px] px-2.5 relative self-stretch w-full flex-[0_0_auto] rounded-[15px] justify-start h-[46px] hover:bg-babylonschooledunpeastern-blue/80"
                      asChild
                    >
                      <a
                        href={item.link}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="font-babylonschool-edu-np-semantic-link font-[number:var(--babylonschool-edu-np-semantic-link-font-weight)] text-babylonschooledunpwhite text-[length:var(--babylonschool-edu-np-semantic-link-font-size)] tracking-[var(--babylonschool-edu-np-semantic-link-letter-spacing)] leading-[var(--babylonschool-edu-np-semantic-link-line-height)] whitespace-nowrap [font-style:var(--babylonschool-edu-np-semantic-link-font-style)]"
                      >
                        {item.text}
                      </a>
                    </Button>
                  ) : (
                    <Button
                      key={index}
                      variant="ghost"
                      className="relative self-stretch min-w-16 w-full h-[46.25px] rounded-[15px] justify-between hover:bg-babylonschooledunpeastern-blue/80"
                    >
                      <span className="font-babylonschool-edu-np-semantic-button font-[number:var(--babylonschool-edu-np-semantic-button-font-weight)] text-babylonschooledunpwhite text-[length:var(--babylonschool-edu-np-semantic-button-font-size)] tracking-[var(--babylonschool-edu-np-semantic-button-letter-spacing)] leading-[var(--babylonschool-edu-np-semantic-button-line-height)] whitespace-nowrap [font-style:var(--babylonschool-edu-np-semantic-button-font-style)] text-left">
                        {item.text}
                      </span>
                      {item.hasSubmenu && (
                        <ChevronRightIcon className="w-6 h-6 text-babylonschooledunpwhite" />
                      )}
                    </Button>
                  ),
                )}
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="p-2 rounded-[20px] hover:bg-babylonschooledunpeastern-blue/80"
              >
                <img
                  className="w-6 h-6"
                  alt="Component"
                  src="/component-1-18.svg"
                />
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};
