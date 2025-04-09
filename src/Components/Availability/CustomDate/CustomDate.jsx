import React from "react";
import styles from "./custom.module.scss";




export default function CustomTimeSlotWrapper({ children, value,onOpen }) {
  return (
    <div className={styles.timeSlotWrapper}>
      <div className={styles.content}>
    
        <button
          className={styles.addBtn}
       onClick={()=>onOpen(new Date(value))}
        >
          +
        </button>
      </div>
    </div>
  );
}
