import React, { useState } from "react";
import styles from "./sidebar.module.scss";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import { sidebardata } from "../../Services/data/sidebar/sidebar";
import { RxHamburgerMenu } from "react-icons/rx";
import logo from "../../assets/Logo/logo.png";
import Divider from "@mui/material/Divider";
import { otherpages } from "../../Services/data/sidebar/sidebar";
import SiderbarCart from "./SidebarCart/SiderbarCart";
import Logoutmodal from "./LogoutModal/Logoutmodal";

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
            backgroundColor: "rgb(255,255,255)",
            color: "black",
            overflow: "hidden",
            border:'white'
          },
        }}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Box className={styles.box} role="presentation">
          <List className={styles.list}>
            <div className={styles.logo}>
              {isOpen && <img src={logo} />}
              <p onClick={closedrawer} aria-expanded={isOpen} role="button">
                <RxHamburgerMenu />
              </p>
            </div>

            <SiderbarCart
              array={sidebardata}
              handleItemClick={handleItemClick}
              isOpen={isOpen}
            />
          </List>
          <Divider />
          <div>
            <list className={styles.list}>
              {isOpen && <p className={styles.pages}>PAGES</p>}
              <SiderbarCart
                array={otherpages}
                handleItemClick={handleItemClick}
                isOpen={isOpen}
              />
            </list>
          </div>
          <div className={styles.logout}>
            <Logoutmodal isOpen={isOpen} />
          </div>
        </Box>
      </Drawer>
    </div>
  );
}