// CustomTimeSlotWrapper.js
import React from "react";
import { format, isToday } from "date-fns";
import styles from "./time.module.scss";

export default function CustomTimeSlotWrapper({ children, value }) {

  const timeLabel = format(value, "hh:mm a");

  return (
    <div
      className={styles.timeSlotWrapper}
      style={{

        border: "1px solid #eee",
        borderRadius: "4px",
        margin: "2px",
        position: "relative",
  
        height: "80px",
        overflow: "hidden",
      }}
    >
      
      {/* Показываем время в верхнем левом углу
      <div className={styles.timeLabel}>{timeLabel}</div> */}
      {children}
    </div>
  );
}
