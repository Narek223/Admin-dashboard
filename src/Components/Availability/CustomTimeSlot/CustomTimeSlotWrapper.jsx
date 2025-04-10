import React from "react";
import { format, isToday } from "date-fns";
import styles from "./time.module.scss";
 import './timeslot.css'


export default function CustomTimeSlotWrapper({ children, value }) {

  const timeLabel = format(value, "hh:mm a");

  return (
    <div
      className={styles.timeSlotWrapper}
      style={{
 
        border: "1px solid #eee",
     
        margin: "2px",
        position: "relative",
  
        height: "80px",
        overflow: "hidden",
      }}
    >
      
    
      {children}
    </div>
  );
}
