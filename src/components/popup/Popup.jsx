import Countingdown from "./Countingdown";
import Memorypopup from "./Memorypopup";
import "./popup.css";

export default function Popup({ selectedDate, setSelectedDate, dateData }) {
  // & Close Popup
  const closePopup = () => {
    setSelectedDate((prev) => ({ ...prev, isPopupOpen: false }));
  };

  return selectedDate.isPopupOpen ? (
    <div className='popup-outer-wrapper' onClick={closePopup}>
      {/* Check if date can open or be on countdown to open */}
      {dateData[selectedDate.index].expire ? (
        // Open and showcase memory
        <Memorypopup selectedDate={selectedDate} dateData={dateData} />
      ) : (
        // provide a countdown
        <Countingdown selectedDate={selectedDate} dateData={dateData} />
      )}
    </div>
  ) : (
    <></>
  );
}
