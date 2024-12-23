import React, { useState } from "react";
import styles from "./sidebar.module.scss";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { sidebardata } from "../../Services/data/sidebar/sidebar";
import { RxHamburgerMenu } from "react-icons/rx";
import ListItemIcon from "@mui/material/ListItemIcon";
import { NavLink } from "react-router-dom";

export default function Sidebar({ isOpen, setIsOpen }) {
  const sidebarWidth = isOpen ? "250px" : "80px";

  const closedrawer = () => {
    setIsOpen((prev) => !prev);
  };

  const handleItemClick = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  return (
    <div className={styles.conteiner}>
      <Drawer
        className={`${styles.drawer} ${isOpen ? "open" : "closed"}`}
        variant="permanent"
        open={isOpen}
        anchor="left"
        PaperProps={{
          style: {
            width: sidebarWidth,
            backgroundColor: "rgb(15,21,53)",
            overflow: "hidden",
          },
        }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Box className={styles.box} role="presentation">
          <List className={styles.list}>
            <div className={styles.logo}>
              {isOpen && <p>Logo</p>}
              <p onClick={closedrawer} aria-expanded={isOpen} role="button">
                <RxHamburgerMenu />
              </p>
            </div>
            <div className={styles.listbox}>
              {sidebardata?.map(({ title, id, icon, path }) => (
                <ListItem className={styles.listitem} key={id} disablePadding>
                  <NavLink
                    to={path}
                    style={{ textDecoration: "none" }}
                    onClick={handleItemClick}
                    className={({ isActive }) =>
                      isActive ? styles.activeLink : ""
                    }
                  >
                    <ListItemButton className={styles.buttons}>
                      <ListItemIcon className={styles.icons}>
                        {icon}
                      </ListItemIcon>
                      {isOpen && (
                        <ListItemText primary={title} className={styles.text} />
                      )}
                    </ListItemButton>
                  </NavLink>
                </ListItem>
              ))}
            </div>
          </List>
        </Box>
      </Drawer>
    </div>
  );
}
