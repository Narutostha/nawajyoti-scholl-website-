import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MobileMenu } from "../MobileMenu"; // Keep existing MobileMenu
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Menu, X, Search } from "lucide-react";

const mainNavItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/about",
    submenu: [
      { label: "About Us", href: "/about" },
      { label: "Mission & Vision", href: "/about/mission-vision" },
      { label: "Our Learning Partner", href: "/about/learning-partner" },
      { label: "Our Philosophy", href: "/about/philosophy" },
      { label: "Governing Body", href: "/about/governing-body" },
      { label: "Our Team", href: "/about/team" },
    ],
  },
  {
    label: "Gallery",
    href: "/gallery",
    submenu: [
      { label: "Hanging Garden Vol_1", href: "/gallery/hanging-garden-1" },
      { label: "Hanging Garden Vol_2", href: "/gallery/hanging-garden-2" },
      { label: "Image Gallery", href: "/gallery/images" },
      { label: "Video Gallery", href: "/gallery/videos" },
    ],
  },
  {
    label: "Information Center",
    href: "/information-center",
    submenu: [
      { label: "ECA", href: "/information-center/eca" },
      { label: "Notice", href: "/information-center/notice" },
      { label: "Facilities", href: "/information-center/facilities" },
      { label: "Blog", href: "/information-center/blog" },
    ],
  },
  {
    label: "Nava Jyoti Buds",
    href: "/babylon-buds",
    submenu: [
      { label: "Issue 24", href: "/babylon-buds/issue-24" },
      { label: "Issue 23", href: "/babylon-buds/issue-23" },
      { label: "Issue 22", href: "/babylon-buds/issue-22" },
    ],
  },
  {
    label: "Parents Portal",
    href: "/parents-portal",
  },
];

export const Header = (props) => {
  const [isSticky, setIsSticky] = useState(false);
  const [topHeaderHeight, setTopHeaderHeight] = useState(0);
  const [secondaryMenuOpen, setSecondaryMenuOpen] = useState(false);

  // Handle scrolling and sticky behavior
  useEffect(() => {
    const updateHeaderState = () => {
      const currentScrollY = window.scrollY;
      const headerHeight = 64; // Height of your header
      
      // Get TopHeader height for calculations
      const topHeader = document.querySelector('[data-topheader="true"]');
      if (topHeader) {
        setTopHeaderHeight(topHeader.clientHeight);
      }
      
      // Make header sticky when scrolling down past header height
      if (currentScrollY > headerHeight) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    // Initial check
    updateHeaderState();
    
    // Event listeners
    window.addEventListener("scroll", updateHeaderState, { passive: true });
    window.addEventListener("resize", updateHeaderState);

    return () => {
      window.removeEventListener("scroll", updateHeaderState);
      window.removeEventListener("resize", updateHeaderState);
    };
  }, []);

  // Close the secondary menu when the window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) { // lg breakpoint
        setSecondaryMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSecondaryMenu = () => {
    setSecondaryMenuOpen(!secondaryMenuOpen);
  };

  return (
    <header
      {...props}
      className={`bg-white border-b w-full z-50 transition-all duration-300 ${
        isSticky ? "fixed shadow-md" : "absolute"
      }`}
      style={{ 
        top: 0,
        marginTop: isSticky ? 0 : `${topHeaderHeight}px`
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left side: Logo + first hamburger (secondary menu) */}
          <div className="flex items-center space-x-2">
            {/* Secondary menu hamburger - visible on mobile only */}
            <button 
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors focus:outline-none"
              onClick={toggleSecondaryMenu}
              aria-label={secondaryMenuOpen ? "Close secondary menu" : "Open secondary menu"}
            >
              {secondaryMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Search className="h-6 w-6 text-gray-700" />
              )}
            </button>
            
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img
                src="/navajyoti.jpg"
                alt="Nava Jyoti School"
                className="h-8 sm:h-10"
              />
            </Link>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden lg:flex flex-1 justify-center">
            <NavigationMenu>
              <NavigationMenuList className="flex flex-wrap justify-center">
                {mainNavItems.map((item) => (
                  <NavigationMenuItem key={item.label}>
                    {item.submenu ? (
                      <>
                        <NavigationMenuTrigger className="text-gray-700 hover:text-[#12A5BF] transition-colors text-sm md:text-base">
                          {item.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="w-60 p-2">
                            {item.submenu.map((subItem) => (
                              <li key={subItem.label}>
                                <Link
                                  to={subItem.href}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#12A5BF]/10 hover:text-[#12A5BF] rounded-md transition-colors"
                                >
                                  {subItem.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Link
                        to={item.href}
                        className="px-3 md:px-4 py-2 text-sm md:text-base text-gray-700 hover:text-[#12A5BF] transition-colors"
                      >
                        {item.label}
                      </Link>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right side: Keep the existing MobileMenu component (second hamburger) */}
          <div className="flex items-center">
            <MobileMenu />
          </div>
        </div>
      </div>

      {/* Secondary Mobile Menu (triggered by the first hamburger) */}
      <div 
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          secondaryMenuOpen ? "max-h-screen bg-white border-t border-gray-200" : "max-h-0"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          {/* Quick access items for secondary menu */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Link 
              to="/about" 
              className="bg-gray-50 hover:bg-gray-100 p-3 rounded-lg text-center transition-colors"
            >
              <div className="font-medium text-gray-700">About Us</div>
              <div className="text-xs text-gray-500">Learn about our school</div>
            </Link>
            <Link 
              to="/contact" 
              className="bg-gray-50 hover:bg-gray-100 p-3 rounded-lg text-center transition-colors"
            >
              <div className="font-medium text-gray-700">Contact</div>
              <div className="text-xs text-gray-500">Get in touch</div>
            </Link>
            <Link 
              to="/news" 
              className="bg-gray-50 hover:bg-gray-100 p-3 rounded-lg text-center transition-colors"
            >
              <div className="font-medium text-gray-700">News</div>
              <div className="text-xs text-gray-500">Latest updates</div>
            </Link>
            <Link 
              to="/programs" 
              className="bg-gray-50 hover:bg-gray-100 p-3 rounded-lg text-center transition-colors"
            >
              <div className="font-medium text-gray-700">Programs</div>
              <div className="text-xs text-gray-500">Academic offerings</div>
            </Link>
          </div>
          
          {/* Search bar */}
          <div className="relative mb-4">
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#12A5BF]"
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          
          {/* Quick links */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200">
            <Link to="/parents-portal" className="text-sm text-[#12A5BF] hover:underline">Parents Portal</Link>
            <span className="text-gray-300">•</span>
            <Link to="/gallery" className="text-sm text-[#12A5BF] hover:underline">Gallery</Link>
            <span className="text-gray-300">•</span>
            <Link to="/contact" className="text-sm text-[#12A5BF] hover:underline">Admissions</Link>
          </div>
        </div>
      </div>
    </header>
  );
};