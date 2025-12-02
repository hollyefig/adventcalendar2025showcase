import "./App.css";
import { useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Dates from "./components/dates/Dates";
import Nav from "./components/nav/Nav";
import Popup from "./components/popup/Popup";
import { dateData } from "./components/dates/initialDateData";

function App() {
  const [navIsOpen, setNavIsOpen] = useState(false);
  const [navHeight, setNavHeight] = useState();
  const [showPastDates, setShowPastDates] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    index: 0,
    isPopupOpen: false,
  });
  const [hideDates, setHideDates] = useState(false);

  // & USE GSAP
  useGSAP(() => {
    // determine if date opened is in future or not for backdrop animation delay
    const notFutureDate = dateData[selectedDate.index].expire;

    // backdrop boolean
    const backdropOn = navIsOpen || selectedDate.isPopupOpen;

    const tl = gsap.timeline({ defaults: { ease: "power1.inOut" } });

    // Backdrop animation
    if (backdropOn) {
      // if non-future date is opened, add delay
      if (!navIsOpen && notFutureDate) {
        tl.to(".black-backdrop", { display: "block" }).to(
          ".black-backdrop",
          { opacity: 0.6, duration: 0.2, delay: 0.5 },
          "<"
        );
      } else {
        tl.to(".black-backdrop", { display: "block" }).to(
          ".black-backdrop",
          { opacity: 0.6, duration: 0.2 },
          "<"
        );
      }
    } else {
      tl.to(".black-backdrop", { opacity: 0, duration: 0.2 }).to(
        ".black-backdrop",
        { display: "none" },
        "<"
      );
    }

    // return () => tl.kill();
  }, [navIsOpen, selectedDate]);

  // Popup display
  const popupOpen = (i) => {
    setSelectedDate((prev) => ({
      ...prev,
      index: i,
      isPopupOpen: true,
    }));
  };

  // backdrop is clicked
  const backdropClick = () => {
    setNavIsOpen(false);
    setSelectedDate((prev) => ({ ...prev, isPopupOpen: false }));
  };

  return (
    <div className='App default-font'>
      <Dates
        navHeight={navHeight}
        showPastDates={showPastDates}
        dateData={dateData}
        popupOpen={popupOpen}
        hideDates={hideDates}
      />
      <div className='black-backdrop' onClick={backdropClick}></div>
      <Popup
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        dateData={dateData}
      />
      <Nav
        navIsOpen={navIsOpen}
        setNavHeight={setNavHeight}
        showPastDates={showPastDates}
        setShowPastDates={setShowPastDates}
        setNavIsOpen={setNavIsOpen}
        hideDates={hideDates}
        setHideDates={setHideDates}
      />
    </div>
  );
}

export default App;
