import React, { useState } from "react";
import Header from "../Header/Header";
import styles from "./availability.module.scss";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomToolbar from "./CustomToolbar/CustomToolbar";

export default function Availability() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState("month");

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

  const onOpen = () => {
    setOpen(true);
  };

  return (
    <div className={styles.conteiner}>
      <Header handleOpen={onOpen} />
      <div className={styles.calendarWrapper}>
      <div className={styles.calendar}>

   
        <Calendar
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "calc(90vh - 80px)" }}
          daysOfWeek={[1, 2, 3, 4, 5, 6]}
          view={view} 
          onView={setView}
           components={{
              toolbar: (props) => (
                <CustomToolbar {...props} setView={setView} view={view} />
              ),
            }}
        />
         </div>
      </div>
    </div>
  );
}
