import React from "react";
import styles from "./header.module.scss";
import { CiSearch } from "react-icons/ci";
import { GoBell } from "react-icons/go";
import { useLocation } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";


export default function Header() {
  const location = useLocation();

  const buttonText =
  location.pathname === "/Experts" ? "Add Expert" :
  location.pathname === "/Client" ? "Add Client" : null;

  
  return (
    <div className={styles.conteiner}>
      <div className={styles.searchWrapper}>
        <CiSearch className={styles.Icon} />
        <input type="text" placeholder="Search" />
      </div>
      <div className={styles.contactWrapper}>
      {buttonText && (
          <button >
            <FiPlus className={styles.addIcon} />
            {buttonText}
            </button>
          )}
        <GoBell className={styles.bellIcon} />
      
      </div>
    </div>
  );
}
