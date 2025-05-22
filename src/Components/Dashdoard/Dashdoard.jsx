import React, { useState } from "react";
import Header from "../Header/Header";
import styles from "./dashdoard.module.scss";
import BarChart from "./Charts/BarChart";
import Calendar from "./Calendar/Calendar";



export default function Dashdoard() {
  return (
    <div className={styles.dashdoardCont}>
      <Header />
      <div className={styles.conteiner}>
        <div className={styles.wrapper}>
          <div className={styles.dashboards}>
            <div className={styles.dashdoard}>
              <div className={styles.TotalBookings}></div>
              <div className={styles.NewClients}></div>
              <div className={styles.Earnings}></div>
              <div className={styles.Activity}></div>
            </div>

            <div className={styles.chart}>
              <div className={styles.TotalEarnings}>
                <div className={styles.charts}>
   <BarChart />
                </div>
             
              </div>
              <div className={styles.calendar}>
<Calendar/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
