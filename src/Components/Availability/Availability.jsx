import React from "react";
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
import { useSelector, useDispatch } from "react-redux";
import * as AvailabilitySlice from "../../Redax/Slices/Availability/AvailabilitySlice";

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

export default function Availability() {
  const dispatch = useDispatch();
  const {
    events,
    open,
    selectedDate,
    edit,
    isDeleteModalOpen,
    eventToDelete,
    view,
    viewDate,
    error,
  } = useSelector((state) => state.availability);

  const onOpen = (date) => {
    dispatch(AvailabilitySlice.setSelectedDate(date));
    dispatch(AvailabilitySlice.setEdit(null));
    dispatch(AvailabilitySlice.setOpen(true));
  };

  const handleAddEvent = (event, isEdit = false) => {
    dispatch(AvailabilitySlice.addOrUpdateEvent({ event, isEdit }));
  };

  const hasEventAtSlot = (cellDate, events, view = "month") => {
  if (view === "month") {
    return events.some((event) => {
      const eventStart = new Date(event.start);
      return (
        cellDate.getFullYear() === eventStart.getFullYear() &&
        cellDate.getMonth() === eventStart.getMonth() &&
        cellDate.getDate() === eventStart.getDate()
      );
    });
  } else if (view === "week") {
    return events.some((event) => {
      const eventStart = new Date(event.start);
      return (
        cellDate.getFullYear() === eventStart.getFullYear() &&
        cellDate.getMonth() === eventStart.getMonth() &&
        cellDate.getDate() === eventStart.getDate() &&
        cellDate.getHours() === eventStart.getHours() &&
        cellDate.getMinutes() === eventStart.getMinutes()
      );
    });
  }
  return false;
};

  const handleEditGlobal = (event) => {
    dispatch(AvailabilitySlice.setEdit(event));
    dispatch(AvailabilitySlice.setOpen(true));
  };

  const handleDeleteGlobal = (event) => {
    dispatch(AvailabilitySlice.setEventToDelete(event));
    dispatch(AvailabilitySlice.setIsDeleteModalOpen(true));
  };

  return (
    <div className={styles.conteiner}>
      <Header handleOpen={onOpen} />

      <AvailabilityModal
        open={open}
        handleClose={() => dispatch(AvailabilitySlice.setOpen(false))}
        onadd={handleAddEvent}
        selectedDate={selectedDate}
        edit={edit}
        error={error}
        setError={(val) => dispatch(AvailabilitySlice.setError(val))}
      />

      <DeleteModal
        open={isDeleteModalOpen}
        onClose={() => dispatch(AvailabilitySlice.setIsDeleteModalOpen(false))}
        title="Delete this Event"
        text="Are you sure you want to delete this Event? This action cannot be undone"
        onDelete={() => dispatch(AvailabilitySlice.confirmDelete())}
      />

      <div className={styles.calendarWrapper}>
        <div className={styles.calendar}>
          <Calendar
          
            localizer={localizer}
            startAccessor="start"
            endAccessor="end"
            events={events}
            selectable={false}
            onNavigate={(newDate) => dispatch(AvailabilitySlice.setViewDate(newDate))}
            showMultiDayTimes={false}
            style={{ height: "calc(90vh - 80px)" }}
            view={view}
              date={viewDate} 
            onView={(view) => dispatch(AvailabilitySlice.setView(view))}
            min={new Date(1970, 1, 1, 8, 0, 0)}
            max={new Date(1970, 1, 1, 18, 0, 0)}
            step={60}
            timeslots={1}
            views={["month", "week"]}
            components={{
              toolbar: (props) => (
                <CustomToolbar {...props} setView={(v) => dispatch(AvailabilitySlice.setView(v))} view={view} />
              ),
              month: {
                dateCellWrapper: (props) => (
                  <CustomDate
                    {...props}
                    view={view}
                    onOpen={onOpen}
                    event={events}
                    hasevent={hasEventAtSlot}
                    viewDate={viewDate}
                  />
                ),
              },
              week: {
                timeSlotWrapper: (props) => (
                  <CustomTimeSlotWrapper
                    {...props}
                    onOpen={onOpen}
                    event={events}
                    hasevent={hasEventAtSlot}
                    view="week"
                    viewDate={viewDate}
                  />
                ),
              },
              timeGutterWrapper: ({ children }) => <div>{children}</div>,
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
