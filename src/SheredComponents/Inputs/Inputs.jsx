import React from "react";
import styles from "./input.module.scss";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

export default function Inputs({
  error,
  value,
  state,
  placeholder,
  type,
  label,
  Fullwidth,
  width
}) {
  return (
    <FormControl className={styles.formControl}
    style={{ width: Fullwidth ? width : "47%" }}

    >
      <InputLabel variant="standard" className={styles.inputlabel}>
        {label}
      </InputLabel>
      <TextField
    
        error={error}
        value={value}
        onChange={(e) => state(e.target.value)}
        type={type}
        className={styles.textInput}
        placeholder={placeholder}
        sx={{
          "& .MuiInputBase-root": {
            color: "rgba(127, 129, 136, 1)",
          },
         
        }}
      />
    </FormControl>
  );
}
