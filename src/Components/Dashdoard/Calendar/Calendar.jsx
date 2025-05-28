import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { datestyles } from "../../../Services/data/datePickerStyles/datePickerStyles";
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
export default function Calendar() {


  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateCalendar"]}>
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
            slotProps={{
              popper: {
                sx: datestyles,
              },
            }}
        >
          <DateCalendar
            sx={{
              width: "100%",
              ...datestyles,
            }}
           
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
