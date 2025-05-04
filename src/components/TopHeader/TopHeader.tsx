import React, { useEffect, useState } from "react";
import { MailIcon, PhoneIcon, MapPinIcon } from "lucide-react";

interface TopHeaderProps {
  [key: string]: any; // For data attributes
}

export const TopHeader = (props: TopHeaderProps): JSX.Element => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlTopHeader = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY <= 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlTopHeader);
    return () => {
      window.removeEventListener("scroll", controlTopHeader);
    };
  }, [lastScrollY]);

  return (
    <div
      {...props}
      className={`w-full bg-[#12A5BF] text-white py-2 fixed top-0 left-0 z-40 transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center space-x-6">
          <a 
            href="mailto:info@navajyotischool.edu.np" 
            className="flex items-center space-x-2 text-sm hover:text-white/80 transition-colors"
          >
            <MailIcon className="h-4 w-4" />
            <span className="hidden sm:inline">info@navajyotischool.edu.np</span>
          </a>
          
          <a 
            href="tel:+97714108905" 
            className="flex items-center space-x-2 text-sm hover:text-white/80 transition-colors"
          >
            <PhoneIcon className="h-4 w-4" />
            <span className="hidden sm:inline">+977-1-4108905, 4108973</span>
          </a>
          
          <div className="hidden md:flex items-center space-x-2 text-sm">
            <MapPinIcon className="h-4 w-4" />
            <span>Basukinagar, Tinkune, Kathmandu</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <a 
            href="/portal" 
            className="px-3 py-1 text-sm bg-transparent hover:bg-white/10 text-white border border-white/60 rounded transition-colors"
          >
            E-Portal
          </a>
          
          <a 
            href="/login" 
            className="px-3 py-1 text-sm bg-transparent hover:bg-white/10 text-white border border-white/60 rounded transition-colors"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
};