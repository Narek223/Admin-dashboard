import React, { useCallback, useState, useEffect } from "react";
import styles from "./servicemodal.module.scss";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { AiOutlineClose } from "react-icons/ai";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { services } from "../../../Services/data/addServices/services";
import ChooseFile from "../ChooseFile/ChooseFile";
import { FaAngleDown } from "react-icons/fa";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import SelectComponent from "../../../SheredComponents/Select/SelectComponent";

export default function Servicemodal({ open, onClose, onAddService, edit }) {
  const [id, setId] = useState(0);
  const [service, setService] = useState("Hair Care");
  const [category, setCategory] = useState("Classic");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("Ten");
  const [files, setFiles] = useState("");

  
  const resetForm = useCallback(() => {
    setService("Hair Care");
    setCategory("Classic");
    setPrice("");
    setDuration("");
    setDescription("Ten");
    setFiles("");
    setId(0);
  }, []);


  useEffect(() => {
    if (edit) {
      setService(edit.service || "Hair Care");
      setCategory(edit.category || "Classic");
      setPrice(edit.price || "");
      setDuration(edit.duration || "");
      setDescription(edit.description || "Ten");
      setFiles(edit.files || "");
      setId(edit.id || 0);
    } else {
      resetForm();
    }
  }, [edit, resetForm]);

  const handleSave = () => {





    const newService = {
      id,
      service,
      category,
      price,
      duration,
      description,
      files,
    };

    if (edit) {
      onAddService(newService, true);
    } else {
      onAddService(newService,false);
    }

    onClose();
    resetForm();
  };

  const handleFileSelect = (fileUrl) => {
    setFiles(fileUrl);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={styles.modal}
    >
      <Box className={styles.modalBox}>
        <p className={styles.close}>
          <AiOutlineClose onClick={onClose} className={styles.icon} />
        </p>
        <h1>{edit ? "Edit Service" : "Add Service"}</h1>
        <div className={styles.addService}>
          <div className={styles.service}>
            <SelectComponent
              deafultvalue={"Hair Care"}
              servicename="Service Name"
              formControlClass={styles.formControl}
              inputlabelClass={styles.inputlabel}
              service={service}
              sets={setService}
              nativeSelect={styles.nativeSelect}
              services={services[0].options}
              optionclass={styles.option}
            />
            <SelectComponent
              deafultvalue={"Classic"}
              servicename="Category"
              formControlClass={styles.formControl}
              inputlabelClass={styles.inputlabel}
              service={category}
              sets={setCategory}
              nativeSelect={styles.nativeSelect}
              services={services[1].options}
              optionclass={styles.option}
            />
          </div>

          <div className={styles.inputGroup}>
            <FormControl className={styles.formControl}>
              <InputLabel htmlFor="price-input" variant="standard" className={styles.inputlabel}>
                Price
              </InputLabel>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                id="price-input"
                className={styles.textInput}
                placeholder="$45"
              />
            </FormControl>
            <FormControl className={styles.formControl}>
              <InputLabel variant="standard" htmlFor="duration-input" className={styles.inputlabel}>
                Duration
              </InputLabel>
              <input
                type="text"
                id="duration-input"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className={styles.textInput}
                placeholder="30 min"
              />
            </FormControl>
          </div>

          <div className={styles.description}>
            <FormControl fullWidth className={styles.descriptionForm}>
              <InputLabel
                shrink={true}
                variant="standard"
                className={styles.label}
                htmlFor="uncontrolled-native"
              >
                Description
              </InputLabel>
              <Select
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                IconComponent={FaAngleDown}
                className={styles.descriptionSelect}
                MenuProps={{
                  PaperProps: {
                    sx: {
                      backgroundColor: "rgba(248, 249, 250, 1)",
                      borderRadius: "8px",
                      padding: 0,
                      "& .MuiMenuItem-root:hover": {
                        backgroundColor: "white",
                      },
                    },
                  },
                }}
                inputProps={{
                  name: "Description",
                  id: "uncontrolled-native",
                }}
              >
                <MenuItem value="Ten">Ten</MenuItem>
                <MenuItem value="Twenty">Twenty</MenuItem>
                <MenuItem value="Thirty">Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>

          <ChooseFile addimg={handleFileSelect} edit={edit}/>

          <div className={styles.btnbox}>
            <button onClick={onClose}>Cancel</button>
            <button onClick={handleSave}>{edit ? "Update" : "Save"}</button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
