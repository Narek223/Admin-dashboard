import React from 'react'
import styles from "./timeHeader.module.scss"
export default function TimeHeader({ label }) {
    return <div className={styles.timeGutter}>{label}</div>;
}
