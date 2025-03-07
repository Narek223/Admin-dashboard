import React, { useCallback, useState, useEffect } from "react";
import styles from "./servicemodal.module.scss";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { AiOutlineClose } from "react-icons/ai";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { services } from "../../../Services/data/addServices/services";
import ChooseFile from "../../../SheredComponents/ChooseFile/ChooseFile"
import { FaAngleDown } from "react-icons/fa";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import SelectComponent from "../../../SheredComponents/Select/SelectComponent";
import ModalBtn from "../../../SheredComponents/ModalButtons/ModalBtn";
import Inputs from "../../../SheredComponents/Inputs/Inputs";

export default function Servicemodal({
  open,
  onClose,
  onAddService,
  edit,
  seterror,
  error,
}) {
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

  useEffect(() => {
    if (duration && price) {
      seterror(false);
    }
  }, [duration, price, seterror]);

  const handleSave = () => {
    const hasEmptyFields = !duration || !price;
    seterror(hasEmptyFields);

    if (hasEmptyFields) return;

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

    if (edit) {
      onAddService(newService, true);
    } else {
      onAddService(newService, false);
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
              service={service}
              sets={setService}
              services={services[0].options}
            />
            <SelectComponent
              deafultvalue={"Classic"}
              servicename="Category"
              service={category}
              sets={setCategory}
              services={services[1].options}
            />
          </div>

          <div className={styles.inputGroup}>
            <Inputs
              error={error && !price}
              value={price}
              state={setPrice}
              placeholder="$45"
              type="number"
              label="Price"
            />
            <Inputs
              error={error && !duration}
              value={duration}
              state={setDuration}
              placeholder="30 min"
              type="text"
              label="Duration"
            />
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
          <ChooseFile addimg={handleFileSelect} edit={edit} />
          <ModalBtn onClose={onClose} handleSave={handleSave} edit={edit} />
        </div>
      </Box>
    </Modal>
  );
}
