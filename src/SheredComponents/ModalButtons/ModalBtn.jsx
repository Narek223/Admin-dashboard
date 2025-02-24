import React from "react";
import styles from "./modal.module.css";


export default function ModalBtn({onClose,handleSave,edit}) {
  return (
    <div className={styles.btnbox}>
      <button onClick={onClose}>Cancel</button>
      <button onClick={handleSave}>{edit ? "Update" : "Save"}</button>
    </div>
  );
}
