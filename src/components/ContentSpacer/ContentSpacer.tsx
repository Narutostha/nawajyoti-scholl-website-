import React, { useEffect, useState } from "react";

export const ContentSpacer = (): JSX.Element => {
  const [topHeaderHeight, setTopHeaderHeight] = useState(0);
  const [mainHeaderHeight, setMainHeaderHeight] = useState(0);
  const [isTopHeaderVisible, setIsTopHeaderVisible] = useState(true);

  useEffect(() => {
    const updateHeights = () => {
      const topHeader = document.querySelector('[data-topheader="true"]');
      const mainHeader = document.querySelector('[data-mainheader="true"]');
      
      if (topHeader) {
        setTopHeaderHeight(topHeader.clientHeight);
        setIsTopHeaderVisible(!topHeader.classList.contains('-translate-y-full'));
      }
      
      if (mainHeader) {
        setMainHeaderHeight(mainHeader.clientHeight);
      }
    };

    // Initial measurement
    updateHeights();
    
    // Listen for scroll events to detect visibility changes
    const handleScroll = () => {
      const topHeader = document.querySelector('[data-topheader="true"]');
      if (topHeader) {
        setIsTopHeaderVisible(!topHeader.classList.contains('-translate-y-full'));
      }
    };
    
    // Listen for resize events to update heights
    window.addEventListener('resize', updateHeights);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', updateHeights);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Calculate total height needed for the spacer
  const totalHeight = isTopHeaderVisible 
    ? topHeaderHeight + mainHeaderHeight 
    : mainHeaderHeight;

  return <div style={{ height: `${totalHeight}px` }} />;
};