import React from "react";
import Header from "../Header/Header";
import BookingModal from "./BookingModal/BookingModal";
import styles from "./bookingAlerts.module.scss";
import { Menu, MenuItem } from "@mui/material";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa6";
import { AiOutlineMore } from "react-icons/ai";
import EditDeleteBtn from "../../SheredComponents/EditDeleteBtn/EditDeleteBtn";
import DeleteModal from "../../SheredComponents/DeleteModal/DeleteModal";
import PaginationComponent from "../../SheredComponents/Pagination/PaginationComponent";
import { paginate } from "../../Utils/pagination";
import { useSelector, useDispatch } from "react-redux";
import * as bookingAlertsSlice from "../../Features/BookingAlerts/BookingAlertsSlice";

export default function BookingAlerts() {
  const {
    open,
    booking,
    edit,
    icon,
    anchorEl,
    selectelem,
    error,
    infoanchorEl,
    isDeleteModalOpen,
    selectedBooking,
    currentPage,
    itemsPerPage,
  } = useSelector((state) => state.bookingAlerts);

  
  const dispatch = useDispatch();
  const openyMenu = Boolean(anchorEl);
  const paginatedBooking = paginate(booking, currentPage, itemsPerPage);


  return (
    <div className={styles.bookingConteiner}>
      <Header handleOpen={() => dispatch(bookingAlertsSlice.openModal())} />
      <BookingModal
        error={error}
        seterror={(err) => dispatch(bookingAlertsSlice.setError(err))}
        open={open}
        handleClose={() => dispatch(bookingAlertsSlice.closeModal())}
        addBooking={(bookingAlert, isEdit = false) =>
          dispatch(bookingAlertsSlice.addBooking({ bookingAlert, isEdit }))
        }
        edit={edit}
      />
      <EditDeleteBtn
        anchorEl={infoanchorEl}
        onClose={() => dispatch(bookingAlertsSlice.closeInfo())}
        handleEdit={() => dispatch(bookingAlertsSlice.handleEdit())}
        onClick={() => dispatch(bookingAlertsSlice.setIsDeleteModalOpen(true))}
      />
      <DeleteModal
        open={isDeleteModalOpen}
        onClose={() => dispatch(bookingAlertsSlice.setIsDeleteModalOpen(false))}
        title="Delete this Booking"
        text="Are you sure you want to delete this booking? This action cannot be undone"
        onDelete={() => {
          if (selectedBooking) {
            dispatch(bookingAlertsSlice.deleteBooking(selectedBooking.id));
          }
          dispatch(bookingAlertsSlice.setIsDeleteModalOpen(false));
        }}
      />
      <div>
        <div className={styles.bookingWrapper}>
          <div className={styles.bookingcont}>
            <div className={styles.sort}>
              <p>Sort By:</p>
              <button
                onClick={(event) => {
                  dispatch(bookingAlertsSlice.setAnchorEl(event.currentTarget));
                  dispatch(bookingAlertsSlice.setIcon(false));
                }}
                variant="contained"
                id="basic-button"
                aria-haspopup="true"
                aria-expanded={false}
              >
                {selectelem}
                {icon ? (
                  <FaAngleDown className={styles.icon} />
                ) : (
                  <FaAngleUp className={styles.icon} />
                )}
              </button>
              <Menu
                anchorEl={anchorEl}
                className={styles.manu}
                open={openyMenu}
                onClose={() => {
                  dispatch(bookingAlertsSlice.setAnchorEl(null));
                  dispatch(bookingAlertsSlice.setIcon(true));
                }}
                sx={{
                  "& .MuiPaper-root": {
                    margin: "4px 0",
                  },
                  "& .MuiMenuItem-root:hover": {
                    backgroundColor: "white",
                  },
                }}
              >
                {["Newest", "Oldest"].map((elem, id) => (
                  <MenuItem
                    key={id}
                    style={{
                      backgroundColor:
                        selectelem === elem ? "rgba(25, 118, 210, 0.08)" : "",
                    }}
                    onClick={() => {
                      dispatch(bookingAlertsSlice.setSelectElem(elem));
                      dispatch(bookingAlertsSlice.setAnchorEl(null));
                      dispatch(bookingAlertsSlice.setIcon(true));
                    }}
                  >
                    {elem}
                  </MenuItem>
                ))}
              </Menu>
            </div>
            <div className={styles.bookingHeader}>
              <div className={styles.bookingbox}>
                <ul>
                  <li>Date</li>
                  <li>Specialist</li>
                  <li>Service</li>
                  <li>Client full name</li>
                  <li>Number</li>
                  <li>Amount</li>
                  <li>Status</li>
                </ul>
              </div>
            </div>

            {paginatedBooking.map((elem, id) => (
              <div key={id} className={styles.bookingbodytwo}>
                <div key={id} className={styles.bookingboxtwo}>
                  <ul>
                    <li>
                      {elem.date} {elem.startime}
                    </li>
                    <li>{elem.specialist}</li>
                    <li>{elem.service}</li>
                    <li>
                      {elem.name} {elem.lastname}
                    </li>
                    <li>{elem.phone}</li>
                    <li>{elem.phone}</li>
                    <li>{elem.phone}</li>
                    <li></li>
                    <li></li>
                  </ul>
                  <button
                    className={styles.infobtn}
                    onClick={(event) => {
                      dispatch(bookingAlertsSlice.setInfoAnchorEl(event.currentTarget));
                      dispatch(bookingAlertsSlice.setSelectedBooking(elem));
                    }}
                  >
                    <AiOutlineMore />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <PaginationComponent
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={booking.length}
          onPageChange={(newPage) =>
            dispatch(bookingAlertsSlice.handlePageChange(newPage))
          }
          onItemsPerPageChange={(newPerPage) =>
            dispatch(bookingAlertsSlice.handleItemsPerPageChange(newPerPage))
          }
        />
      </div>
    </div>
  );
}