import React from "react";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";

// Define data for events section
const events = [
  {
    id: 1,
    title: "Pre-school Convocation Cerem…",
    date: "4",
    month: "Apr",
    background: "/background-1.png",
    link: "#"
  },
  {
    id: 2,
    title: "Book Talk",
    date: "3",
    month: "Mar",
    background: "/background-2.png",
    link: "#"
  },
  {
    id: 3,
    title: "Pre-primary 7th Exhibition 2081",
    date: "28",
    month: "Feb",
    background: "/background-3.png",
    link: "#"
  },
  {
    id: 4,
    title: "Saraswati Puja - 2081",
    date: "3",
    month: "Feb",
    background: "/background-4.png",
    link: "#",
    isWide: true
  }
];

export const EventsSection = (): JSX.Element => {
  return (
    <div className="relative max-w-[1200px] w-[1200px] h-[798.39px]">
      <h2 className="w-[237px] tracking-[2.00px] absolute h-[39px] -top-0.5 left-[15px] [font-family:'Quicksand',Helvetica] font-bold text-babylonschooledunptundora text-[32px] leading-[38.4px] whitespace-nowrap">
        Latest Events
      </h2>
      <Button 
        className="flex w-[30px] h-[30px] items-center justify-center absolute top-1 left-[1155px] bg-[#12a5bf] rounded-[15px] shadow-[0px_10px_50px_#12a5bf4f] p-0"
      >
        <img
          className="relative w-[18px] h-[18px]"
          alt="Component"
          src="/component-1-32.svg"
        />
      </Button>
      {/* Event Cards */}
      {events.map((event) => (
        <Card 
          key={event.id}
          className={`flex flex-col items-start absolute top-[88px] rounded-[15px] overflow-hidden border-none shadow-none
            ${event.isWide ? 'w-[777px] h-[250px] left-[408px] top-[348px]' : 'w-[383px] h-[250px]'}
            ${event.id === 1 ? 'left-[15px] h-[510px]' : event.id === 2 ? 'left-[408px]' : event.id === 3 ? 'left-[802px]' : ''}
          `}
        >
          <CardContent className="p-0 h-full w-full">
            <div className="flex items-start justify-center relative self-stretch w-full h-full">
              <div className={`relative flex-1 grow self-stretch rounded-[15px] [background:url(${event.background})_50%_50%_/_cover]`}>
                <div className={`w-full h-full rounded-[15px] [background:linear-gradient(180deg,rgba(0,0,0,1)_0%,rgba(0,0,0,0.01)_12%,rgba(0,0,0,0.04)_22%,rgba(0,0,0,0.07)_31%,rgba(0,0,0,0.12)_39%,rgba(0,0,0,0.18)_47%,rgba(0,0,0,0.25)_53%,rgba(0,0,0,0.32)_59%,rgba(0,0,0,0.39)_64%,rgba(0,0,0,0.47)_69%,rgba(0,0,0,0.54)_74%,rgba(0,0,0,0.61)_79%,rgba(0,0,0,0.67)_84%,rgba(0,0,0,0.72)_89%,rgba(0,0,0,0.76)_94%,rgba(0,0,0,0.79)_100%)]`} />
              </div>
              <div className={`flex flex-col w-full items-start gap-2.5 p-5 absolute ${event.id === 1 ? 'top-[370px]' : 'top-[110px]'} left-0`}>
                <div className="flex flex-col items-center relative self-stretch w-full flex-[0_0_auto]">
                  <a
                    className="relative self-stretch mt-[-1.00px] [font-family:'Quicksand',Helvetica] font-medium text-babylonschooledunpwhite text-[22px] text-center tracking-[0] leading-[33px]"
                    href={event.link}
                  >
                    {event.title}
                  </a>
                </div>
                <div className="flex flex-col items-center p-2.5 relative self-stretch w-full flex-[0_0_auto]">
                  <a
                    className="relative self-stretch mt-[-1.00px] font-babylonschool-edu-np-quicksand-medium-title font-[number:var(--babylonschool-edu-np-quicksand-medium-title-font-weight)] text-babylonschooledunpwhite text-[length:var(--babylonschool-edu-np-quicksand-medium-title-font-size)] text-center tracking-[var(--babylonschool-edu-np-quicksand-medium-title-letter-spacing)] leading-[var(--babylonschool-edu-np-quicksand-medium-title-line-height)] [font-style:var(--babylonschool-edu-np-quicksand-medium-title-font-style)]"
                    href={event.link}
                  >
                    Read More
                  </a>
                </div>
              </div>
              <div className="flex w-10 h-20 items-center justify-center pt-[26.5px] pb-[11.5px] px-0 absolute top-0 left-5 bg-babylonschooledunpeastern-blue">
                <div className="inline-flex flex-col items-center gap-px relative flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Quicksand',Helvetica] font-bold text-babylonschooledunpwhite text-lg text-center tracking-[0] leading-[21px] whitespace-nowrap">
                    {event.date}
                  </div>
                  <a
                    className="relative w-fit font-babylonschool-edu-np-semantic-heading-3 font-[number:var(--babylonschool-edu-np-semantic-heading-3-font-weight)] text-babylonschooledunpwhite text-[length:var(--babylonschool-edu-np-semantic-heading-3-font-size)] text-center tracking-[var(--babylonschool-edu-np-semantic-heading-3-letter-spacing)] leading-[var(--babylonschool-edu-np-semantic-heading-3-line-height)] whitespace-nowrap [font-style:var(--babylonschool-edu-np-semantic-heading-3-font-style)]"
                    href={event.link}
                  >
                    {event.month}
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};