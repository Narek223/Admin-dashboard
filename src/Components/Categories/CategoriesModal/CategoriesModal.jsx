import React, { useState, useCallback, useEffect } from "react";
import styles from "./categoriesmodal.module.scss";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { AiOutlineClose } from "react-icons/ai";
import Inputs from "../../../SheredComponents/Inputs/Inputs";
import ModalBtn from "../../../SheredComponents/ModalButtons/ModalBtn";
import ChooseFile from "../../../SheredComponents/ChooseFile/ChooseFile";

export default function CategoriesModal({
  open,
  close,
  addcategories,
  edit,
  error,
  setError,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState("");
  const [id, setId] = useState(0);

  const handleFileSelect = (fileUrl) => {
    setFiles(fileUrl);
  };

  const resetForm = useCallback(() => {
    setName("");
    setDescription("");
    setFiles("");
    setId(0);
  }, []);

  useEffect(() => {
    if (name && description && files) {
      setError(false);
    }
  }, [name, description, files, setError]);

  useEffect(() => {
    if (edit) {
      setName(edit.name || "");
      setDescription(edit.description || "");
      setFiles(edit.files || "");
      setId(edit.id || 0);
    } else {
      resetForm();
    }
  }, [edit, resetForm]);

  const save = () => {
    const hasEmptyFields = !name ;
    setError(hasEmptyFields);

    if (hasEmptyFields) return;
    if (!name   ) {
      return;
    }


    const categoriesobj = {
      id,
      name,
      description,
      files,
      date: new Date().toLocaleDateString(),
    };

    if (edit) {
      addcategories(categoriesobj, true);
    } else {
      addcategories(categoriesobj, false);
    }
    close();
    resetForm();
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
              state={setName}
              placeholder="Category Name"
              type="text"
              label="Category Name"
              Fullwidth={true}
              width={"100%"}
            />
            <Inputs
              error={null}
              value={description}
              state={setDescription}
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
