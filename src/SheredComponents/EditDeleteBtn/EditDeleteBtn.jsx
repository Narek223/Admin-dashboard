import React from "react";
import { GrEdit } from "react-icons/gr";
import { FaRegTrashAlt } from "react-icons/fa";
import { Menu, MenuItem } from "@mui/material";
import styles from "./editDeleteBtn.module.scss";
import { useLocation } from "react-router-dom";
import { MdFreeBreakfast } from "react-icons/md";
import { MdOutlineFreeBreakfast } from "react-icons/md";

export default function EditDeleteBtn({
  anchorEl,
  onClose,
  handleEdit,
  onClick,
  onTimeModal
}) {
  const location = useLocation();
  return (
    <div>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onClose}
        disablePortal
        sx={{
          "& .MuiPaper-root": {
            width: "148px",
            backgroundColor: "rgba(248, 249, 250, 1)",
            borderRadius: "8px",
            padding: 0,
            boxShadow: "none",
          },
          "& .MuiMenuItem-root:hover": {
            backgroundColor: "white",
          },
         
        }}
      >
        <MenuItem onClick={handleEdit}>
          <GrEdit className={styles.newicon} style={{ marginRight: "12px" }} />
          Edit
        </MenuItem>

        {location.pathname === "/Experts" ? (
          <MenuItem  onClick={() => {
            onTimeModal();
            onClose();
         
          }}>
            <MdOutlineFreeBreakfast
              className={styles.newicon}
              style={{ marginRight: "12px" }}
            />
            Graphics
          </MenuItem>
        ) : null}

        <MenuItem
          onClick={() => {
            onClick();
            onClose();
          }}
          sx={{
              
            color: "red",
        
        }}
        >
          <FaRegTrashAlt
            className={styles.newicon}
            style={{ marginRight: "12px" }}
            
          />
          Delete
        </MenuItem>
       
      </Menu>
    </div>
  );
}
