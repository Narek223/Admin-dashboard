import React, { useState } from "react";
import Header from "../Header/Header";
import styles from "./dashdoard.module.scss";
import BarChart from "./Charts/BarChart/BarChart";
import Calendar from "./Calendar/Calendar";
import { IoStatsChartSharp } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";
import { SlGraph } from "react-icons/sl";
import { FaChartSimple } from "react-icons/fa6";
import { MdShowChart } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import * as DashdoardSlice from "../../Redax/Slices/Dashdoard/Dashdoard";
import Verticalbar from "./Charts/VerticalBar/Verticalbar";

export default function Dashdoard() {
  const dispatch = useDispatch();
  const { activeBox } = useSelector((state) => state.DashdoardSlice);


  const chartComponents = {
    bookings: <Verticalbar />,
    Activity: <BarChart />,
    clients: <BarChart />,
    Earnings:<Verticalbar />
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
                onClick={() => dispatch(DashdoardSlice.handleClick("bookings"))}
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
                onClick={() => dispatch(DashdoardSlice.handleClick("clients"))}
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
              <div
                className={`${styles.Earnings} ${
                  activeBox === "Earnings" ? styles.active : ""
                }`}
                onClick={() => dispatch(DashdoardSlice.handleClick("Earnings"))}
              >
                <div className={styles.earningsCont}>
                  <div className={styles.earningsWrapper}>
                    <div className={styles.earningsIcon}>
                      <p>
                        <FaChartSimple className={styles.icon} />
                      </p>
                    </div>

                    <div className={styles.earningsText}>
                      <p>Earnings</p>
                      <h1>123</h1>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`${styles.Activity} ${
                  activeBox === "Activity" ? styles.active : ""
                }`}
                onClick={() => dispatch(DashdoardSlice.handleClick("Activity"))}
              >
                <div className={styles.ActivityConteiner}>
                  <div className={styles.texts}>
                    <p>Activity</p>
                    <h1>454</h1>
                  </div>
                  <div className={styles.iconCont}>
                    <p>
                      <MdShowChart className={styles.iconActivity} />
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.chart}>
              <div className={styles.TotalEarnings}>
                <div className={styles.charts}>
                  <div>
                    <h1>Total Earnings </h1>
                  </div>
               
  {chartComponents[activeBox]}

              
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
