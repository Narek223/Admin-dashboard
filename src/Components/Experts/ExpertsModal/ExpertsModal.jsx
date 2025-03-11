import React, { useState, useCallback, useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styles from "./expertsModal.module.scss";
import { AiOutlineClose } from "react-icons/ai";
import Inputs from "../../../SheredComponents/Inputs/Inputs";
import DataPicker from "../../../SheredComponents/DataPicker/DataPicker";
import SelectComponent from "../../../SheredComponents/Select/SelectComponent";
import { services } from "../../../Services/data/addServices/services";
import ChooseFile from "../../../SheredComponents/ChooseFile/ChooseFile";
import ModalBtn from "../../../SheredComponents/ModalButtons/ModalBtn";

export default function ExpertsModal({
  open,
  handleClose,
  error,
  seterror,
  edit,
  onAddExpert,
}) {
  let [name, setName] = useState("");
  let [mail, setMail] = useState("");
  let [phone, setPhone] = useState("");
  let [adress, setadress] = useState("");
  let [date, setDate] = useState("");
  let [specialist, setSpecialist] = useState("Hair Care");
  let [file, setfile] = useState("");
  const [id, setId] = useState(0);

  const resetForm = useCallback(() => {
    setName("");
    setDate("");
    setMail("");
    setPhone("");
    setfile("");
    setadress("");
    setSpecialist("");
  }, []);

  useEffect(() => {
    if (edit) {
      setName(edit.name || "");
      setDate(edit.date || "");
      setMail(edit.mail || "");
      setPhone(edit.phone || "");
      setfile(edit.files || "");
      setadress(edit.adress || "");
      setSpecialist(edit.specialist || "");
      setId(edit.id || 0);
    } else {
      resetForm();
    }
  }, [edit, resetForm]);

  let inputValues = [
    {
      id: 0,
      placeholder: "annesmith@gmail.com",
      value: mail,
      state: setMail,
      type: "text",
      label: "Email",
    },
    {
      id: 1,
      placeholder: "+49 30 12345678",
      value: phone,
      state: setPhone,
      type: "text",
      label: "Phone Number",
    },
  ];
  const handleFileSelect = (fileUrl) => {
    setfile(fileUrl);
  };

  const save = () => {
    const hasEmptyFields = !name || !date || !mail || !phone || !adress;
    seterror(hasEmptyFields);
  if (!name || !date || !mail || !phone || !file ||  !adress || !specialist) {
      return;
    }
    let expartobj = {
      name,
      mail,
      phone,
      adress,
      date,
      specialist,
      file,
    };
    if (edit) {
      onAddExpert(expartobj, true);
    } else {
      onAddExpert(expartobj, false);
    }

    handleClose();
    resetForm();
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        disablePortal
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={styles.modal}
      >
        <Box>
          <div className={styles.exportModalConteiner}>
            <p className={styles.close}>
              <AiOutlineClose onClick={handleClose} className={styles.icon} />
            </p>
            <h1  className={styles.ExportModalTitle} >{edit? "Edit Expert ":"Add Expert"}</h1>
            <div className={styles.addClient}>
              <div className={styles.name}>
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
              <div className={styles.inputs}>
                {inputValues.map(
                  ({ placeholder, value, state, type, label }) => (
                    <Inputs
                      error={error && !name}
                      value={value}
                      state={state}
                      placeholder={placeholder}
                      type={type}
                      label={label}
                    />
                  )
                )}
              </div>
              <div className={styles.adressandSelect}>
                <Inputs
                  error={error && !adress}
                  value={adress}
                  state={setadress}
                  placeholder="Berliner Strabe 25"
                  type="text"
                  label="Addres"
                />
                <SelectComponent
                  deafultvalue={"Hair Care"}
                  servicename="Specialist"
                  service={specialist}
                  sets={setSpecialist}
                  services={services[0].options}
                />
              </div>
            </div>
            <ChooseFile addimg={handleFileSelect} edit={edit} />
            <ModalBtn onClose={handleClose} handleSave={save} edit={edit} />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
