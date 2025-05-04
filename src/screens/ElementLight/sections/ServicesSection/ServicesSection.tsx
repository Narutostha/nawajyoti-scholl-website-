import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const ServicesSection = (): JSX.Element => {
  // Data for useful links
  const usefulLinks = [
    { url: "http://localhost:5173/about/about-us", text: "About" },
    {
      url: "http://localhost:5173/gallery/hanging-garden-vol_1",
      text: "Gallery",
    },
    {
      url: "http://localhost:5173/information-center/eca/enhancing-eca",
      text: "Information Center",
    },
    {
      url: "http://localhost:5173/babylon-buds/babylon-buds-issue_24",
      text: "Babylon Buds",
    },
    {
      url: "http://localhost:5173/parents-portal",
      text: "Parents Portal",
    },
    { url: "http://localhost:5173/news", text: "News" },
  ];

  // Data for contact info
  const contactInfo = [
    {
      icon: "/component-1-25.svg",
      text: "BalaBhadra Marga, Kathmandu",
      url: "https://www.google.com/maps/search/",
    },
    {
      icon: "/component-1-40.svg",
      text: "info@babylonschool.edu.np",
      url: "mailto: info@babylonschool.edu.np",
    },
    {
      icon: "/component-1-24.svg",
      text: "+977-1-4108905, 4108973",
      url: null,
    },
  ];

  // Data for social media
  const socialMedia = [
    { icon: "/component-1-5.svg", alt: "Social media icon" },
    { icon: "/component-1-22.svg", alt: "Social media icon" },
    { icon: "/component-1-19.svg", alt: "Social media icon" },
    { icon: "/component-1-9.svg", alt: "Social media icon" },
  ];

  return (
    <footer className="relative w-full py-16 pb-48 overflow-hidden bg-gradient-to-br from-[rgba(255,254,255,1)] to-[rgba(215,255,254,1)]">
      {/* Background image */}
      <div className="absolute inset-0 w-full h-[586px] opacity-90 bg-[url(/image-5.png)] bg-cover bg-center" />

      {/* Wave decoration */}
      <div className="absolute top-[396px] left-0 w-full overflow-hidden">
        <img
          className="relative w-full max-w-[1510px] h-[190px]"
          alt="Wave decoration"
          src="/component-1-14.svg"
        />
      </div>

      <div className="container relative mx-auto max-w-[1200px] px-6 z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Us Column */}
          <Card className="border-0 bg-transparent">
            <CardContent className="p-6 space-y-6">
              <h2 className="font-semibold text-[22px] text-babylonschooledunptundora leading-[25.7px]">
                About Us
              </h2>

              <div className="w-full max-h-[60px] h-[60px] bg-[url(/babylon-national-school.png)] bg-cover bg-center" />

              <p className="font-medium text-babylonschooledunptundora text-base leading-8">
                Babylon National School is a co-ed English medium school
                <br />
                from PG to secondary level.
              </p>
            </CardContent>
          </Card>

          {/* Useful Links Column */}
          <Card className="border-0 bg-transparent">
            <CardContent className="p-6 space-y-6">
              <h2 className="font-semibold text-[22px] text-babylonschooledunptundora leading-[25.7px]">
                Useful Links
              </h2>

              <div className="flex flex-col space-y-4">
                {usefulLinks.map((link, index) => (
                  <div key={index} className="flex items-center">
                    <img
                      className="w-6 h-6"
                      alt="Arrow icon"
                      src="/component-1.svg"
                    />
                    <a
                      href={link.url}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="font-medium text-babylonschooledunptundora text-base leading-6 ml-2"
                    >
                      {link.text}
                    </a>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact Info Column */}
          <Card className="border-0 bg-transparent">
            <CardContent className="p-6 space-y-6">
              <h2 className="font-semibold text-[22px] text-babylonschooledunptundora leading-[25.7px]">
                Contact Info
              </h2>

              <div className="flex flex-col space-y-4">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <img
                      className="w-[22px] h-[22px]"
                      alt="Contact icon"
                      src={item.icon}
                    />
                    {item.url ? (
                      <a
                        href={item.url}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="font-medium text-babylonschooledunptundora text-base leading-6 ml-2 whitespace-nowrap"
                      >
                        {item.text}
                      </a>
                    ) : (
                      <span className="font-medium text-babylonschooledunptundora text-base leading-6 ml-2 whitespace-nowrap">
                        {item.text}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <h3 className="font-babylonschool-edu-np-semantic-heading-1 text-babylonschooledunptundora text-[length:var(--babylonschool-edu-np-semantic-heading-1-font-size)] tracking-[var(--babylonschool-edu-np-semantic-heading-1-letter-spacing)] leading-[var(--babylonschool-edu-np-semantic-heading-1-line-height)]">
                Follow Us
              </h3>

              <div className="flex space-x-4">
                {socialMedia.map((item, index) => (
                  <div key={index} className="inline-flex">
                    <img className="w-6 h-6" alt={item.alt} src={item.icon} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Copyright */}
        <div className="text-center mt-12">
          <p className="font-babylonschool-edu-np-quicksand-medium text-babylonschooledunpwhite text-[length:var(--babylonschool-edu-np-quicksand-medium-font-size)] tracking-[var(--babylonschool-edu-np-quicksand-medium-letter-spacing)] leading-[var(--babylonschool-edu-np-quicksand-medium-line-height)]">
            © Copyright 2025 Babylon National School. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};
