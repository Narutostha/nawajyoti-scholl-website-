import React from "react";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";

// Define data for course categories
const courseCategories = [
  {
    id: 1,
    title: "Early Childhood Education",
    image: "/image-2.png",
    description: "Engaging young children in Activity Based Learning, enhancing their understanding and retention through hands-on tasks and projects. We implement a thematic cur.....",
    link: "#",
    bgColor: "bg-babylonschooledunpcyan-aqua-30"
  },
  {
    id: 2,
    title: "Basic Level Education",
    image: "/image-3.png",
    description: "Incorporating the Playway Method, using interactive play and hands-on activities to promote cognitive and social development. The Learning by Doing approach enc.....",
    link: "#",
    bgColor: "bg-babylonschooledunpshamrock-30"
  },
  {
    id: 3,
    title: "Secondary Level Education",
    image: "/image-4.png",
    description: "A progressive approach focused on student-centered learning, emphasizing critical thinking, collaboration, and real-world problem-solving through interactive an.....",
    link: "#",
    bgColor: "bg-babylonschooledunptorch-red-30"
  }
];

export const CoursesSection = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center px-0 py-[100px] relative self-stretch w-full flex-[0_0_auto] bg-babylonschooledunpselago-47">
      <div className="relative max-w-[1200px] w-[1200px] h-[577.25px]">
        <h2 className="absolute w-[500px] h-[38px] -top-px left-[15px] [font-family:'Quicksand',Helvetica] font-bold text-babylonschooledunptundora text-[32px] tracking-[2.00px] leading-[37.3px] whitespace-nowrap">
          Browse Our Course Category
        </h2>
        <Button 
          className="flex w-[30px] h-[30px] items-center justify-center absolute top-1 left-[1155px] bg-[#12a5bf] rounded-[15px] p-0"
        >
          <img
            className="relative w-[18px] h-[18px]"
            alt="Component"
            src="/component-1-32.svg"
          />
        </Button>
        {/* Course Category Cards */}
        {courseCategories.map((category, index) => (
          <Card 
            key={category.id}
            className="flex flex-col w-[373px] items-center gap-5 pt-10 pb-[42.01px] px-10 absolute top-[87px] rounded-[15px] overflow-hidden bg-babylonschooledunpwhite shadow-[0px_10px_50px_#a6d1ed33] border-none"
            style={{ left: `${15 + (index * 398)}px` }}
          >
            <CardContent className="p-0 flex flex-col items-center gap-5 w-full">
              <img
                className="relative w-[293.33px] h-[150px]"
                alt="Image"
                src={category.image}
              />
              <div className="absolute w-[5px] h-20 top-0 left-[328px] bg-babylonschooledunpeastern-blue" />
              <div className="absolute w-[3px] h-[50px] top-0 left-[310px] bg-babylonschooledunpalizarin-crimson" />
              <div className={`flex w-[100px] h-[100px] items-center justify-center absolute top-[428px] -left-5 ${category.bgColor} rounded-[50px] opacity-20`}>
                <div className="relative w-fit font-babylonschool-edu-np-quicksand-bold font-[number:var(--babylonschool-edu-np-quicksand-bold-font-weight)] text-babylonschooledunptundora text-[length:var(--babylonschool-edu-np-quicksand-bold-font-size)] text-center tracking-[var(--babylonschool-edu-np-quicksand-bold-letter-spacing)] leading-[var(--babylonschool-edu-np-quicksand-bold-line-height)] whitespace-nowrap [font-style:var(--babylonschool-edu-np-quicksand-bold-font-style)]">
                  0{category.id}
                </div>
              </div>
              <div className="flex flex-col items-center pt-[7px] pb-0.5 px-0 relative self-stretch w-full">
                <div className="inline-flex items-start justify-center relative">
                  <a
                    className="relative w-fit mt-[-1.00px] [font-family:'Quicksand',Helvetica] font-medium text-babylonschooledunptundora text-lg text-center tracking-[1.00px] leading-[27px] whitespace-nowrap"
                    href={category.link}
                  >
                    {category.title}
                  </a>
                </div>
              </div>
              <div className="relative w-fit [font-family:'Quicksand',Helvetica] font-normal text-babylonschooledunptuna text-base text-center tracking-[0] leading-8">
                {category.description}
              </div>
              <div className="relative w-[100.22px] h-5">
                <div className="relative w-[100px] h-6 top-[-3px]">
                  <a
                    className="absolute w-[83px] h-6 top-0 left-0 [font-family:'Quicksand',Helvetica] font-medium text-babylonschooledunptundora text-base text-center tracking-[0] leading-6 whitespace-nowrap"
                    href={category.link}
                  >
                    Read More
                  </a>
                  <img
                    className="absolute w-[18px] h-[18px] top-1.5 left-[82px]"
                    alt="Component"
                    src="/component-1-32.svg"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};