import { configureStore } from "@reduxjs/toolkit";
import blogSlice from "../Features/blog/blogSlice";
import blogModalSlice from "../Features/blog/blogModalSlice";
import categoriesSlice from "../Features/Categories/CategoriesSlice";
import  categoriesModalSlice from "../Features/Categories/CategoriesModalSlice";
import clientSlice from "../Features/Client/ClientSlice";
import clientModalSlice from "../Features/Client/ClientModalSlice";
import inboxSlice from "../Features/Inbox/InboxSlice";
import bookingAlertsSlice  from "../Features/BookingAlerts/BookingAlertsSlice";
import  bookingAlertsModalSlice from "../Features/BookingAlerts/BookingModalSlice";
import servicesSlice from "../Features/Service/ServiceSlice";
import serviceModalSlice from "../Features/Service/ServiceModalSlice";
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
    service: servicesSlice,
    serviceModal: serviceModalSlice,
  },
});
