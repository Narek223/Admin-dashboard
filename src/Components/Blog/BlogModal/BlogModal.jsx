import React, { useState, useCallback, useEffect } from "react";
import styles from "./blogModal.module.scss";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { AiOutlineClose } from "react-icons/ai";
import Inputs from "../../../SheredComponents/Inputs/Inputs";
import SelectComponent from "../../../SheredComponents/Select/SelectComponent";
import { services } from "../../../Services/data/addServices/services";
import ModalBtn from "../../../SheredComponents/ModalButtons/ModalBtn";
import TextField from "@mui/material/TextField";
import ChooseFile from "../../../SheredComponents/ChooseFile/ChooseFile";

export default function BlogModal({
  open,
  handleClose,
  addblog,
  edit,
  error,
  seterror,
}) {
  const [title, setitle] = useState("");
  const [category, setCategory] = useState("Classic");
  const [Author, setAuthor] = useState("");
  const [files, setFiles] = useState("");
  const [content, setContent] = useState("");
  const [id, setId] = useState(0);
  const [subtitle, setSubtitle] = useState("");

  const handleFileSelect = (fileUrl) => {
    setFiles(fileUrl);
  };

  const resetForm = useCallback(() => {
    setitle("");
    setCategory("Classic");
    setAuthor("");
    setFiles("");
    setContent("");
    setSubtitle("");
    setId(0);
  }, []);

  useEffect(() => {
    if (edit) {
      setitle(edit.title || "");
      setCategory(edit.category || "Classic");
      setAuthor(edit.Author || "");
      setFiles(edit.files || "");
      setContent(edit.content || "");
      setSubtitle(edit.subtitle || "");
      setId(edit.id || 0);
    } else {
      resetForm();
    }
  }, [edit, resetForm]);

  const handleSave = () => {
    const hasEmptyFields = !title || !category || !Author || !content || !subtitle;
    seterror(hasEmptyFields);
    if (hasEmptyFields) {
      return;
    }

    const blogobj = {
      id,
      title,
      category,
      Author,
      files,
      content,
      subtitle,
    };

    if (edit) {
      addblog(blogobj, true);
    } else {
      addblog(blogobj, false);
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
          <div className={styles.blogModal}>
            <p className={styles.close}>
              <AiOutlineClose onClick={handleClose} className={styles.icon} />
            </p>

            <div className={styles.BlogWrapper}>
              <h1>{edit ? "Edit blog" : "Add blog"}</h1>
              <Inputs
                error={error && !title}
                value={title}
                state={setitle}
                placeholder={"Title"}
                type="text"
                label={"Title"}
                Fullwidth={true}
                width={"100%"}
              />

              <Inputs
                error={error && !subtitle}
                value={subtitle}
                state={setSubtitle}
                placeholder={"Subtitle"}
                type="text"
                label={"Subtitle"}
                Fullwidth={true}
                width={"100%"}
              />
              <div>
                <SelectComponent
                  fullWidth={true}
                  deafultvalue={"Classic"}
                  servicename="Category"
                  service={category}
                  sets={setCategory}
                  services={services[1].options}
                />
              </div>

              <Inputs
                error={error && !Author}
                value={Author}
                state={setAuthor}
                placeholder={"Author"}
                type="text"
                label={"Author"}
                Fullwidth={true}
                width={"100%"}
              />

              <div>
                <TextField
                  error={error && !content}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write a blog text..."
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
    </div>
  );
}
