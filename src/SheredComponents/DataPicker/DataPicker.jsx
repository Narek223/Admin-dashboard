import  React,{useState} from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import styles from "./styles.module.scss";
import { datestyles } from "../../Services/data/datePickerStyles/datePickerStyles";

export default function ResponsiveDatePickers({setDate}) {
  // const [selectedDate, setSelectedDate] = useState(dayjs(new Date));


  const handleDateChange = (newDate) => {
    // setSelectedDate(newDate); 
    setDate(newDate.format("DD MMM YYYY"))
  };




  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} className={styles.datepickerConteiner}>
      <DemoContainer components={["DatePicker"]}>
        <DemoItem label="Birth Date">
          <DesktopDatePicker
      
            onChange={handleDateChange}
            // defaultValue={dayjs("14 Feb 1996")}
            showDaysOutsideCurrentMonth
            disablePast={false}
            slotProps={{
              textField: {
                
                InputLabelProps: {
                  className: "datapicker",
                  
                },
              },
              popper: {
                sx: datestyles,
              },
            }}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
