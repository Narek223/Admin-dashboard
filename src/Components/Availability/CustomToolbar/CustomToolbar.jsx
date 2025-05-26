import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { GrPrevious, GrNext } from "react-icons/gr";
import { FaRegCalendarAlt, FaAngleDown } from "react-icons/fa";
import { Menu, MenuItem } from "@mui/material";
import { enUS } from "date-fns/locale";
import { format, startOfWeek, endOfWeek, isValid } from "date-fns";
import styles from "./customToolbar.module.scss";
import { openMenu, closeMenu } from "../../../Redax/Slices/Availability/ToolbarSlice"

export default function CustomToolbar({ label, onNavigate, setView, view }) {
  const dispatch = useDispatch();
  const viewDate = useSelector((state) => state.availability.viewDate);
  const anchorEl = useSelector((state) => state.calendarUI.anchorEl);
  const openyMenu = Boolean(anchorEl);

  if (!isValid(new Date(label))) {
    label = new Date();
  }

  const formattedLabel =
    view === "week"
      ? `${format(startOfWeek(new Date(viewDate)), "MMM d")} - ${format(
          endOfWeek(new Date(viewDate)),
          "MMM d, yyyy"
        )}`
      : format(new Date(label), "MMMM yyyy", { locale: enUS });

  const handleSelect = (el) => {
    setView(el === "Monthly" ? "month" : "week");
    dispatch(closeMenu());
  };

  return (
    <div className={styles.toolbarConteiner}>
      <div className={styles.Customtoolbar}>
        <button onClick={() => onNavigate("PREV")} className={styles.prev}>
          <GrPrevious />
        </button>
        <span className={styles.toolbarlabel}>{formattedLabel}</span>
        <button onClick={() => onNavigate("NEXT")} className={styles.next}>
          <GrNext />
        </button>

        <ul>
          <li>Booked</li>
          <li>Available</li>
          <li>Not Confirm</li>
        </ul>
      </div>

      <div className={styles.buttons}>
        <button onClick={(e) => dispatch(openMenu(e.currentTarget))}>
          <FaRegCalendarAlt className={styles.icon} />
          {view === "month" ? "Monthly" : "Weekly"}
        </button>

        <Menu
          anchorEl={anchorEl}
          open={openyMenu}
          onClose={() => dispatch(closeMenu())}
          sx={{
            "& .MuiPaper-root": {
              borderRadius: "8px",
              padding: 0,
              margin: "4px 0",
              width:
                openyMenu && anchorEl ? `${anchorEl.offsetWidth}px` : "auto",
              minWidth: 100,
            },
            "& .MuiMenuItem-root:hover": {
              backgroundColor: "white",
            },
          }}
        >
          {["Monthly", "Weekly"].map((elem, index) => (
            <MenuItem
              key={index}
              onClick={() => handleSelect(elem)}
              style={{
                backgroundColor:
                  (view === "month" && elem === "Monthly") ||
                  (view === "week" && elem === "Weekly")
                    ? "rgba(25, 118, 210, 0.08)"
                    : "",
              }}
            >
              {elem}
            </MenuItem>
          ))}
        </Menu>

        <button>
          Experts <FaAngleDown className={styles.icon} />
        </button>
      </div>
    </div>
  );
}
