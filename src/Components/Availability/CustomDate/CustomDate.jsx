import React,{useState} from "react";
import styles from "./custom.module.scss";
import { IoAddOutline } from "react-icons/io5";



export default function CustomDate({
  children,
  value,
  onOpen,
  event,
  hasevent,
  view,
  viewDate,
}) {
  
  const slotDate = new Date(value);
// slotDate.setSeconds(0, 0);
const hasEvent = hasevent(value, event, view);
 


const isThisMonth = value.getMonth() === viewDate.getMonth();




  return (
    <div  key={value.toISOString()} className={styles.timeSlotWrapper}>
      <div className={styles.content}>
        {isThisMonth && (
          <button
            className={styles.addBtn}
            onClick={() => onOpen(slotDate)}
            disabled={hasEvent}
          >
            <IoAddOutline/>
          </button>
        )}
      </div>
    </div>
  );
}
