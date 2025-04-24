import React, { useState } from "react";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { enUS } from "date-fns/locale";
import styles from "./customToolbar.module.scss";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import { Menu, MenuItem } from "@mui/material";
import { format, startOfWeek, endOfWeek, isValid } from "date-fns";

export default function CustomToolbar({ label, onNavigate, setView, view }) {
  const [anchorEl, setanchorEl] = useState(null);
  const openyMenu = Boolean(anchorEl);

  const onclick = (event) => setanchorEl(event.currentTarget);
  const Close = () => setanchorEl(null);

  const selectElem = (el) => {
    setView(el === "Monthly" ? "month" : "week");
    setanchorEl(null);
  };

  if (!isValid(new Date(label))) {
    label = new Date();
  }
  const formattedLabel =
    view === "week"
      ? `${format(startOfWeek(new Date(label)), "MMM d")} - ${format(
          endOfWeek(new Date(label)),
          "MMM d, yyyy"
        )}`
      : format(new Date(label), "MMMM yyyy", { locale: enUS });

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
        <button onClick={onclick}>
          <FaRegCalendarAlt   className={styles.icon}/> {view === "month" ? "Monthly" : "Weekly"}
        </button>

        <Menu
          anchorEl={anchorEl}
          open={openyMenu}
          onClose={Close}
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
              onClick={() => selectElem(elem)}
              style={{
                backgroundColor:
                  elem === view ? "rgba(25, 118, 210, 0.08)" : "",
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
