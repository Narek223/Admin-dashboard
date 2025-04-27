import React from "react";
import styles from "./time.module.scss";
import "./timeslot.css";
import { IoAddOutline } from "react-icons/io5";

export default function CustomTimeSlotWrapper({
  children,
  value,
  onOpen,
  event,
  hasevent,
  view,
  viewDate,
}) {
  const slotDate = value;

  const hasEvent = hasevent(slotDate, event, view);

  const shouldShowPlus = !hasEvent;

  return (
    <div
      className={styles.timeSlotWrapper}
      style={{
        border: "1px solid #eee",

        position: "relative",
        height: "80px",
        overflow: "hidden",
      }}
    >
      <div className="time-label">{children}</div>

      {shouldShowPlus && (
        <div className="btnone">
          <button
            className="btnbutton"
            onClick={(e) => {
              onOpen(slotDate);
            }}
          >
            <IoAddOutline />
          </button>
        </div>
      )}
    </div>
  );
}
