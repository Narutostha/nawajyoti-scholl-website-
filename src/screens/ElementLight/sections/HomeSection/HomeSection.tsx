import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "../../../../components/ui/card";

// Services carousel component that will be used in the HomeSection
export const ServicesCarousel = ({ services }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(1);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);
  
  // Update visible items based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1); // Mobile: 1 item
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2); // Tablet: 2 items
      } else if (window.innerWidth < 1280) {
        setVisibleItems(3); // Desktop: 3 items
      } else {
        setVisibleItems(4); // Large desktop: 4 items
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Set up autoplay
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        nextSlide();
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [currentIndex, isPaused, visibleItems]);
  
  // Handle next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      return newIndex >= services.length - visibleItems + 1 ? 0 : newIndex;
    });
  };
  
  // Handle previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      return newIndex < 0 ? services.length - visibleItems : newIndex;
    });
  };
  
  // Touch event handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };
  
  return (
    <div className="w-full">
      <div className="relative">
        {/* Navigation buttons */}
        <button 
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 w-8 h-8 md:w-10 md:h-10 bg-white rounded-full shadow-md flex items-center justify-center focus:outline-none hover:bg-gray-100 transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
        
        {/* Carousel container */}
        <div 
          ref={carouselRef}
          className="overflow-hidden mx-4 md:mx-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }}
          >
            {services.map((service, index) => (
              <div 
                key={service.id}
                className="flex-shrink-0 px-2 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
              >
                <Card 
                  className={`${service.bgColor} rounded-[15px] border-none shadow-none h-full`}
                >
                  <CardContent className="flex flex-col items-center justify-center gap-3.5 py-5 px-4 md:py-[30px] md:px-6 lg:px-10 h-full">
                    {service.isImage ? (
                      <div className="relative w-12 h-12 md:w-[60px] md:h-[60px] bg-[url(/1706777337369-2fcfc559-1cdd-4c0b-963c-817a74b63761-png.png)] bg-cover bg-[50%_50%]" />
                    ) : (
                      <div className="flex items-center justify-center w-12 h-12 md:w-[60px] md:h-[60px]">
                        <img className="w-full h-full object-contain" alt={service.title} src={service.icon} />
                      </div>
                    )}
                    
                    {service.id === 5 ? (
                      <a
                        href="http://localhost:5173/information-center/facilities"
                        rel="noopener noreferrer"
                        target="_blank"
                        className={`text-sm md:text-base font-bold ${service.textColor} text-center whitespace-nowrap`}
                      >
                        VIEW ALL
                      </a>
                    ) : (
                      <div className={`text-sm md:text-base font-bold ${service.textColor} text-center whitespace-nowrap`}>
                        {service.title}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
        
        <button 
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 w-8 h-8 md:w-10 md:h-10 bg-white rounded-full shadow-md flex items-center justify-center focus:outline-none hover:bg-gray-100 transition-colors"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      </div>
      
      {/* Pagination dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: services.length - visibleItems + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${currentIndex === index ? 'bg-babylonschooledunpeastern-blue' : 'bg-gray-300'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// Updated HomeSection component with the carousel integrated
export const HomeSection = (): JSX.Element => {
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
    },
    {
      id: 5,
      title: "VIEW ALL",
      icon: "/component-1-33.svg",
      bgColor: "bg-babylonschooledunpclear-day",
      textColor: "text-babylonschooledunpmartinique"
    }
  ];

  // Define data for events section
  const events = [
    {
      id: 1,
      title: "Pre-school Convocation Cerem…",
      date: "4",
      month: "Apr",
      background: "/background-1.png",
      link: "http://localhost:5173/p/pre-school-convocation-ceremony-2081-17365"
    },
    {
      id: 2,
      title: "Book Talk",
      date: "3",
      month: "Mar",
      background: "/background-2.png",
      link: "http://localhost:5173/p/book-talk-16605"
    },
    {
      id: 3,
      title: "Pre-primary 7th Exhibition 2081",
      date: "28",
      month: "Feb",
      background: "/background-3.png",
      link: "http://localhost:5173/p/pre-primary-7th-exhibition-2081-16604"
    },
    {
      id: 4,
      title: "Saraswati Puja - 2081",
      date: "3",
      month: "Feb",
      background: "/background-4.png",
      link: "http://localhost:5173/p/saraswati-puja-2081-16367",
      isWide: true
    }
  ];

  // Define data for course categories
  const courseCategories = [
    {
      id: 1,
      title: "Early Childhood Education",
      image: "/image-2.png",
      description: "Engaging young children in Activity Based Learning, enhancing their understanding and retention through hands-on tasks and projects. We implement a thematic cur.....",
      link: "http://localhost:5173/p/early-childhood-education-4055",
      bgColor: "bg-babylonschooledunpcyan-aqua-30"
    },
    {
      id: 2,
      title: "Basic Level Education",
      image: "/image-3.png",
      description: "Incorporating the Playway Method, using interactive play and hands-on activities to promote cognitive and social development. The Learning by Doing approach enc.....",
      link: "http://localhost:5173/p/basic-level-education-4056",
      bgColor: "bg-babylonschooledunpshamrock-30"
    },
    {
      id: 3,
      title: "Secondary Level Education",
      image: "/image-4.png",
      description: "A progressive approach focused on student-centered learning, emphasizing critical thinking, collaboration, and real-world problem-solving through interactive an.....",
      link: "http://localhost:5173/p/secondary-level-education-4057",
      bgColor: "bg-babylonschooledunptorch-red-30"
    }
  ];

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

  return (
    <section className="flex flex-col w-full items-center">
      {/* Hero Section */}
      <div className="relative w-full h-[450px] sm:h-[600px] md:h-[750px] lg:h-[900px] [background:url(..//section.png)_50%_50%_/_cover]">
        <div className="w-full h-full [background:linear-gradient(180deg,rgba(0,0,0,1)_0%,rgba(0,0,0,0.01)_12%,rgba(0,0,0,0.04)_22%,rgba(0,0,0,0.07)_31%,rgba(0,0,0,0.12)_39%,rgba(0,0,0,0.18)_47%,rgba(0,0,0,0.25)_53%,rgba(0,0,0,0.32)_59%,rgba(0,0,0,0.39)_64%,rgba(0,0,0,0.47)_69%,rgba(0,0,0,0.54)_74%,rgba(0,0,0,0.61)_79%,rgba(0,0,0,0.67)_84%,rgba(0,0,0,0.72)_89%,rgba(0,0,0,0.76)_94%,rgba(0,0,0,0.79)_100%)]" />
      </div>

      {/* About Section */}
      <div className="relative w-full px-4 py-12 md:py-16 lg:py-0 lg:h-[650px]">
        <div className="container mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
          <div className="relative w-full max-w-[560px] order-2 lg:order-1">
            <img
              className="w-full h-auto max-h-[450px] object-cover rounded-lg shadow-lg relative z-10"
              alt="Image shadow"
              src="/image-shadow.png"
            />
            <div className="absolute -bottom-4 -right-4 w-full h-full bg-babylonschooledunpeastern-blue/10 rounded-lg z-0"></div>
          </div>
          
          <div className="w-full lg:max-w-[545px] order-1 lg:order-2">
            <div className="text-babylonschooledunpeastern-blue text-base mb-1">
              Welcome To
            </div>
            <h2 className="font-bold text-babylonschooledunptundora text-2xl sm:text-3xl md:text-[32px] mb-4 sm:mb-6">
              Babylon National School
            </h2>
            <div className="text-babylonschooledunptuna text-base leading-7 mb-6">
              <p>We are a community of passionate educators dedicated since 1996 to providing a dynamic and engaging learning environment for all our students. We are located at Shantinagar, Kathmandu.</p>
              <p className="mt-3">Our team of experienced teachers works tirelessly to inspire and motivate students to achieve their full potential. We strive to create a welcoming and inclusive school culture that fosters a love of learning, creativity, and collaboration.</p>
              <p className="mt-3">We are committed to empowering students to become lifelong learners who are equipped with the 21st-century skills and knowledge they need to succeed in a rapidly changing wor...</p>
            </div>
            <Button 
              variant="outline" 
              className="h-[39px] rounded-[10px] border border-babylonschooledunpeastern-blue shadow-[0px_30px_20px_#12a5bf26] bg-babylonschooledunpwhite-02"
            >
              <a
                href="http://localhost:5173/p/babylon-national-school-4051"
                rel="noopener noreferrer"
                target="_blank"
                className="font-medium text-babylonschooledunpeastern-blue text-sm leading-[24.5px]"
              >
                Read More
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="flex flex-col items-center py-16 md:py-24 w-full bg-babylonschooledunpmagnolia relative">
        <div className="hidden md:flex flex-col w-full items-start absolute top-0 left-0 overflow-hidden">
          <img
            className="relative w-full h-[83px]"
            alt="Component"
            src="/component-1-14.svg"
          />
        </div>
        
        <div className="container mx-auto px-4 flex flex-col items-center gap-8 md:gap-12 relative">
          <h2 className="font-bold text-babylonschooledunptundora text-2xl md:text-3xl lg:text-4xl text-center">
            Services We Provide
          </h2>
          
          {/* Services Carousel */}
          <ServicesCarousel services={services} />
          
          {/* Featured Service - Cafeteria */}
          <Card className="w-full rounded-[15px] overflow-hidden border-none shadow-none bg-babylonschooledunpwhite mt-8">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 md:h-[450px] overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    alt="Image"
                    src="/image.png"
                  />
                </div>
                <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col">
                  <h3 className="font-bold text-2xl md:text-[32px] text-babylonschooledunptundora mb-4 md:mb-6">
                    Cafeteria
                  </h3>
                  <div className="text-babylonschooledunptuna text-base leading-7 mb-6">
                    <p>Indulge in a healthy culinary experience at our school cafeteria, where we prioritize the well-being of our students.</p>
                    <p className="mt-3">Our hygienic cafeteria is dedicated to serving nutritious meals, providing a foundation for their overall growth and development.</p>
                    <p className="mt-3">With a meticulously crafted and well-developed kitchen menu, we ensure that every meal supplies the es...</p>
                  </div>
                  <div className="mt-auto">
                    <Button 
                      className="bg-[#12a5bf] rounded-[10px] shadow-[0px_60px_45px_#2836491a] text-babylonschooledunpwhite"
                    >
                      <a
                        href="http://localhost:5173/p/cafeteria-10639"
                        rel="noopener noreferrer"
                        target="_blank"
                        className="font-medium text-babylonschooledunpwhite text-sm whitespace-nowrap flex items-center"
                      >
                        Read More
                        <img
                          className="ml-2 w-[22px] h-[22px]"
                          alt="Component"
                          src="/component-1-32.svg"
                        />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Rest of the component remains the same */}
      {/* Testimonial Section */}
      <div className="w-full py-16 md:py-24">
        {/* ... testimonial section code ... */}
      </div>
      
      {/* Latest Events Section */}
      <div className="w-full py-16 md:py-24 bg-gray-50">
        {/* ... events section code ... */}
      </div>
      
      {/* Course Categories Section */}
      <div className="w-full py-16 md:py-24 bg-babylonschooledunpselago-47">
        {/* ... course categories section code ... */}
      </div>
      
      {/* Blog Section */}
      <div className="w-full py-16 md:py-24 bg-babylonschooledunpselago-47">
        {/* ... blog section code ... */}
      </div>
    </section>
  );
};import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "../../../../components/ui/card";

// Services carousel component that will be used in the HomeSection
export const ServicesCarousel = ({ services }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(1);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);
  
  // Update visible items based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1); // Mobile: 1 item
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2); // Tablet: 2 items
      } else if (window.innerWidth < 1280) {
        setVisibleItems(3); // Desktop: 3 items
      } else {
        setVisibleItems(4); // Large desktop: 4 items
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Set up autoplay
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        nextSlide();
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [currentIndex, isPaused, visibleItems]);
  
  // Handle next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1;
      return newIndex >= services.length - visibleItems + 1 ? 0 : newIndex;
    });
  };
  
  // Handle previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - 1;
      return newIndex < 0 ? services.length - visibleItems : newIndex;
    });
  };
  
  // Touch event handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };
  
  return (
    <div className="w-full">
      <div className="relative">
        {/* Navigation buttons */}
        <button 
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 w-8 h-8 md:w-10 md:h-10 bg-white rounded-full shadow-md flex items-center justify-center focus:outline-none hover:bg-gray-100 transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
        
        {/* Carousel container */}
        <div 
          ref={carouselRef}
          className="overflow-hidden mx-4 md:mx-8"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }}
          >
            {services.map((service, index) => (
              <div 
                key={service.id}
                className="flex-shrink-0 px-2 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
              >
                <Card 
                  className={`${service.bgColor} rounded-[15px] border-none shadow-none h-full`}
                >
                  <CardContent className="flex flex-col items-center justify-center gap-3.5 py-5 px-4 md:py-[30px] md:px-6 lg:px-10 h-full">
                    {service.isImage ? (
                      <div className="relative w-12 h-12 md:w-[60px] md:h-[60px] bg-[url(/1706777337369-2fcfc559-1cdd-4c0b-963c-817a74b63761-png.png)] bg-cover bg-[50%_50%]" />
                    ) : (
                      <div className="flex items-center justify-center w-12 h-12 md:w-[60px] md:h-[60px]">
                        <img className="w-full h-full object-contain" alt={service.title} src={service.icon} />
                      </div>
                    )}
                    
                    {service.id === 5 ? (
                      <a
                        href="http://localhost:5173/information-center/facilities"
                        rel="noopener noreferrer"
                        target="_blank"
                        className={`text-sm md:text-base font-bold ${service.textColor} text-center whitespace-nowrap`}
                      >
                        VIEW ALL
                      </a>
                    ) : (
                      <div className={`text-sm md:text-base font-bold ${service.textColor} text-center whitespace-nowrap`}>
                        {service.title}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
        
        <button 
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 w-8 h-8 md:w-10 md:h-10 bg-white rounded-full shadow-md flex items-center justify-center focus:outline-none hover:bg-gray-100 transition-colors"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      </div>
      
      {/* Pagination dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: services.length - visibleItems + 1 }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${currentIndex === index ? 'bg-babylonschooledunpeastern-blue' : 'bg-gray-300'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// Updated HomeSection component with the carousel integrated
export const HomeSection = (): JSX.Element => {
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
    },
    {
      id: 5,
      title: "VIEW ALL",
      icon: "/component-1-33.svg",
      bgColor: "bg-babylonschooledunpclear-day",
      textColor: "text-babylonschooledunpmartinique"
    }
  ];

  // Define data for events section
  const events = [
    {
      id: 1,
      title: "Pre-school Convocation Cerem…",
      date: "4",
      month: "Apr",
      background: "/background-1.png",
      link: "http://localhost:5173/p/pre-school-convocation-ceremony-2081-17365"
    },
    {
      id: 2,
      title: "Book Talk",
      date: "3",
      month: "Mar",
      background: "/background-2.png",
      link: "http://localhost:5173/p/book-talk-16605"
    },
    {
      id: 3,
      title: "Pre-primary 7th Exhibition 2081",
      date: "28",
      month: "Feb",
      background: "/background-3.png",
      link: "http://localhost:5173/p/pre-primary-7th-exhibition-2081-16604"
    },
    {
      id: 4,
      title: "Saraswati Puja - 2081",
      date: "3",
      month: "Feb",
      background: "/background-4.png",
      link: "http://localhost:5173/p/saraswati-puja-2081-16367",
      isWide: true
    }
  ];

  // Define data for course categories
  const courseCategories = [
    {
      id: 1,
      title: "Early Childhood Education",
      image: "/image-2.png",
      description: "Engaging young children in Activity Based Learning, enhancing their understanding and retention through hands-on tasks and projects. We implement a thematic cur.....",
      link: "http://localhost:5173/p/early-childhood-education-4055",
      bgColor: "bg-babylonschooledunpcyan-aqua-30"
    },
    {
      id: 2,
      title: "Basic Level Education",
      image: "/image-3.png",
      description: "Incorporating the Playway Method, using interactive play and hands-on activities to promote cognitive and social development. The Learning by Doing approach enc.....",
      link: "http://localhost:5173/p/basic-level-education-4056",
      bgColor: "bg-babylonschooledunpshamrock-30"
    },
    {
      id: 3,
      title: "Secondary Level Education",
      image: "/image-4.png",
      description: "A progressive approach focused on student-centered learning, emphasizing critical thinking, collaboration, and real-world problem-solving through interactive an.....",
      link: "http://localhost:5173/p/secondary-level-education-4057",
      bgColor: "bg-babylonschooledunptorch-red-30"
    }
  ];

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

  return (
    <section className="flex flex-col w-full items-center">
      {/* Hero Section */}
      <div className="relative w-full h-[450px] sm:h-[600px] md:h-[750px] lg:h-[900px] [background:url(..//section.png)_50%_50%_/_cover]">
        <div className="w-full h-full [background:linear-gradient(180deg,rgba(0,0,0,1)_0%,rgba(0,0,0,0.01)_12%,rgba(0,0,0,0.04)_22%,rgba(0,0,0,0.07)_31%,rgba(0,0,0,0.12)_39%,rgba(0,0,0,0.18)_47%,rgba(0,0,0,0.25)_53%,rgba(0,0,0,0.32)_59%,rgba(0,0,0,0.39)_64%,rgba(0,0,0,0.47)_69%,rgba(0,0,0,0.54)_74%,rgba(0,0,0,0.61)_79%,rgba(0,0,0,0.67)_84%,rgba(0,0,0,0.72)_89%,rgba(0,0,0,0.76)_94%,rgba(0,0,0,0.79)_100%)]" />
      </div>

      {/* About Section */}
      <div className="relative w-full px-4 py-12 md:py-16 lg:py-0 lg:h-[650px]">
        <div className="container mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
          <div className="relative w-full max-w-[560px] order-2 lg:order-1">
            <img
              className="w-full h-auto max-h-[450px] object-cover rounded-lg shadow-lg relative z-10"
              alt="Image shadow"
              src="/image-shadow.png"
            />
            <div className="absolute -bottom-4 -right-4 w-full h-full bg-babylonschooledunpeastern-blue/10 rounded-lg z-0"></div>
          </div>
          
          <div className="w-full lg:max-w-[545px] order-1 lg:order-2">
            <div className="text-babylonschooledunpeastern-blue text-base mb-1">
              Welcome To
            </div>
            <h2 className="font-bold text-babylonschooledunptundora text-2xl sm:text-3xl md:text-[32px] mb-4 sm:mb-6">
              Babylon National School
            </h2>
            <div className="text-babylonschooledunptuna text-base leading-7 mb-6">
              <p>We are a community of passionate educators dedicated since 1996 to providing a dynamic and engaging learning environment for all our students. We are located at Shantinagar, Kathmandu.</p>
              <p className="mt-3">Our team of experienced teachers works tirelessly to inspire and motivate students to achieve their full potential. We strive to create a welcoming and inclusive school culture that fosters a love of learning, creativity, and collaboration.</p>
              <p className="mt-3">We are committed to empowering students to become lifelong learners who are equipped with the 21st-century skills and knowledge they need to succeed in a rapidly changing wor...</p>
            </div>
            <Button 
              variant="outline" 
              className="h-[39px] rounded-[10px] border border-babylonschooledunpeastern-blue shadow-[0px_30px_20px_#12a5bf26] bg-babylonschooledunpwhite-02"
            >
              <a
                href="http://localhost:5173/p/babylon-national-school-4051"
                rel="noopener noreferrer"
                target="_blank"
                className="font-medium text-babylonschooledunpeastern-blue text-sm leading-[24.5px]"
              >
                Read More
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="flex flex-col items-center py-16 md:py-24 w-full bg-babylonschooledunpmagnolia relative">
        <div className="hidden md:flex flex-col w-full items-start absolute top-0 left-0 overflow-hidden">
          <img
            className="relative w-full h-[83px]"
            alt="Component"
            src="/component-1-14.svg"
          />
        </div>
        
        <div className="container mx-auto px-4 flex flex-col items-center gap-8 md:gap-12 relative">
          <h2 className="font-bold text-babylonschooledunptundora text-2xl md:text-3xl lg:text-4xl text-center">
            Services We Provide
          </h2>
          
          {/* Services Carousel */}
          <ServicesCarousel services={services} />
          
          {/* Featured Service - Cafeteria */}
          <Card className="w-full rounded-[15px] overflow-hidden border-none shadow-none bg-babylonschooledunpwhite mt-8">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/2 md:h-[450px] overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    alt="Image"
                    src="/image.png"
                  />
                </div>
                <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col">
                  <h3 className="font-bold text-2xl md:text-[32px] text-babylonschooledunptundora mb-4 md:mb-6">
                    Cafeteria
                  </h3>
                  <div className="text-babylonschooledunptuna text-base leading-7 mb-6">
                    <p>Indulge in a healthy culinary experience at our school cafeteria, where we prioritize the well-being of our students.</p>
                    <p className="mt-3">Our hygienic cafeteria is dedicated to serving nutritious meals, providing a foundation for their overall growth and development.</p>
                    <p className="mt-3">With a meticulously crafted and well-developed kitchen menu, we ensure that every meal supplies the es...</p>
                  </div>
                  <div className="mt-auto">
                    <Button 
                      className="bg-[#12a5bf] rounded-[10px] shadow-[0px_60px_45px_#2836491a] text-babylonschooledunpwhite"
                    >
                      <a
                        href="http://localhost:5173/p/cafeteria-10639"
                        rel="noopener noreferrer"
                        target="_blank"
                        className="font-medium text-babylonschooledunpwhite text-sm whitespace-nowrap flex items-center"
                      >
                        Read More
                        <img
                          className="ml-2 w-[22px] h-[22px]"
                          alt="Component"
                          src="/component-1-32.svg"
                        />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Rest of the component remains the same */}
      {/* Testimonial Section */}
      <div className="w-full py-16 md:py-24">
        {/* ... testimonial section code ... */}
      </div>
      
      {/* Latest Events Section */}
      <div className="w-full py-16 md:py-24 bg-gray-50">
        {/* ... events section code ... */}
      </div>
      
      {/* Course Categories Section */}
      <div className="w-full py-16 md:py-24 bg-babylonschooledunpselago-47">
        {/* ... course categories section code ... */}
      </div>
      
      {/* Blog Section */}
      <div className="w-full py-16 md:py-24 bg-babylonschooledunpselago-47">
        {/* ... blog section code ... */}
      </div>
    </section>
  );
};