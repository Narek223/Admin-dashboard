import React from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FaAngleDown } from "react-icons/fa";
import MenuItem from "@mui/material/MenuItem";
import { menuStyles } from "../../Services/data/addServices/serviceStyles";

export default function SelectComponent({
  formControlClass,
  inputlabelClass,
  service,
  sets,
  nativeSelect,
  services,
  servicename,
  optionclass,
  deafultvalue,
}) {
  return (
    <FormControl className={formControlClass} variant="outlined">
      <InputLabel shrink={true} variant="standard" className={inputlabelClass}>
        {servicename}
      </InputLabel>
      <Select
        value={service || deafultvalue}
        IconComponent={FaAngleDown}
        onChange={(e) => sets(e.target.value)}
        className={nativeSelect}
        MenuProps={{
          PaperProps: {
            sx: { menuStyles },
          },
        }}
      >
        {services.map((option, index) => (
          <MenuItem value={option} className={optionclass} key={index}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
