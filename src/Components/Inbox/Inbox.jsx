import React from "react";
import styles from "./inbox.module.scss";
import Header from "../Header/Header";
import { CiSearch } from "react-icons/ci";


export default function Inbox() {
  return (
    <div className={styles.inbox}>
            <Header handleOpen={null} />
      <div className={styles.inboxheader}>
        <div className={styles.inbox_Messages}>

  <div className={styles.searchWrapper}>
        <CiSearch className={styles.Icon} />
        <input type="text" placeholder="Search" />
      </div>
        </div>
        <div className={styles.messagesCont}>
        <div className={styles.Message_Header}></div>
        <div className={styles.messagesBox}></div>
        </div>
     
      </div>
    </div>
  );
}
