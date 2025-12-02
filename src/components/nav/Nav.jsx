import { useState, useRef, useEffect } from "react";
import "./nav.css";

export default function Nav({
  setNavIsOpen,
  navIsOpen,
  setNavHeight,
  showPastDates,
  setShowPastDates,
  hideDates,
  setHideDates,
}) {
  const navHiddenRef = useRef(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [navHiddenHeight, setNavHiddenHeight] = useState(0);
  const navRef = useRef(null);

  // & Switch to show past dates
  const switchClick = () => {
    setShowPastDates((prev) => !prev);
    setHideDates(false);
  };

  // & Switch to remove dates
  const removeDatesSwitch = () => {
    setHideDates((prev) => !prev);
    setShowPastDates(false);
  };

  //   ! USE EFFECT
  useEffect(() => {
    const updateHeight = () => {
      if (navHiddenRef.current) {
        setNavHiddenHeight(navHiddenRef.current.offsetHeight);
      }
    };

    updateHeight(); // Run once on load
    window.addEventListener("resize", updateHeight); // Recalculate if viewport changes

    if (navRef.current) {
      setNavHeight(navRef.current.offsetHeight);
    }

    return () => window.removeEventListener("resize", updateHeight);
  }, [setNavHeight]);

  // Mark component as "loaded" after first mount
  useEffect(() => {
    const t = setTimeout(() => setHasLoaded(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className='nav-wrapper'
      style={{
        bottom: navIsOpen ? 0 : `-${navHiddenHeight}px`,
        transition: hasLoaded ? "bottom 0.3s ease" : "none",
        position: "fixed",
        left: 0,
        right: 0,
      }}
    >
      <div className='nav-content'>
        {/* Bars */}
        <div
          className='nav-bars'
          ref={navRef}
          onClick={() => setNavIsOpen((prev) => !prev)}
        >
          {[...Array(3)].map((_, i) => (
            <svg
              key={i}
              width='60'
              height='3'
              viewBox='0 0 60 3'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <line
                x1='1.38889'
                y1='1.38889'
                x2='58.6111'
                y2='1.38889'
                stroke='#BF2E39'
                strokeWidth='2.77778'
                strokeLinecap='round'
              />
            </svg>
          ))}
        </div>
        <div className='nav-clickables' ref={navHiddenRef}>
          {/* show past dates */}
          <div className='past-date-wrapper'>
            <div className='past-date-left'>Show past dates</div>
            <div className='past-date-right' onClick={() => switchClick()}>
              <div
                className={
                  showPastDates === false
                    ? `date-switch-bg-off date-switch-bg`
                    : `date-switch-bg-on date-switch-bg`
                }
              ></div>
              <div
                className={
                  showPastDates === false
                    ? `date-switch-button-off date-switch-button`
                    : `date-switch-button-on date-switch-button`
                }
              ></div>
            </div>
          </div>
          {/* remove all dates */}
          <div className='past-date-wrapper' ref={navHiddenRef}>
            <div className='past-date-left'>Remove all dates</div>
            <div
              className='past-date-right'
              onClick={() => removeDatesSwitch()}
            >
              <div
                className={
                  hideDates === false
                    ? `date-switch-bg-off date-switch-bg`
                    : `date-switch-bg-on date-switch-bg`
                }
              ></div>
              <div
                className={
                  hideDates === false
                    ? `date-switch-button-off date-switch-button`
                    : `date-switch-button-on date-switch-button`
                }
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
