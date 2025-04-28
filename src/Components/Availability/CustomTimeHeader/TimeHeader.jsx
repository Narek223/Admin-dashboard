import React from 'react'
import styles from "./timeHeader.module.scss"
import "./time.css"
export default function TimeHeader({ label }) {
    return <div className={styles.timeGutter}>{label} </div>;
}
