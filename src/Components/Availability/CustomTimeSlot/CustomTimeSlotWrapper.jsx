import React from "react";
import styles from "./time.module.scss";
import { IoAddOutline } from "react-icons/io5";

export default function CustomTimeSlotWrapper({
  children,
  value,
  onOpen,
  event,
  hasevent,
  view
}) {

  const slotDate = value;
  const hasEvent = hasevent(slotDate, event, view);




  
  return (
    <div className={styles.timeSlotWrapper}
    style={{

      border: "1px solid #eee",
   
      margin: "2px",
      position: "relative",

      height: "80px",
      overflow: "hidden",
    }}
    
    >
      {children}
      {!hasEvent && (
        <button
          className={styles.btn}
          onClick={(e) => {
            e.stopPropagation();
            onOpen(slotDate);
          }}
        >
          <IoAddOutline />
        </button>
      )}
    </div>
  );
}
