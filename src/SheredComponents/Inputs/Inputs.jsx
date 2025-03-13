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
}) {
  return (
    <FormControl className={styles.formControl}
    // sx={{
    //   '& .MuiOutlinedInput-notchedOutline': {
    //     border: 'none', 
    //   },
    // }}
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
        
      />
    </FormControl>
  );
}
