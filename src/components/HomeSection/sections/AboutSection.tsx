import React from "react";
import { Button } from "../../ui/button";

export const AboutSection = (): JSX.Element => {
  return (
    <div className="relative w-full h-[650px]">
      <img
        className="absolute w-[560px] h-[450px] top-[100px] left-[135px]"
        alt="Image shadow"
        src="/students.jpg"
      />
      <div className="absolute w-[91px] h-5 top-[116px] left-[745px] [font-family:'Quicksand',Helvetica] font-normal text-babylonschooledunpeastern-blue text-base tracking-[0] leading-[19.8px] whitespace-nowrap">
        Welcome To
      </div>
      <div className="absolute w-[381px] h-[38px] top-[137px] left-[745px] [font-family:'Quicksand',Helvetica] font-bold text-babylonschooledunptundora text-[32px] tracking-[0] leading-[37.3px] whitespace-nowrap">
        Nava Jyoti Higher Secondary School
      </div>
      <div className="absolute w-[545px] h-72 top-[189px] left-[745px] [font-family:'Quicksand',Helvetica] font-normal text-babylonschooledunptuna text-base tracking-[0] leading-8">
        We are a community of passionate educators dedicated since 2038 B.S to<br/>providing a dynamic and engaging learning environment for all our<br/>students. We are located at Basukinagar,Tinkune, Kathmandu. Our team of<br/>experienced teachers works tirelessly to inspire and motivate students to<br/>achieve their full potential. We strive to create a welcoming and inclusive<br/>school culture that fosters a love of learning, creativity, and collaboration.<br/>We are committed to empowering students to become lifelong learners<br/>who are equipped with the 21st-century skills and knowledge they need to<br/>succeed in a rapidly changing wor...
      </div>
      <div className="absolute top-[493px] left-[745px]">
        <Button 
          variant="outline" 
          className="h-[39px] rounded-[10px] border border-babylonschooledunpeastern-blue shadow-[0px_30px_20px_#12a5bf26] bg-babylonschooledunpwhite-02"
        >
          <a
            href="#"
            className="font-medium text-babylonschooledunpeastern-blue text-sm leading-[24.5px]"
          >
            Read More
          </a>
        </Button>
      </div>
    </div>
  );
};