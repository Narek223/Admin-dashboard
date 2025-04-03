import React, { useState, useEffect } from "react";
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

export default function BookingAlerts() {
  const [open, setopen] = useState(false);
  const [booking, setBooking] = useState([]);
  const [edit, setedit] = useState(null);
  const [icon, seticon] = useState(true);
  const [anchorEl, setanchorEl] = useState(null);
  const [selectelem, setselectelem] = useState("Newest");
  const [error, setError] = useState(false);
  const [infoanchorEl, setinfoanchorEl] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const openyMenu = Boolean(anchorEl);

  const openmodal = () => {
    setopen(true);
    setError(false);
    setedit(null);
  };
  const handleClose = () => {
    setopen(false);
    setanchorEl(null);

    seticon(true);
    setError(false);
  };
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const select = (value) => {
    setselectelem(value);
    value === "Newest"
      ? setBooking([...booking].sort((a, b) => a.id - b.id))
      : setBooking([...booking].sort((a, b) => b.id - a.id));
    handleClose();
  };

  const addBooking = (bookingAlert, isEdit = false) => {
    if (isEdit) {
      setBooking((prev) =>
        prev.map((item) => (item.id === bookingAlert.id ? bookingAlert : item))
      );
      setedit(null);
    } else {
      setBooking((prev) => [...prev, { ...bookingAlert, id: prev.length + 1 }]);
    }
  };

  const onClick = (event) => {
    setanchorEl(event.currentTarget);

    seticon(false);
  };

  const Close = () => {
    setanchorEl(null);
    seticon(true);
  };

  const infoclose = () => {
    setinfoanchorEl(null);
  };

  const handleInfoClick = (event, elem) => {
    setinfoanchorEl(event.currentTarget);
    setSelectedBooking(elem);
  };

  const handleDeleteService = (id) => {
    setBooking(booking.filter((elem) => elem.id !== id));
    setinfoanchorEl(null);
  };

  const handleEdit = () => {
    setinfoanchorEl(null);
    setopen(true);
    setedit(selectedBooking);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleItemsPerPageChange = (newPerPage) => {
    setItemsPerPage(newPerPage);
    setCurrentPage(0);
  };
  const paginatedBooking = booking.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className={styles.bookingConteiner}>
      <Header handleOpen={openmodal} />
      <BookingModal
        error={error}
        seterror={setError}
        open={open}
        handleClose={handleClose}
        addBooking={addBooking}
        edit={edit}
      />
      <EditDeleteBtn
        anchorEl={infoanchorEl}
        onClose={infoclose}
        handleEdit={handleEdit}
        onClick={() => {
          handleOpenDeleteModal();
        }}
      />
      <DeleteModal
        open={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        title="Delete this Booking"
        text="Are you sure you want to delete this booking? This action cannot be undone"
        onDelete={() => {
          if (selectedBooking) {
            handleDeleteService(selectedBooking.id);
          }
          handleCloseDeleteModal();
        }}
      />
      <div>
        <div className={styles.bookingWrapper}>
          <div className={styles.bookingcont}>
            <div className={styles.sort}>
              <p>Sort By:</p>
              <button
                onClick={onClick}
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
                onClose={Close}
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
                    onClick={() => select(elem)}
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
                    onClick={(event) => handleInfoClick(event, elem)}
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
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
    </div>
  );
}
