import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { AiOutlineClose } from "react-icons/ai";
import ModalBtn from "../../../SheredComponents/ModalButtons/ModalBtn";
import Inputs from "../../../SheredComponents/Inputs/Inputs";
import DataPicker from "../../../SheredComponents/DataPicker/DataPicker";
import styles from "./clientmodal.module.scss";
import ChooseFile from "../../../SheredComponents/ChooseFile/ChooseFile";
import dayjs from "dayjs";
import { useSelector, useDispatch } from "react-redux";
import * as clientModalSlice from "../../../Redax/Slices/Client/ClientModalSlice";

export default function ClientModal({
  open,
  handleClose,
  error,
  setError,
  onAddService,
  edit,
}) {
  const { name, date, mail, phone, files, id } = useSelector(
    (state) => state.clientModal
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (name && date && mail && phone) {
      setError(false);
    }
  }, [name, date, mail, phone, setError]);

  useEffect(() => {
    if (edit) {
      dispatch(clientModalSlice.setName(edit.name || ""));
      dispatch(clientModalSlice.setDate(edit.date || ""));
      dispatch(clientModalSlice.setMail(edit.mail || ""));
      dispatch(clientModalSlice.setPhone(edit.phone || ""));
      dispatch(clientModalSlice.setFiles(edit.files || ""));
      dispatch(clientModalSlice.setId(edit.id || 0));
    } else {
      dispatch(clientModalSlice.resetForm());
    }
  }, [edit, dispatch]);

  const handleSave = () => {
    const hasEmptyFields = !name || !date || !mail || !phone;
    setError(hasEmptyFields);

    if (hasEmptyFields) return;

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

    onAddService(clientObj, !!edit);

    handleClose();
    dispatch(clientModalSlice.resetForm());
  };

  const handleFileSelect = (fileUrl) => {
    dispatch(clientModalSlice.setFiles(fileUrl));
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
                state={(value) => dispatch(clientModalSlice.setName(value))}
                placeholder="Anna Smith"
                type="text"
                label="Full Name"
              />
              <DataPicker
                setDate={(value) => dispatch(clientModalSlice.setDate(value))}
                error={error && !date}
                value={date}
              />
            </div>
            <div>
              <Inputs
                error={error && !mail}
                value={mail}
                state={(value) => dispatch(clientModalSlice.setMail(value))}
                placeholder="annesmith@gmail.com"
                type="email"
                label="Email"
              />
              <Inputs
                error={error && !phone}
                value={phone}
                state={(value) => dispatch(clientModalSlice.setPhone(value))}
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