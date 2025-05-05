import React, { useCallback, useState, useEffect } from "react";
import styles from "./servicemodal.module.scss";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { AiOutlineClose } from "react-icons/ai";
import { services } from "../../../Services/data/addServices/services";
import ChooseFile from "../../../SheredComponents/ChooseFile/ChooseFile";
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
  const [service, setService] = useState("");
  const [category, setCategory] = useState("Classic");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState("");

  const resetForm = useCallback(() => {
    setService("");
    setCategory("Classic");
    setPrice("");
    setDuration("");
    setDescription("");
    setFiles("");
    setId(0);
  }, []);

  useEffect(() => {
    if (edit) {
      setService(edit.service || "");
      setCategory(edit.category || "Classic");
      setPrice(edit.price || "");
      setDuration(edit.duration || "");
      setDescription(edit.description || "");
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

    if (!service || !category || !price || !duration || !description.length) {
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
          <Inputs
              error={error && !service}
              value={service}
              state={setService}
              placeholder="Service Name"
              type="text"
              label="Service Name"
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
            <Inputs
              error={error && !description}
              value={description}
              state={setDescription}
              placeholder="Description"
              type="text"
              label="Description"
              Fullwidth={true}
              width="100%"
            />
          </div>
          <ChooseFile addimg={handleFileSelect} edit={edit} />
          <ModalBtn onClose={onClose} handleSave={handleSave} edit={edit} />
        </div>
      </Box>
    </Modal>
  );
}
