import React from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FaAngleDown } from "react-icons/fa";
import MenuItem from "@mui/material/MenuItem";
import { menuStyles } from "../../Services/data/addServices/serviceStyles";
import styles from "./select.module.scss";

export default function SelectComponent({
  service,
  sets,
  services,
  servicename,
  deafultvalue,
}) {
  return (
    <FormControl className={styles.formControl} variant="outlined" required>
      <InputLabel
        shrink={true}
        variant="standard"
        className={styles.inputlabel}
      >
        {servicename}
      </InputLabel>
      <Select
        required
        value={service || deafultvalue}
        IconComponent={FaAngleDown}
        onChange={(e) => sets(e.target.value)}
        className={styles.nativeSelect}
        MenuProps={{
          PaperProps: {
            sx: { menuStyles },
          },
        }}
      >
        {services.map((option, index) => (
          <MenuItem value={option} className={styles.option} key={index}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
