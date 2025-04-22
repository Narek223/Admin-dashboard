import React, { useState } from "react";
import Header from "../Header/Header";
import styles from "./availability.module.scss";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CustomToolbar from "./CustomToolbar/CustomToolbar";
import CustomEvent from "./CustomEvent/CustomEvent";
import CustomHeader from "./CustomHeader/CustomHeader";
import AvailabilityModal from "./AvailabilityModal/AvailabilityModal";
import CustomTimeSlotWrapper from "./CustomTimeSlot/CustomTimeSlotWrapper";
import TimeHeader from "./CustomTimeHeader/TimeHeader";
import CustomDate from "./CustomDate/CustomDate";
import DeleteModal from "../../SheredComponents/DeleteModal/DeleteModal";

export default function Availability() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState("month");
  const [eventobj, seteventobj] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [edit, setedit] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

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
    setedit(null);
  };

  const event = (events, isEdit = false) => {
    if (isEdit) {
      seteventobj((prev) =>
        prev.map((item) => (item.id === events.id ? events : item))
      );
      setedit(null);
    } else {
      seteventobj((prev) => [...prev, { ...events, id: prev.length + 1 }]);
    }
  };

  const hasEventAtSlot = (cellDate, events, view = "month") => {
    return events.some((event) => {
      const eventDate = new Date(event.start);
      if (view === "month") {
        return (
          eventDate.getFullYear() === cellDate.getFullYear() &&
          eventDate.getMonth() === cellDate.getMonth() &&
          eventDate.getDate() === cellDate.getDate()
        );
      } else {
        eventDate.setSeconds(0, 0);
        const cellDateCopy = new Date(cellDate);
        cellDateCopy.setSeconds(0, 0);
        return eventDate.getTime() === cellDateCopy.getTime();
      }
    });
  };

  const handleEditGlobal = (event) => {
    setedit(event);
    setOpen(true);
  };

  const handleDeleteGlobal = (event) => {
    setEventToDelete(event);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (eventToDelete) {
      seteventobj((prev) => prev.filter((ev) => ev.id !== eventToDelete.id));
      setEventToDelete(null);
    }
    setIsDeleteModalOpen(false);
  };

  return (
    <div className={styles.conteiner}>
      <Header handleOpen={onOpen} />

      <AvailabilityModal
        open={open}
        handleClose={closemodal}
        onadd={event}
        selectedDate={selectedDate}
        edit={edit}
      />

      <DeleteModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Delete this Event"
        text="Are you sure you want to delete this Event? This action cannot be undone"
        onDelete={confirmDelete}
      />

      <div className={styles.calendarWrapper}>
        <div className={styles.calendar}>
          <Calendar
            localizer={localizer}
            startAccessor="start"
            endAccessor="end"
            events={eventobj}
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
                dateCellWrapper: (props) => (
                  <CustomDate 
                    {...props} 
                    onOpen={onOpen} 
                    event={eventobj} 
                    hasevent={hasEventAtSlot}
                  />
                )
              },
              week: {
              
                timeSlotWrapper: (props) => (
                  <CustomTimeSlotWrapper
                    {...props}
                    onOpen={onOpen}
                    event={eventobj}
                    hasevent={hasEventAtSlot}
                    view="week"
                  />
                ),
              },
              
            
         
            
              event: (props) => (
                <CustomEvent
                  {...props}
                  handleEditGlobal={handleEditGlobal}
                  handleDeleteGlobal={handleDeleteGlobal}
                />
              ),
              header: CustomHeader,
              timeSlotWrapper: CustomTimeSlotWrapper,
              timeGutterHeader: TimeHeader,
            }}
            dayPropGetter={(date) => {
              const isWeekend = date.getDay() === 0 || date.getDay() === 6;
              return {
                style: {
                  display: isWeekend ? "none" : "block", 
                },
              };
            }}
            formats={{
              eventTimeRangeFormat: () => null,
              timeGutterFormat: (date, culture, localizer) =>
                localizer.format(date, "hh:mm a", culture),
            }}
          />
        </div>
      </div>
    </div>
  );
}
