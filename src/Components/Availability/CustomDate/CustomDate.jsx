import React,{useState} from "react";
import styles from "./custom.module.scss";
import { IoAddOutline } from "react-icons/io5";



export default function CustomDate({
  children,
  value,
  onOpen,
  event,
  hasevent,
  view
}) {
  
  const slotDate = value;
// slotDate.setSeconds(0, 0);
const hasEvent = hasevent(value, event, view);








  return (
    <div className={styles.timeSlotWrapper}>
      <div className={styles.content}>
        {!hasEvent && (
          <button
            className={styles.addBtn}
            onClick={() => onOpen(slotDate)}
          >
            <IoAddOutline/>
          </button>
        )}
      </div>
    </div>
  );
}
