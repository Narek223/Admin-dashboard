import { configureStore } from "@reduxjs/toolkit";
import blogSlice from "../Slices/blog/blogSlice";
import blogModalSlice from "../Slices/blog/blogModalSlice";
import categoriesSlice from "../Slices/Categories/CategoriesSlice";
import categoriesModalSlice from "../Slices/Categories/CategoriesModalSlice";
import clientSlice from "../Slices/Client/ClientSlice";
import clientModalSlice from "../Slices/Client/ClientModalSlice";
import inboxSlice from "../Slices/Inbox/InboxSlice";
import bookingAlertsSlice from "../Slices/BookingAlerts/BookingAlertsSlice";
import bookingAlertsModalSlice from "../Slices/BookingAlerts/BookingModalSlice";
import serviceSlice from "../Slices/Service/ServiceSlice";
import serviceModalSlice from "../Slices/Service/ServiceModalSlice";
import AvailabilitySlice from "../Slices/Availability/AvailabilitySlice";
import AvailabilityModalSlice from "../Slices/Availability/AvailabilityModalSlice";
import EventSlice from "../Slices/Availability/EventSlice";
import calendarUISlice from "../Slices/Availability/ToolbarSlice";
import ExpertsSlice  from "../Slices/Experts/ExpertsSlice";
import ExpertsModalSlice from "../Slices/Experts/ExpertsModalSlice"
import fileSlice from "../Slices/ChooseFile/FileSice";


export const store = configureStore({
  reducer: {
    blog: blogSlice,
    blogModal: blogModalSlice,
    categories: categoriesSlice,
    categoriesModal: categoriesModalSlice,
    client: clientSlice,
    clientModal: clientModalSlice,
    inbox: inboxSlice,
    bookingAlerts: bookingAlertsSlice,
    bookingModal: bookingAlertsModalSlice,
    service: serviceSlice,
    serviceModal: serviceModalSlice,
    availability: AvailabilitySlice,
    availabilityModal: AvailabilityModalSlice,
    eventSlice: EventSlice,
    calendarUI: calendarUISlice,
    expert:ExpertsSlice,
    expertsModal:ExpertsModalSlice,
    file: fileSlice,
  },
});
