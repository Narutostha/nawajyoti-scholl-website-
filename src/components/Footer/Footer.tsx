import React from "react";
import { Facebook, Youtube, Instagram, Linkedin, Mail, MapPin, ArrowUpRight, ChevronRight } from "lucide-react";

export const Footer = (): JSX.Element => {
  return (
    <footer className="relative bg-zinc-900 overflow-hidden font-sans">
      <div className="h-1.5 w-full bg-gradient-to-r from-red-600 via-[#12A5BF] to-indigo-500"></div>
      
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute -top-[30%] -left-[10%] w-3/4 h-3/4 rounded-full bg-red-600/10 blur-3xl"></div>
        <div className="absolute -bottom-[30%] -right-[10%] w-3/4 h-3/4 rounded-full bg-[#12A5BF]/10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 pb-12 sm:pb-16 border-b border-white/10">
          <div className="lg:col-span-5 space-y-6 sm:space-y-8">
            <div className="flex items-center space-x-4">
              <img
                src="/navajyoti.jpg"
                alt="Nava Jyoti School"
                className="h-12 sm:h-14 md:h-16 rounded-lg"
              />
              <div className="flex flex-col">
                <span className="text-white font-semibold text-base sm:text-lg">Nava Jyoti</span>
                <span className="text-[#12A5BF] text-xs sm:text-sm">Higher Secondary School</span>
              </div>
            </div>
            
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              A leading co-educational English medium school committed to excellence in education 
              and holistic development of students from PG to secondary level.
            </p>
            
            <a 
              href="/about" 
              className="inline-flex items-center px-4 sm:px-6 py-2.5 sm:py-3 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-700 rounded-full hover:translate-y-[-2px] shadow-lg shadow-red-600/20 transition-all duration-300 group"
            >
              Discover our story
              <ArrowUpRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>

          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <h3 className="text-white text-sm sm:text-base font-bold tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {["About", "Gallery", "Information", "Admissions"].map((text, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-zinc-400 hover:text-white text-sm sm:text-base flex items-center transition-colors duration-200 group"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 text-[#12A5BF] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <h3 className="text-white text-sm sm:text-base font-bold tracking-wider uppercase">
              Resources
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {["Parents Portal", "Student Hub", "Events", "News"].map((text, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-zinc-400 hover:text-white text-sm sm:text-base flex items-center transition-colors duration-200 group"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 text-[#12A5BF] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4 sm:space-y-6">
            <h3 className="text-white text-sm sm:text-base font-bold tracking-wider uppercase">
              Stay Connected
            </h3>
            
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start">
                <div className="p-2 rounded-md bg-white/5 mr-3 flex-shrink-0 border border-white/10">
                  <MapPin className="w-4 h-4 text-[#12A5BF]" />
                </div>
                <p className="text-zinc-400 text-xs sm:text-sm leading-tight pt-1">
                  Basuki Nagar, Tinkune<br />Kathmandu, Nepal
                </p>
              </li>
              <li className="flex items-start">
                <div className="p-2 rounded-md bg-white/5 mr-3 flex-shrink-0 border border-white/10">
                  <Mail className="w-4 h-4 text-[#12A5BF]" />
                </div>
                <a
                  href="mailto:info@navajyoti.edu.np"
                  className="text-zinc-400 hover:text-white text-xs sm:text-sm leading-tight pt-1 transition-colors"
                >
                  info@navajyoti.edu.np
                </a>
              </li>
            </ul>
            
            <div className="mt-6 pt-6 border-t border-white/10">
              <form className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2.5 sm:py-3 pl-4 pr-12 bg-white/5 border border-white/10 rounded-lg text-white text-xs sm:text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#12A5BF]/50 focus:border-transparent transition-all"
                />
                <button 
                  type="submit" 
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-[#12A5BF] text-white rounded-md hover:bg-[#0f8fa6] transition-colors"
                  aria-label="Subscribe"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </form>
              <p className="mt-2 text-zinc-500 text-xs">
                Subscribe to receive updates and news
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
          <div className="flex space-x-3 sm:space-x-4">
            {[
              { icon: <Facebook className="w-5 h-5" />, href: "#", color: "hover:bg-blue-600" },
              { icon: <Instagram className="w-5 h-5" />, href: "#", color: "hover:bg-pink-600" },
              { icon: <Youtube className="w-5 h-5" />, href: "#", color: "hover:bg-red-600" },
              { icon: <Linkedin className="w-5 h-5" />, href: "#", color: "hover:bg-blue-700" }
            ].map((social, index) => (
              <a 
                key={index}
                href={social.href} 
                className={`p-2 sm:p-2.5 bg-white/5 border border-white/10 rounded-md text-white ${social.color} hover:border-transparent transition-colors duration-300`}
                aria-label={`Follow us on ${social.href.replace('#', '')}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-8 text-zinc-500 text-center sm:text-left">
            <p className="text-xs sm:text-sm">
              &copy; {new Date().getFullYear()} Nava Jyoti Higher Secondary School
            </p>
            <div className="flex gap-4 sm:gap-6">
              <a href="#" className="text-xs hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-xs hover:text-white transition-colors">Terms of Use</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};