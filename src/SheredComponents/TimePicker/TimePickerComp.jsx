import React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import styles from "./timePicker.module.scss"


export default function TimePickerComp({labalName,setstate,state,error}) {
  return (

      <div className={styles.timeconteiner}>

      <label className={styles.inputlabeltwo}>{labalName}</label>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
          components={["TimePicker"]}
          slotProps={{
            popper: {
              sx: {
                "& .MuiStack-root": {
                  display: "flex",

                },
              },
            },
          }}
        >
          <TimePicker
            onChange={(newValue) => setstate(newValue)}
            value={state ? dayjs(state, " ") : null}
            ampm={false}
            
            slotProps={{
              textField: {
                error: error,
              },
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
      </div>
    

  );
}
