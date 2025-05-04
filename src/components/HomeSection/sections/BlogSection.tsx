import React from "react";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";

// Define data for blog posts
const blogPosts = [
  {
    id: 1,
    title: "ियात्र",
    excerpt: "ुल्मी घुम्दा हिजो नै झोलाहरू तयार अवस्थामा राख…",
    date: "January 24",
    image: "/mask-group-2.svg"
  },
  {
    id: 2,
    title: "Dreams",
    excerpt: "Dreams too big to be achieved, Some…",
    date: "January 24",
    image: "/mask-group-1.svg"
  },
  {
    id: 3,
    title: "Life and Its Struggles",
    excerpt: "Happiness and sadness Never remain…",
    date: "January 24",
    image: "/mask-group.svg"
  }
];

export const BlogSection = (): JSX.Element => {
  return (
    <div className="flex flex-col items-center px-0 py-[100px] relative self-stretch w-full flex-[0_0_auto] bg-babylonschooledunpselago-47">
      <div className="relative max-w-[1200px] w-[1200px] h-[620.39px]">
        <h2 className="w-[177px] tracking-[var(--babylonschool-edu-np-semantic-heading-2-letter-spacing)] absolute h-[39px] -top-0.5 left-[15px] font-babylonschool-edu-np-semantic-heading-2 font-[number:var(--babylonschool-edu-np-semantic-heading-2-font-weight)] text-babylonschooledunptundora text-[length:var(--babylonschool-edu-np-semantic-heading-2-font-size)] leading-[var(--babylonschool-edu-np-semantic-heading-2-line-height)] whitespace-nowrap [font-style:var(--babylonschool-edu-np-semantic-heading-2-font-style)]">
          Latest Blog
        </h2>
        {/* Blog Post Cards */}
        {blogPosts.map((post, index) => (
          <Card 
            key={post.id}
            className="absolute w-[373px] h-[450px] top-[88px] bg-white rounded-[20px] overflow-hidden shadow-[0px_10px_50px_#a6d1ed33] border-none"
            style={{ left: `${15 + (index * 398)}px` }}
          >
            <CardContent className="p-0">
              <img
                className="absolute w-[500px] h-[450px] top-[-190px] left-[-63px]"
                alt="Mask group"
                src={post.image}
              />
              <div className="flex flex-col w-[333px] items-start pt-3 pb-[2.34px] px-0 absolute top-[343px] left-5">
                <div className="inline-flex items-start px-0 py-[0.5px] relative flex-[0_0_auto]">
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Quicksand',Helvetica] font-bold text-babylonschooledunptundora text-lg tracking-[0] leading-[21px] whitespace-nowrap">
                    {post.title}
                  </div>
                </div>
              </div>
              <div className={`${post.id === 1 ? 'w-[333px] h-[30px] top-[400px] absolute left-5' : 'inline-flex flex-col items-start pl-0 pr-[1.77px] py-0 absolute top-[403px] left-5'}`}>
                {post.id === 1 ? (
                  <>
                    <div className="inline-flex flex-col items-start pl-0 pr-[12.27px] py-0 absolute top-[3px] left-0">
                      <div className="relative w-fit mt-[-1.00px] [font-family:'Quicksand',Helvetica] font-medium text-babylonschooledunptuna text-base tracking-[0] leading-6 whitespace-nowrap">
                        {post.excerpt}
                      </div>
                    </div>
                    <div className="inline-flex min-w-[30px] h-[30px] items-center justify-center px-[7px] py-0 absolute top-0 left-[303px] bg-[#12a5bf] rounded-[15px] shadow-[8px_8px_30px_#2a43711f]">
                      <img
                        className="relative w-4 h-4"
                        alt="Component"
                        src="/component-1-32.svg"
                      />
                    </div>
                  </>
                ) : (
                  <div className="relative w-fit mt-[-1.00px] [font-family:'Quicksand',Helvetica] font-medium text-babylonschooledunptuna text-base tracking-[0] leading-6 whitespace-nowrap">
                    {post.excerpt}
                  </div>
                )}
              </div>
              {post.id !== 1 && (
                <div className="inline-flex min-w-[30px] h-[30px] items-center justify-center px-[7px] py-0 absolute top-[400px] left-[323px] bg-[#12a5bf] rounded-[15px] shadow-[8px_8px_30px_#2a43711f]">
                  <img
                    className="relative w-4 h-4"
                    alt="Component"
                    src="/component-1-32.svg"
                  />
                </div>
              )}
              
              <div className="inline-flex items-start px-2.5 py-[5px] absolute top-[286px] left-5 bg-babylonschooledunpwhite rounded-[10px] shadow-[0px_10px_50px_#a6d1ed33]">
                <div className="relative w-fit mt-[-1.00px] [font-family:'Quicksand',Helvetica] font-bold text-babylonschooledunptundora text-lg tracking-[0] leading-[27px] whitespace-nowrap">
                  {post.date}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        <Button 
          variant="outline"
          className="inline-flex min-w-16 items-center justify-center gap-2 pl-[22px] pr-[18px] py-3 absolute top-[568px] left-[537px] rounded-[15px] border-2 border-solid border-[#12a5bf]"
        >
          <a
            className="relative w-fit mt-[-2.00px] [font-family:'Quicksand',Helvetica] font-normal text-babylonschooledunpeastern-blue text-base text-center tracking-[0] leading-7 whitespace-nowrap"
            href="#"
          >
            View All
          </a>
          <img
            className="relative w-5 h-5"
            alt="Component"
            src="/component-1-32.svg"
          />
        </Button>
      </div>
    </div>
  );
};