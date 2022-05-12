import { useState, useEffect } from "react";

export default function BackToTop({ }) {
  const [scrollY, setScrollY] = useState(0);
  const [scrollYRefTrigger, setScrollYRefTrigger] = useState(0);

  const handleScroll = () => {
    const positionY = window.scrollY;
    setScrollY(positionY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth > 640) {
      setScrollYRefTrigger(400)
    } else {
      setScrollYRefTrigger(200)
    }
  }, [scrollY]);

  function scrollToTop(){
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  return (
    <div className={`fixed bottom-5 -right-5 sm:right-5 sm:right-24 transition-all duration-300 ${scrollYRefTrigger < scrollY ? "opacity-100" : "opacity-0"}`}>
      <div className="cursor-pointer w-24" onClick={scrollToTop}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-24 sm:w-24" fill="white" viewBox="0 0 24 24" stroke="currentColor"
             strokeWidth="1">
          <path strokeLinecap="round" strokeLinejoin="round"
                d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"/>
        </svg>
      </div>
    </div>
  )
}