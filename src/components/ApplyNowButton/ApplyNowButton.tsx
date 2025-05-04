import React from "react";
import { Button } from "../ui/button";

export const ApplyNowButton = (): JSX.Element => {
  return (
    <div className="fixed w-[80px] h-[80px] top-0 right-[115px]">
      <Button
        className="flex w-20 h-20 items-center justify-center pt-[17.7px] pb-[18.4px] px-0 relative bg-babylonschooledunpeastern-blue rounded-[40px] hover:bg-babylonschooledunpeastern-blue/90"
      >
        <span className="font-babylonschool-edu-np-semantic-heading-4 font-[number:var(--babylonschool-edu-np-semantic-heading-4-font-weight)] text-babylonschooledunpwhite text-[length:var(--babylonschool-edu-np-semantic-heading-4-font-size)] tracking-[var(--babylonschool-edu-np-semantic-heading-4-letter-spacing)] leading-[var(--babylonschool-edu-np-semantic-heading-4-line-height)] [font-style:var(--babylonschool-edu-np-semantic-heading-4-font-style)] text-center">
          Apply
          <br />
          Now!
        </span>
      </Button>
    </div>
  );
};