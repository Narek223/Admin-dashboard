import React, { useState } from "react";
import Header from "../Header/Header";
import BookingModal from "./BookingModal/BookingModal";
import styles from "./bookingAlerts.module.scss";
import { Menu, MenuItem } from "@mui/material";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa6";

export default function BookingAlerts() {
  const [open, setopen] = useState(false);
  const [booking, setBooking] = useState([]);
  const [edit, setedit] = useState(null);
  const [icon, seticon] = useState(true);
  const [anchorEl, setanchorEl] = useState(null);
  const [selectelem, setselectelem] = useState("Newest");
  const openyMenu = Boolean(anchorEl);

  const openmodal = () => {
    setopen(true);
  };
  const handleClose = () => {
    setopen(false);
    setanchorEl(null);
    seticon(true);
  };

  const select = (value) => {
    setselectelem(value);
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
  return (
    <div className={styles.bookingConteiner}>
      <Header handleOpen={openmodal} />
      <BookingModal
        open={open}
        handleClose={handleClose}
        addBooking={addBooking}
        edit={edit}
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
          </div>
        </div>
      </div>
    </div>
  );
}
