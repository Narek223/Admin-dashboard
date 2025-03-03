import React, { useState, useEffect,useCallback } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { AiOutlineClose } from "react-icons/ai";
import ModalBtn from "../../../SheredComponents/ModalButtons/ModalBtn";
import Inputs from "../../../SheredComponents/Inputs/Inputs";
import DataPicker from "../../../SheredComponents/DataPicker/DataPicker";
import ChooseFile from "../../Service/ChooseFile/ChooseFile";
import styles from "./clientmodal.module.scss";

export default function ClientModal({
  open,
  handleClose,
  error,
  setError,
  onAddService,
  edit,
  id,
  setid
}) {

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [files, setFiles] = useState("");

  const resetForm = useCallback(() => {
    setName("");
    setDate("");
    setMail("");
    setPhone("");
    setFiles("");
    setid(0);
  }, []);





  useEffect(() => {
    if (name && date && mail && phone) {
      setError(false);
    }
  }, [name, date, mail, phone, setError]);

  const handleSave = () => {
    const hasEmptyFields = !name || !date || !mail || !phone;
    setError(hasEmptyFields);

    if (hasEmptyFields) return;

    const clientObj = {
      id,
      name,
      date,
      mail,
      phone,
      files,
    };

    if (edit) {
      onAddService(clientObj, true);
    } else {
      onAddService(clientObj, false);
    }

    handleClose();
    resetForm();
  };

  const handleFileSelect = (fileUrl) => {
    setFiles(fileUrl);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      disablePortal
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={styles.modal}
    >
      <Box>
        <div className={styles.clientmodal}>
          <p className={styles.close}>
            <AiOutlineClose onClick={handleClose} className={styles.icon} />
          </p>
          <div className={styles.clientmodalpage}>
            <h1>Add Client</h1>
          </div>
          <div className={styles.clentselect}>
            <div className={styles.clentwrapper}>
              <Inputs
                error={error && !name}
                value={name}
                state={setName}
                placeholder="Anna Smith"
                type="text"
                label="Full Name"
              />
              <DataPicker setDate={setDate} error={error && !date} />
            </div>
            <div>
              <Inputs
                error={error && !mail}
                value={mail}
                state={setMail}
                placeholder="annesmith@gmail.com"
                type="text"
                label="Email"
              />
              <Inputs
                error={error && !phone}
                value={phone}
                state={setPhone}
                placeholder="+49 30 12345678"
                type="tel"
                label="Phone Number"
                pattern="[\+]?[0-9]{1,4}?[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,9}"
              />
            </div>
            <ChooseFile addimg={handleFileSelect} edit={null} />
            <ModalBtn
              onClose={handleClose}
              handleSave={handleSave}
              edit={edit}
            />
          </div>
        </div>
      </Box>
    </Modal>
  );
}
