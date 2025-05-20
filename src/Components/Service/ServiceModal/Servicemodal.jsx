import React, { useEffect } from "react";
import styles from "./servicemodal.module.scss";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { AiOutlineClose } from "react-icons/ai";
import { services } from "../../../Services/data/addServices/services";
import ChooseFile from "../../../SheredComponents/ChooseFile/ChooseFile";
import SelectComponent from "../../../SheredComponents/Select/SelectComponent";
import ModalBtn from "../../../SheredComponents/ModalButtons/ModalBtn";
import Inputs from "../../../SheredComponents/Inputs/Inputs";
import { useSelector, useDispatch } from "react-redux";
import * as modal from "../../../Redax/Slices/Service/ServiceModalSlice";

export default function Servicemodal({
  open,
  onClose,
  onAddService,
  edit,
  seterror,
  error,
}) {
  const dispatch = useDispatch();
  const { id, service, category, price, duration, description, files } =
    useSelector((state) => state.serviceModal);

  useEffect(() => {
    if (edit) {
      dispatch(
        modal.setAllFields({
          id: edit.id || 0,
          service: edit.service || "",
          category: edit.category || "Classic",
          price: edit.price || "",
          duration: edit.duration || "",
          description: edit.description || "",
          files: edit.files || "",
        })
      );
    } else {
      dispatch(modal.resetModalForm());
    }
  }, [edit, dispatch]);

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
    dispatch(modal.resetModalForm());
  };

  const handleFileSelect = (fileUrl) => {
    dispatch(modal.setFiles(fileUrl));
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        onClose();
        dispatch(modal.resetModalForm());
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={styles.modal}
    >
      <Box className={styles.modalBox}>
        <p className={styles.close}>
          <AiOutlineClose
            onClick={() => {
              onClose();
              dispatch(modal.resetModalForm());
            }}
            className={styles.icon}
          />
        </p>
        <h1>{edit ? "Edit Service" : "Add Service"}</h1>
        <div className={styles.addService}>
          <div className={styles.service}>
            <Inputs
              error={error && !service}
              value={service}
              state={(val) => dispatch(modal.setService(val))}
              placeholder="Service Name"
              type="text"
              label="Service Name"
            />

            <SelectComponent
              deafultvalue={"Classic"}
              servicename="Category"
              service={category}
              sets={(val) => dispatch(modal.setCategory(val))}
              services={services[1].options}
            />
          </div>

          <div className={styles.inputGroup}>
            <Inputs
              error={error && !price}
              value={price}
              state={(val) => dispatch(modal.setPrice(val))}
              placeholder="$45"
              type="number"
              label="Price"
            />
            <Inputs
              error={error && !duration}
              value={duration}
              state={(val) => dispatch(modal.setDuration(val))}
              placeholder="30 min"
              type="text"
              label="Duration"
            />
          </div>

          <div className={styles.description}>
            <Inputs
              error={error && !description}
              value={description}
              state={(val) => dispatch(modal.setDescription(val))}
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
