import React from "react";

import { format, parse, startOfWeek, getDay, isToday } from "date-fns";



export default function CustomHeader({ label, date }){
  const dayOfWeek = format(date, "eeee");
  const isWeekend = ["Saturday", "Sunday"].includes(dayOfWeek);

  return (
    <div
      className={`custom-header }`}
      style={{
        backgroundColor: "#f5f5f5",

        padding: "10px 0",
        borderBottom: `2px solid  #3498db`,
        height: "86px",
        fontWeight: 500,
        fontSize: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {format(date, "EEE")}
    </div>
  );
}
