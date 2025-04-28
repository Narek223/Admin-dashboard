import React, { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { AiOutlineClose } from "react-icons/ai";
import ModalBtn from "../../../SheredComponents/ModalButtons/ModalBtn";
import Inputs from "../../../SheredComponents/Inputs/Inputs";
import DataPicker from "../../../SheredComponents/DataPicker/DataPicker";
import styles from "./clientmodal.module.scss";
import ChooseFile from "../../../SheredComponents/ChooseFile/ChooseFile";
import dayjs from "dayjs";

export default function ClientModal({
  open,
  handleClose,
  error,
  setError,
  onAddService,
  edit,
}) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [files, setFiles] = useState("");
  const [id, setId] = useState(0);

  const resetForm = useCallback(() => {
    setName("");
    setDate("");
    setMail("");
    setPhone("");
    setFiles("");
    setId(0);
  }, []);

  useEffect(() => {
    if (name && date && mail && phone) {
      setError(false);
    }
  }, [name, date, mail, phone, setError]);

  useEffect(() => {
    if (edit) {
      setName(edit.name || "");
      setDate(edit.date || "");
      setMail(edit.mail || "");
      setPhone(edit.phone || "");
      setFiles(edit.files || "");
      setId(edit.id || 0);
    } else {
      resetForm();
    }
  }, [edit, resetForm]);

  const handleSave = () => {
    const hasEmptyFields = !name || !date || !mail || !phone;
    setError(hasEmptyFields);

    if (hasEmptyFields) return;
    if (!name || !date || !mail || !phone) {
      return;
    }
    const formattedDate =
      date instanceof Date ? dayjs(date).format("YYYY-MM-DD") : date;
    const clientObj = {
      id,
      name,
      date: formattedDate,
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
            <h1>{edit ? "Edit Client " : "Add Client"}</h1>
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
              <DataPicker
                setDate={setDate}
                error={error && !date}
                value={date}
              />
            </div>
            <div>
              <Inputs
                error={error && !mail}
                value={mail}
                state={setMail}
                placeholder="annesmith@gmail.com"
                type="email"
                label="Email"
              />
              <Inputs
                error={error && !phone}
                value={phone}
                state={setPhone}
                placeholder="+49 30 12345678"
                type="tel"
                label="Phone Number"
              />
            </div>
            <ChooseFile addimg={handleFileSelect} edit={edit} />
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
