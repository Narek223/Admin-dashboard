import React, { useState } from "react";
import Header from "../Header/Header";
import styles from "./dashdoard.module.scss";
import BarChart from "./Charts/BarChart";
import Calendar from "./Calendar/Calendar";
import { IoStatsChartSharp } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";
import { SlGraph } from "react-icons/sl";

export default function Dashdoard() {
  const [activeBox, setActiveBox] = useState(null);

  const handleClick = (elem) => {
    setActiveBox(elem);
  };

  return (
    <div className={styles.dashdoardCont}>
      <Header />
      <div className={styles.conteiner}>
        <div className={styles.wrapper}>
          <div className={styles.dashboards}>
            <div className={styles.dashdoard}>
              <div
                className={`${styles.TotalBookings} ${
                  activeBox === "bookings" ? styles.active : ""
                }`}
                onClick={() => handleClick("bookings")}
              >
                <div className={styles.Total}>
                  <p>Total Bookings</p>
                  <h1>650</h1>
                </div>
                <div className={styles.iconCont}>
                  <p className={styles.icon}>
                    <IoStatsChartSharp className={styles.icons} />
                  </p>
                </div>
              </div>

              <div
                className={`${styles.NewClients} ${
                  activeBox === "clients" ? styles.active : ""
                }`}
                onClick={() => handleClick("clients")}
              >
                <div className={styles.clientsConteiner}>
                  <div className={styles.personicon}>
                    <p>
                      <MdPeopleAlt className={styles.Icon} />
                    </p>
                  </div>
                  <div className={styles.newClients}>
                    <p>New Clients</p>
                    <h1>321</h1>
                  </div>
                  <div className={styles.graph}>
                    <p>
                      <SlGraph className={styles.graphicon} />
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.Earnings}></div>
              <div className={styles.Activity}></div>
            </div>

            <div className={styles.chart}>
              <div className={styles.TotalEarnings}>
                <div className={styles.charts}>
                  <div>
                    <h1>Total Earnings </h1>
                  </div>
                  <BarChart />
                </div>
              </div>
              <div className={styles.calendar}>
                <Calendar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
