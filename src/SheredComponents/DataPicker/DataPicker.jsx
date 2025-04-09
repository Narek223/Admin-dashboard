import React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import styles from "./styles.module.scss";
import { datestyles } from "../../Services/data/datePickerStyles/datePickerStyles";

export default function ResponsiveDatePickers({
  error,
  setDate,
  value,
  label,
}) {
  const handleDateChange = (newDate) => {
    if (newDate) {
      // Pass the Date object directly instead of formatted string
      setDate(newDate.toDate());
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className={styles.datepickerConteiner}>
        <label className={styles.datapicker}>{label}</label>
        <DemoContainer components={["DatePicker"]}
          sx={{
            width: "100%",
            minWidth: "unset !important", 
            maxWidth: "100%",
            "& .MuiStack-root": {
              width: "100% !important",
              minWidth: "0 !important",
            },
          }}
        
        >
          <DemoItem 
           sx={{
            width: "100%",
            minWidth: "0 !important",
            maxWidth: "100%",
            "& .MuiStack-root": {
              width: "100% !important",
              minWidth: "0 !important",
            },
          }}
          
          >
            <DesktopDatePicker
              value={value ? dayjs(value) : null}
              onChange={handleDateChange}
              showDaysOutsideCurrentMonth
              disablePast={false}
              
              slotProps={{
                textField: {
                  fullWidth: true,
                  placeholder: "MM/DD/YYYY",
                  error: error,
                  InputProps: {
                    sx: {
                      marginBottom: "8px",
                      border: "1px solid rgba(98, 99, 115, 0.3)",
                    },
                  },
                },
                popper: {
                  sx: datestyles,
                },
              }}
            />
          </DemoItem>
        </DemoContainer>
      </div>
    </LocalizationProvider>
  );
}
