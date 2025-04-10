import React, { useState } from "react";
import Header from "../Header/Header";
import styles from "./availability.module.scss";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, isToday } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomToolbar from "./CustomToolbar/CustomToolbar";
import CustomEvent from "./CustomEvent/CustomEvent";
import CustomHeader from "./CustomHeader/CustomHeader";
import AvailabilityModal from "./AvailabilityModal/AvailabilityModal";
import CustomTimeSlotWrapper from "./CustomTimeSlot/CustomTimeSlotWrapper";
import TimeHeader from "./CustomTimeHeader/TimeHeader";
import CustomDate from './CustomDate/CustomDate'

export default function Availability() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState("month");
  const [eventobj, seteventobj] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);



  const closemodal = () => {
    setOpen(false);
  };

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

  const onOpen = (date) => {
    setSelectedDate(date);
    setOpen(true);
  };
  
  const event = (events) => {
    seteventobj((prev) => [
      ...prev,
      {
        ...events,
        start: new Date(events.start),
        end: new Date(events.end),
      },
    ]);
  };

  return (
    <div className={styles.conteiner}>
      <Header handleOpen={onOpen} />
      <AvailabilityModal open={open} handleClose={closemodal} onadd={event} selectdate={selectedDate} />
      <div className={styles.calendarWrapper}>
        <div className={styles.calendar}>
          <Calendar
            localizer={localizer}
            startAccessor="start"
            events={eventobj}
            endAccessor="end"
            selectable={false}
            showMultiDayTimes={false}
            style={{ height: "calc(90vh - 80px)" }}
            view={view}
            onView={setView}
            min={new Date(1970, 1, 1, 8, 0, 0)}
            max={new Date(1970, 1, 1, 18, 0, 0)}

            step={60}
            timeslots={1}
            components={{
              toolbar: (props) => (
                <CustomToolbar {...props} setView={setView} view={view} />
              ),
              month: {
                dateCellWrapper:(props)=>(

                  <CustomDate  {...props} onOpen={onOpen} />
                ) 
              },
              header: CustomHeader,
              event: CustomEvent,
              timeSlotWrapper: CustomTimeSlotWrapper,
              timeGutterHeader: TimeHeader,
             
            }}
            formats={{
              eventTimeRangeFormat: () => null,
              timeGutterFormat: (date, culture, localizer) =>
                localizer.format(date, 'hh:mm a', culture)
            }}
          />
        </div>
      </div>
    </div>
  );
}
