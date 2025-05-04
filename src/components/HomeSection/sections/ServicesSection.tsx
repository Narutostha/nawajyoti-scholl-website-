import React from "react";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";

// Define data for services section
const services = [
  {
    id: 1,
    title: "CAFETERIA",
    icon: "/component-1-17.svg",
    bgColor: "bg-babylonschooledunpalizarin-crimson",
    textColor: "text-babylonschooledunpwhite"
  },
  {
    id: 2,
    title: "TRANSPORTATION",
    icon: "/component-1-35.svg",
    bgColor: "bg-babylonschooledunplavender-blush",
    textColor: "text-babylonschooledunpmartinique"
  },
  {
    id: 3,
    title: "LIBRARY",
    icon: "/component-1-29.svg",
    bgColor: "bg-babylonschooledunpselago",
    textColor: "text-babylonschooledunpmartinique"
  },
  {
    id: 4,
    title: "SCOUT",
    icon: "/1706777337369-2fcfc559-1cdd-4c0b-963c-817a74b63761-png.png",
    bgColor: "bg-babylonschooledunpfair-pink",
    textColor: "text-babylonschooledunpmartinique",
    isImage: true
  }
];

export const ServicesSection = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center py-[99px] w-full bg-babylonschooledunpmagnolia relative">
      <div className="flex flex-col w-full items-start absolute top-[1000px] left-0 overflow-hidden">
        <img
          className="relative w-[2017.3px] h-[83px] mr-[-577.30px]"
          alt="Component"
          src="/component-1-14.svg"
        />
      </div>
      <div className="flex flex-col max-w-[1200px] w-[1200px] items-center gap-[50px] px-[15px] py-0 relative">
        <h2 className="relative w-fit mt-[-1.00px] [font-family:'Quicksand',Helvetica] font-bold text-babylonschooledunptundora text-4xl text-center tracking-[0] leading-[42px] whitespace-nowrap">
          Services We Provide
        </h2>
        <div className="flex flex-col items-start gap-10 relative self-stretch w-full">
          <div className="flex items-start gap-5 relative self-stretch w-full">
            {services.map((service) => (
              <Card 
                key={service.id}
                className={`flex-1 ${service.id === 5 ? 'max-w-[150px]' : ''} ${service.bgColor} rounded-[15px] border-none shadow-none`}
              >
                <CardContent className="flex flex-col items-center justify-center gap-3.5 py-[30px] px-10">
                  {service.isImage ? (
                    <div className="relative w-[60px] h-[60px] bg-[url(/1706777337369-2fcfc559-1cdd-4c0b-963c-817a74b63761-png.png)] bg-cover bg-[50%_50%]" />
                  ) : (
                    <div className="flex flex-col w-[60px] h-[60px] items-center justify-center">
                      <img className="relative w-[60px] h-[60px]" alt="Component" src={service.icon} />
                    </div>
                  )}
                  
                  <div className={`relative w-fit font-babylonschool-edu-np-quicksand-bold-upper font-[number:var(--babylonschool-edu-np-quicksand-bold-upper-font-weight)] ${service.textColor} text-[length:var(--babylonschool-edu-np-quicksand-bold-upper-font-size)] text-center tracking-[var(--babylonschool-edu-np-quicksand-bold-upper-letter-spacing)] leading-[var(--babylonschool-edu-np-quicksand-bold-upper-line-height)] whitespace-nowrap [font-style:var(--babylonschool-edu-np-quicksand-bold-upper-font-style)]`}>
                    {service.title}
                  </div>
                </CardContent>
              </Card>
            ))}
            
            <Card className="flex-1 max-w-[150px] bg-babylonschooledunpclear-day rounded-[15px] border-none shadow-none">
              <CardContent className="flex flex-col items-center justify-center gap-3.5 py-[30px] px-3.5">
                <div className="flex flex-col w-[60px] h-[60px] items-center justify-center">
                  <img className="relative w-[60px] h-[60px]" alt="Component" src="/component-1-33.svg" />
                </div>
                <a
                  href="#"
                  className="relative w-fit font-babylonschool-edu-np-quicksand-bold-upper font-[number:var(--babylonschool-edu-np-quicksand-bold-upper-font-weight)] text-babylonschooledunpmartinique text-[length:var(--babylonschool-edu-np-quicksand-bold-upper-font-size)] text-center tracking-[var(--babylonschool-edu-np-quicksand-bold-upper-letter-spacing)] leading-[var(--babylonschool-edu-np-quicksand-bold-upper-line-height)] whitespace-nowrap [font-style:var(--babylonschool-edu-np-quicksand-bold-upper-font-style)]"
                >
                  VIEW ALL
                </a>
              </CardContent>
            </Card>
          </div>

          {/* Featured Service - Cafeteria */}
          <Card className="relative self-stretch w-full h-[550px] bg-babylonschooledunpwhite rounded-[15px] overflow-hidden border-none shadow-none">
            <CardContent className="p-0">
              <img
                className="absolute w-[510px] h-[450px] top-[50px] left-[50px]"
                alt="Image"
                src="/image.png"
              />
              <div className="absolute w-[146px] h-[38px] top-[87px] left-[610px] [font-family:'Quicksand',Helvetica] font-bold text-babylonschooledunptundora text-[32px] tracking-[0] leading-[37.3px] whitespace-nowrap">
                Cafeteria
              </div>
              <div className="absolute w-[506px] h-[252px] top-36 left-[610px] font-babylonschool-edu-np-quicksand-regular font-[number:var(--babylonschool-edu-np-quicksand-regular-font-weight)] text-babylonschooledunptuna text-[length:var(--babylonschool-edu-np-quicksand-regular-font-size)] tracking-[var(--babylonschool-edu-np-quicksand-regular-letter-spacing)] leading-[var(--babylonschool-edu-np-quicksand-regular-line-height)] [font-style:var(--babylonschool-edu-np-quicksand-regular-font-style)]">
                Indulge in a healthy culinary experience at our school<br/>cafeteria, where we prioritize the well-being of our students.<br/>Our hygienic cafeteria is dedicated to serving nutritious<br/>meals, providing a foundation for their overall growth and<br/>development. With a meticulously crafted and well-<br/>developed kitchen menu, we ensure that every meal supplies<br/>the es...
              </div>
              <Button 
                className="absolute top-[417px] left-[610px] bg-[#12a5bf] rounded-[10px] shadow-[0px_60px_45px_#2836491a] text-babylonschooledunpwhite"
              >
                <a
                  href="#"
                  className="relative w-fit mt-[-1.00px] [font-family:'Quicksand',Helvetica] font-medium text-babylonschooledunpwhite text-sm tracking-[0] leading-[24.5px] whitespace-nowrap"
                >
                  Read More
                </a>
                <img
                  className="relative w-[22px] h-[22px]"
                  alt="Component"
                  src="/component-1-32.svg"
                />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};