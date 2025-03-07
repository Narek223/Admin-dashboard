import  React,{useState} from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import styles from "./styles.module.scss";
import { datestyles } from "../../Services/data/datePickerStyles/datePickerStyles";

export default function ResponsiveDatePickers({error,setDate,value}) {
  // const [selectedDate, setSelectedDate] = useState(dayjs(new Date));


  const handleDateChange = (newDate) => {
    // setSelectedDate(newDate); 
    setDate(newDate.format("DD MM YYYY"))
  };




  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} className={styles.datepickerConteiner}>
      <DemoContainer components={["DatePicker"]}>
        <DemoItem label="Birth Date">
          <DesktopDatePicker
    // value={value ? dayjs(value) : null}
            onChange={handleDateChange}
            // defaultValue={dayjs("14 Feb 1996")}
            showDaysOutsideCurrentMonth
            disablePast={false}
            slotProps={{
              textField: {
                error: error,
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
