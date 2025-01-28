import React from "react";
import styles from "./siiderbarCart.module.scss";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import { NavLink } from "react-router-dom";

export default function SiderbarCart({ array, handleItemClick, isOpen }) {

  return (
    <div className={styles.listbox}>
      {array?.map(({ title, id, icon, path }) => (
        <ListItem className={styles.listitem} key={id} disablePadding>
          <NavLink
            to={path}
            style={{ textDecoration: "none" }}
           
            className={({ isActive }) => (isActive ? styles.activeLink : " ")}
          >
            <ListItemButton className={styles.buttons}>
              <ListItemIcon className={styles.icons}>{icon}</ListItemIcon>
              {isOpen && (
                <ListItemText primary={title} className={styles.text} />
              )}
            </ListItemButton>
          </NavLink>
        </ListItem>
      ))}
    </div>
  );
}
