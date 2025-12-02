import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import "./dates.css";
import aclogo from "../../IMGs/title-img-showcase.png";
import sparkleRed from "../../IMGs/sparkle-red.svg";
import sparkleYellow from "../../IMGs/sparkle-yellow.svg";
import sparkleWhite from "../../IMGs/sparkle-white.svg";

export default function Dates({
  navHeight,
  showPastDates,
  dateData,
  popupOpen,
  hideDates,
}) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const wrapper = useRef(null);
  const { contextSafe } = useGSAP({ scope: wrapper });

  const sparklesArr = [
    sparkleRed,
    sparkleYellow,
    sparkleWhite,
    sparkleRed,
    sparkleYellow,
    sparkleWhite,
  ];

  //   ? USE EFFECT
  useEffect(() => {
    // Update date every minute
    const dateCheck = () => {
      const now = new Date();
      setCurrentDate(now);
    };

    // check every minute
    const interval = setInterval(dateCheck, 1000 * 60);

    return () => {
      clearInterval(interval);
    };
  }, [setCurrentDate, currentDate]);

  // & USE GSAP
  const safeGSAP = contextSafe((index) => {
    // Animate opening of date
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    let starMovement = 90;

    tl.to(`#cal-num-${index}`, {
      rotateY: 90,
      duration: 0.5,
    })
      .to(
        `#cal-${index} .sparkles-wrapper`,
        { display: "flex", opacity: 1, zIndex: 100 },
        "<"
      )
      .to(
        `#cal-${index} .sparkle:nth-child(even)`,
        {
          x: () => Math.random() * starMovement,
          y: () => Math.random() * starMovement,
          duration: 1.2,
        },
        "<.1"
      )
      .to(
        `#cal-${index} .sparkle:nth-child(odd)`,
        {
          x: () => Math.random() * -starMovement,
          y: () => Math.random() * -starMovement,
          duration: 1.2,
        },
        "<"
      )
      .to(
        `#cal-${index} .sparkles-wrapper`,
        { opacity: 0, display: "none" },
        "<.5"
      )
      .to(`#cal-${index} .sparkles-wrapper`, { zIndex: "initial" }, "<.5")
      .set(`#cal-${index} .sparkle`, { x: 0, y: 0 });
  });

  //   ? Click a day
  const clickDay = (index) => {
    // If day can be opened
    if (dateData[index].expire) {
      // open the popup with selected data
      popupOpen(index);
      safeGSAP(index);
    } else {
      // Day cannot open yet
      popupOpen(index);
    }
  };

  //   BODY
  return (
    <div
      className='dates-wrapper'
      style={{ padding: `2em 0 ${navHeight}px 0` }}
      ref={wrapper}
    >
      <div className='dates-top'>
        <img
          src={aclogo}
          width='517'
          style={{ maxWidth: "250px", width: "100%", height: "auto" }}
          alt='ac-logo'
        />
      </div>
      {/* bottom */}
      <div className='dates-bottom'>
        <div className='dates-grid-wrapper'>
          <div className='final-art-wrapper'>
            {/* Dates grid */}
            <div className='dates-grid'>
              {dateData.map((e, index) => {
                let calendarDay;
                /* Apply expiration conditional & Past Date function */
                if (showPastDates) {
                  calendarDay = (
                    <div className='calendar-day' id={`cal-num-${index}`}>
                      <img
                        src={e.calImg}
                        alt={`cal-alt-${index}`}
                        width='100%'
                        style={{ width: "100%" }}
                        onClick={() => clickDay(index)}
                      />
                    </div>
                  );
                } else if (hideDates) {
                  calendarDay = <div></div>;
                } else if (!dateData[index].expire) {
                  calendarDay = (
                    <div className='calendar-day' id={`cal-num-${index}`}>
                      <img
                        src={e.calImg}
                        alt={`cal-alt-${index}`}
                        width='100%'
                        style={{ width: "100%" }}
                        onClick={() => clickDay(index)}
                      />
                    </div>
                  );
                }

                return (
                  // overall calendar day container
                  <div id={`cal-${index}`} key={`cal-${index}`}>
                    {calendarDay}

                    <div className='sparkles-wrapper'>
                      {sparklesArr.map((e, i) => (
                        <img
                          src={e}
                          alt=''
                          id={`sparkle-${i}`}
                          key={`sparkle-${i}`}
                          className='sparkle'
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
