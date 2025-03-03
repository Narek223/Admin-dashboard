import React from 'react'
import { GrEdit } from "react-icons/gr";
import { FaRegTrashAlt } from "react-icons/fa";
import { Menu, MenuItem } from "@mui/material";


export default function EditDeleteBtn({anchorEl,onClose,handleEdit}) {
  return (
    <div>
          <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={infoclose}
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
          "& .MuiMenuItem-root:nth-child(2)": {
            color: "red",
          },
        }}
      >
        <MenuItem onClick={handleEdit}>
          <GrEdit className={styles.newicon} style={{ marginRight: "12px" }} />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (selectedService) {
              handleDeleteService(selectedService.id);
            }
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
  )
}
