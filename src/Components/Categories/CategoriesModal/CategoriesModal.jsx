import React, { useState } from "react";
import styles from "./categoriesmodal.module.scss";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { AiOutlineClose } from "react-icons/ai";
import Inputs from "../../../SheredComponents/Inputs/Inputs";
import ModalBtn from "../../../SheredComponents/ModalButtons/ModalBtn";
import ChooseFile from "../../../SheredComponents/ChooseFile/ChooseFile";


export default function CategoriesModal({ open, close }) {
  const [name, setName] = useState("");
 const [description, setDescription] = useState("");
const [files, setFiles] = useState("");
  const [id, setId] = useState(0);

const handleFileSelect = (fileUrl) => {
    setFiles(fileUrl);
  }

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
            <h1>Add Categories</h1>
          </div>
          <div>
          <Inputs
            error={null}
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

<ChooseFile addimg={handleFileSelect} edit={null} />
            <ModalBtn
                        onClose={close}
                        handleSave={null}
                        edit={null}
                      />
                   
          </div>
        
        </div>
      </Box>
    </Modal>
  );
}
