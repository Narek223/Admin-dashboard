import React, { useEffect } from "react";
import styles from "./categoriesmodal.module.scss";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { AiOutlineClose } from "react-icons/ai";
import Inputs from "../../../SheredComponents/Inputs/Inputs";
import ModalBtn from "../../../SheredComponents/ModalButtons/ModalBtn";
import ChooseFile from "../../../SheredComponents/ChooseFile/ChooseFile";
import { useSelector, useDispatch } from "react-redux";
import * as modal from "../../../Features/Categories/CategoriesModalSlice";

export default function CategoriesModal({
  open,
  close,
  addcategories,
  edit,
  error,
  setError,
}) {
  const { name, description, files, id } = useSelector(
    (state) => state.categoriesModal
  );
  const dispatch = useDispatch();

  const handleFileSelect = (fileUrl) => {
    dispatch(modal.setFiles(fileUrl));
  };


  useEffect(() => {
    if (edit) {
      dispatch(modal.setName(edit.name || ""));
      dispatch(modal.setDescription(edit.description || ""));
      dispatch(modal.setFiles(edit.files || ""));
      dispatch(modal.setId(edit.id || 0));
    } else {
      dispatch(modal.resetForm());
    }
  }, [edit, dispatch]);

  const save = () => {
    const hasEmptyFields = !name ;
    setError(hasEmptyFields);
    if (hasEmptyFields) return;

    const categoriesobj = {
      id,
      name,
      description,
      files,
      date: new Date().toLocaleDateString(),
    };

    addcategories(categoriesobj, !!edit);

    dispatch(modal.resetForm());
    close();
  };

  return (
    <Modal
      open={open}
      onClose={close}
      disablePortal
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={styles.modal}
    >
      <Box>
        <div className={styles.categoriesModal}>
          <p className={styles.close}>
            <AiOutlineClose onClick={close} className={styles.icon} />
          </p>
          <div className={styles.title}>
            <h1>{edit ? "Edit Categories" : "Add Categories "}</h1>
          </div>
          <div>
            <Inputs
              error={error && !name}
              value={name}
              state={(value) => dispatch(modal.setName(value))}
              placeholder="Category Name"
              type="text"
              label="Category Name"
              Fullwidth={true}
              width={"100%"}
            />
            <Inputs
              error={null}
              value={description}
              state={(value) => dispatch(modal.setDescription(value))}
              placeholder="Description"
              type="text"
              label="Description"
              Fullwidth={true}
              width={"100%"}
            />
            <ChooseFile addimg={handleFileSelect} edit={edit} />
            <ModalBtn onClose={close} handleSave={save} edit={edit} />
          </div>
        </div>
      </Box>
    </Modal>
  );
}
