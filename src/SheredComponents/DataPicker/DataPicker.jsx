import React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import styles from "./styles.module.scss";
import { datestyles } from "../../Services/data/datePickerStyles/datePickerStyles";

export default function ResponsiveDatePickers({ error, setDate, value,label }) {
  
  const handleDateChange = (newDate) => {
    if (newDate) {
      setDate(newDate.format("DD MM YYYY"));
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} >
      <div className={styles.datepickerConteiner}>
        <label className={styles.datapicker}>{label}</label>
        <DemoContainer components={["DatePicker"]}>
          <DemoItem  sx={{ width: "100%" }}>
            <DesktopDatePicker
          
              value={value ? dayjs(value, "DD MM YYYY") : null}
              onChange={handleDateChange}
              showDaysOutsideCurrentMonth
              disablePast={false}
         
              slotProps={{
                textField: {
                  placeholder: "MM/DD/YYYY",
                  error: error,
               
                  InputProps: {
                    sx: {
                    width: "100%",
                      marginBottom: "8px",
                      border: "1px solid rgba(98, 99, 115, 0.3)",
                    },
                  },
                },
                popper: {
                  sx: datestyles  
                },
              }}
            
            />
          </DemoItem>
        </DemoContainer>
      </div>
    </LocalizationProvider>
  );
}
