import React,{useState} from 'react'
import Header from "../Header/Header";
import styles from "./availability.module.scss"
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";


export default function Availability() {
    const [open, setOpen] = useState(false);

    const locales = {
      "en-US": require("date-fns/locale/en-US"),
    };
    const localizer = dateFnsLocalizer({
      format,
      parse,
      startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
      getDay,
      locales,
    });

const onOpen=()=>{
  setOpen(true)
}


  return (
    <div className={styles.conteiner}>
      <Header handleOpen={onOpen}/>
      <div className={styles.calendarWrapper}>
      <Calendar
      localizer={localizer}
     
      startAccessor="start"
      endAccessor="end"
      style={{ height: "calc(90vh - 80px)", margin: "20px" }}
      daysOfWeek={[1, 2, 3, 4, 5,6]}
    />
      </div>
 
    </div>
  )
}
