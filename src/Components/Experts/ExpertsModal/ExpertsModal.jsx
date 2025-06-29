import React, { useCallback, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import * as ModalSlice from "../../../Redax/Slices/Experts/ExpertsModalSlice";
import TextField from "@mui/material/TextField";

export default function ExpertsModal({
  open,
  handleClose,
  error,
  seterror,
  edit,
  onAddExpert,
}) {
  const dispatch = useDispatch();
  const {
    name,
    mail,
    phone,
    adress,
    date,
    specialist,
    expertSummary,
    files,
    experians,
    experiansTo,
    id,
  } = useSelector((state) => state.expertsModal);

  const inputValues = [
    {
      id: 0,
      placeholder: "annesmith@gmail.com",
      value: mail,
      setstate: (val) => dispatch(ModalSlice.setMail(val)),
      state: mail,
      type: "text",
      label: "Email",
    },
    {
      id: 1,
      placeholder: "+49 30 12345678",
      value: phone,
      setstate: (val) => dispatch(ModalSlice.setPhone(val)),
      state: phone,
      type: "text",
      label: "Phone Number",
    },
  ];

  const resetForm = useCallback(() => {
    dispatch(ModalSlice.resetExpertForm());
  }, [dispatch]);

  const handleFileSelect = (fileUrl) => {
    dispatch(ModalSlice.setFiles(fileUrl));
  };

  useEffect(() => {
    if (name && date && mail && phone && files && expertSummary && experians && experiansTo) {
      seterror(false);
    }
  }, [name, date, mail, phone, files, expertSummary,experians, experiansTo,seterror]);

  const save = () => {
    // const hasEmptyFields =
    //   !name || !date || !mail || !phone || !adress || !specialist ||expertSummary || experians || experiansTo ;

    // seterror(hasEmptyFields);
    // if (hasEmptyFields) return;

    const expertObj = {
      id,
      name,
      mail,
      phone,
      adress,
      date,
      specialist,
      files,
    };

    if (edit) {
      onAddExpert(expertObj, true);
    } else {
      onAddExpert(expertObj, false);
    }

    handleClose();
    resetForm();
  };

  useEffect(() => {
    if (edit) {
      dispatch(ModalSlice.setName(edit.name || ""));
      dispatch(ModalSlice.setDate(edit.date || ""));
      dispatch(ModalSlice.setMail(edit.mail || ""));
      dispatch(ModalSlice.setPhone(edit.phone || ""));
      dispatch(ModalSlice.setFiles(edit.files || ""));
      dispatch(ModalSlice.setAdress(edit.adress || ""));
      dispatch(ModalSlice.setSpecialist(edit.specialist || ""));
      dispatch(ModalSlice.setId(edit.id || 0));
    } else {
      resetForm();
    }
  }, [edit, dispatch, resetForm]);

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
            <h1 className={styles.ExportModalTitle}>
              {edit ? "Edit Expert " : "Add Expert"}
            </h1>
            <div className={styles.addClient}>
              <div className={styles.name}>
                <Inputs
                  error={error && !name}
                  value={name}
                  state={(val) => dispatch(ModalSlice.setName(val))}
                  placeholder="Anna Smith"
                  type="text"
                  label="Full Name"
                />
                <DataPicker
                  setDate={(val) => dispatch(ModalSlice.setDate(val))}
                  error={error && !date}
                  value={date}
                  label="Birth Date"
                />
              </div>
              <div className={styles.inputs}>
                {inputValues.map(
                  ({ placeholder, value, state, type, label, setstate }) => (
                    <Inputs
                      key={label}
                      error={error && !state}
                      value={value}
                      state={setstate}
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
                  state={(val) => dispatch(ModalSlice.setAdress(val))}
                  placeholder="Berliner Strabe 25"
                  type="text"
                  label="Addres"
                />
                <SelectComponent
                  fullWidth={false}
                  deafultvalue="Hair Care"
                  servicename="Specialist"
                  service={specialist}
                  sets={(val) => dispatch(ModalSlice.setSpecialist(val))}
                  services={services[0].options}
                />
              </div>
            <div className={styles.experians}>  
              
                <Inputs
                  error={error && !experians}
                  value={experians}
                  state={(val) => dispatch(ModalSlice.setexperians(val))}
                  placeholder="2020"
                  type="text"
                  label="Experiance"
                />
                <Inputs
                  error={error && !experiansTo}
                  value={experiansTo}
                  state={(val) => dispatch(ModalSlice.setexperiansTo(val))}
                  placeholder=" 2023 "
                  type="text"
                  label="To"
                />
                </div>


              <div className={styles.expertSummary}>
               <TextField
                error={error && !expertSummary}
                value={expertSummary}
                onChange={(e) => dispatch(ModalSlice.setexpertSummary(e.target.value))}
                placeholder="Summery..."
                multiline
                rows={10}
                variant="outlined"
                fullWidth
                sx={{
                  "& .MuiInputBase-root": {
                    margin: "10px 0",
                    color: "rgba(127, 129, 136, 1)",
                    border: "1px solid rgba(98, 99, 115, 0.3);",
                  },
                }}
              />
              </div>
           
            </div>

            <div>
              
            </div>
            <ChooseFile addimg={handleFileSelect} edit={edit} />
            <ModalBtn onClose={handleClose} handleSave={save} edit={edit} />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
