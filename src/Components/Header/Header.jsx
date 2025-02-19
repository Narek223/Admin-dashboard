import React from "react";
import styles from "./header.module.scss";
import { CiSearch } from "react-icons/ci";
import { GoBell } from "react-icons/go";
import { useLocation } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

export default function Header() {
  const location = useLocation();

  return (
    <div className={styles.conteiner}>
      <div className={styles.searchWrapper}>
        <CiSearch className={styles.Icon} />
        <input type="text" placeholder="Search" />
      </div>
      <div className={styles.contactWrapper}>
      {location.pathname === "/Experts" ? <button><FiPlus className={styles.addIcon}/>Add Expert</button> : null}
        <GoBell className={styles.bellIcon} />
      
      </div>
    </div>
  );
}
