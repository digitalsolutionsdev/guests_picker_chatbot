import { addDays } from "date-fns";
import { useEffect, useState } from "react";
import { DateRange } from "react-date-range";
import createMomentsSDK from "@livechat/moments-sdk";

const CalendarDatePickerCs = () => {
  
  const [momentsSDK, setmomentsSDK] = useState(null);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  
  
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
  // check window innerWidth
  useEffect(() => {
    createMomentsSDK({
      title: "My App",
      icon: "icon url",
      isFragile: true,
    }).then((mSdK) => {
      setmomentsSDK(mSdK)
    });
    function checkWidth() {
      setScreenSize(window.innerWidth);
    }
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, [state]);

  // get and send dates
  const getDatePick = () => {
    
    console.log(state)
    let x=`${monthNames[state[0].startDate.getMonth()]} ${state[0].startDate.getDate()} - ${monthNames[state[0].endDate.getMonth()]} ${state[0].endDate.getDate()}`
    console.log(x)
    // createMomentsSDK({
    //   title: "My App",
    //   icon: "icon url",
    //   isFragile: true,
    // }).then((momentsSDK) => {
      // console.log(momentsSDK)
      if(momentsSDK){
      momentsSDK.sendMessage({ text: x });
      momentsSDK.close();
      }
    // });
  };

  console.log("==========", state);

  return (
    <section>
      <div className="cs_container text_center">
        <div className="cs_date_picker_card">
          <DateRange
            showSelectionPreview={true}
            months={1}
            direction={screenSize > 768 ? "horizontal" : "vertical"}
            preventSnapRefocus={true}
            calendarFocus="backwards"
            minDate={addDays(new Date(), 3)}
            maxDate={addDays(new Date(), 90)}
            rangeColors={["#335D65"]}
            color={"#335D65"}
            disabledDates={[
              new Date("april 29 2022")
            ]}
            editableDateInputs={true}
            onChange={(item) => {setState([item.selection])}}
            moveRangeOnFirstSelection={false}
            ranges={state}
          />
          <div className="cs_row justify_content_end">
            <button className="cs_btn_main" onClick={getDatePick}>
              Select
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalendarDatePickerCs;
