import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export default function Memorypopup({ selectedDate, dateData }) {
  const wrapper = useRef(null);

  // & USE GSAP for animating in
  useGSAP(
    () => {
      gsap.fromTo(
        wrapper.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, delay: 1, ease: "power2.out" }
      );
    },
    { scope: wrapper }
  );

  return (
    <div className='memory-popup-wrapper' ref={wrapper}>
      <div className='memory-content-wrapper'>
        <div
          className='memory-photo'
          style={{
            backgroundImage: `url(${dateData[selectedDate.index].photo})`,
          }}
        ></div>
        <div className='memory-text'>{dateData[selectedDate.index].text}</div>
      </div>
      <div className='memory-number-wrapper'>
        <img src={dateData[selectedDate.index].calImg} alt='' />
      </div>
    </div>
  );
}
