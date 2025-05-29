import React from "react";
import styles from "./custom.module.scss";
import { IoAddOutline } from "react-icons/io5";

export default function CustomDate({
  children,     
  value,
  onOpen,
  view,
  event,
  viewDate,
hasevent
}) {
  const slotDate = value;
  const isThisMonth = value.getMonth() === viewDate.getMonth();
 const slotHasEvent = hasevent(slotDate, event, view);
  return (
    <div className={styles.timeSlotWrapper}>
    
  
      {isThisMonth && !slotHasEvent &&(
        <button
    
          className={styles.addBtn}
          onClick={() => onOpen(slotDate)}

        >
          <IoAddOutline />
        </button>
      )}
    </div>
  );
}
