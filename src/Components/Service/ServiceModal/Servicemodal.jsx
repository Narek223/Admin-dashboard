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

export default function Servicemodal({ open, onClose, onAddService, addimg }) {


  const [id, setid] = useState(0);
  const [servicesList, setServicesList] = useState([]);
  const [service, setservice] = useState("");
  const [category, setcategory] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState("");

  const handleSave = () => {
    if (
      !service ||
      !category ||
      !price ||
      !duration ||
      !description.length ||
      !files
    ) {
      return;
    }

    const newService = {
      id,
      service,
      category,
      price,
      duration,
      description,
      files,
    };
    setServicesList((prevServices) => [...prevServices, newService]);
    onAddService(newService);
    onClose();

    setservice("");
    setcategory("");
    setPrice("");
    setDuration("");
    setDescription("");
  };

  const handleFileSelect = (fileUrl) => {
    setFiles(fileUrl);
  };

  useEffect(() => {
    setid(servicesList.length);
  }, [servicesList]);

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
        <h1>Add Service</h1>
        <div className={styles.addService}>
          <div className={styles.service}>
            <FormControl className={styles.formControl} variant="outlined">
              <InputLabel
                shrink={true}
                variant="standard"
                className={styles.inputlabel}
              >
                Service Name
              </InputLabel>
              <Select
                value={service || "Hair Care"}
                IconComponent={FaAngleDown}
                onChange={(e) => setservice(e.target.value)}
                className={styles.nativeSelect}
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
              >
                {services[0].options.map((option, index) => (
                  <MenuItem
                    value={option}
                    className={styles.option}
                    key={index}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl className={styles.formControl} variant="outlined">
              <InputLabel
                shrink={true}
                variant="standard"
                className={styles.inputlabel}
              >
                Category
              </InputLabel>
              <Select
                value={category || "Classic"}
                IconComponent={FaAngleDown}
                onChange={(e) => setcategory(e.target.value)}
                className={styles.nativeSelect}
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
              >
                {services[1].options.map((option, index) => (
                  <MenuItem
                    value={option}
                    className={styles.option}
                    key={index}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className={styles.inputGroup}>
            <FormControl className={styles.formControl}>
              <InputLabel
                htmlFor="price-input"
                variant="standard"
                className={styles.inputlabel}
              >
                Price
              </InputLabel>
              <input
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                id="price-input"
                className={styles.textInput}
                placeholder="$45"
              />
            </FormControl>
            <FormControl className={styles.formControl}>
              <InputLabel
                variant="standard"
                htmlFor="duration-input"
                className={styles.inputlabel}
              >
                Duration
              </InputLabel>
              <input
                type="text"
                id="duration-input"
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
               value={description || "Ten"}
            
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
          <ChooseFile addimg={handleFileSelect} />

          <div className={styles.btnbox}>
            <button onClick={onClose}>Cancle</button>
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
