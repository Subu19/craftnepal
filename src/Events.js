import React, { useState } from "react";
import endportal from "./assets/images/endframe.png";
import Countdown from "react-countdown";

const Events = () => {
  const [open, setopen] = useState(false);
  return (
    <>
      {open ? (
        <div className="events-box">
          <div className="event-header">
            <div className="event-title">END DIMENSION</div>
            <i
              class="fa fa-close event-close"
              onClick={() => setopen(false)}
            ></i>
          </div>
          <div className="event-body">
            <div className="event-img-box">
              <img src={endportal} className="event-img"></img>
            </div>
            <div className="countdown-containner">
              <Countdown
                className="countdown"
                date={1688616900000}
                autoStart={true}
                daysInHours={false}
              ></Countdown>
              <div className="countdown-header">Opens In</div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Events;
