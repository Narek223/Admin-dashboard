import React, { useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import {
  setTitle,
  setCategory,
  setAuthor,
  setFiles,
  setContent,
  setSubtitle,
  setId,
  resetForm,
} from "../../../Redax/Slices/blog/blogModalSlice";

export default function BlogModal({
  open,
  handleClose,
  addblog,
  edit,
  error,
  seterror,
}) {
  const dispatch = useDispatch();
  const { title, category, Author, files, content, subtitle, id } = useSelector(
    (state) => state.blogModal
  );

  const handleFileSelect = (fileUrl) => {
    dispatch(setFiles(fileUrl));
  };

  useEffect(() => {
    if (edit) {
      dispatch(setTitle(edit.title || ""));
      dispatch(setCategory(edit.category || "Classic"));
      dispatch(setAuthor(edit.Author || ""));
      dispatch(setFiles(edit.files || ""));
      dispatch(setContent(edit.content || ""));
      dispatch(setSubtitle(edit.subtitle || ""));
      dispatch(setId(edit.id || 0));
    } else {
      dispatch(resetForm());
    }
  }, [edit, dispatch]);


  const handleSave = () => {
    
    const hasEmptyFields =
      !title || !category || !Author || !content || !subtitle;
    seterror(hasEmptyFields);
    if (hasEmptyFields) return;

    const blogobj = { id, title, category, Author, files, content, subtitle };
    addblog(blogobj, !!edit);
    dispatch(resetForm());
    handleClose();
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
                state={(val) => dispatch(setTitle(val))}
                placeholder="Title"
                type="text"
                label="Title"
                Fullwidth={true}
                width="100%"
              />

              <Inputs
                error={error && !subtitle}
                value={subtitle}
                state={(val) => dispatch(setSubtitle(val))}
                placeholder="Subtitle"
                type="text"
                label="Subtitle"
                Fullwidth={true}
                width="100%"
              />

              <SelectComponent
                fullWidth={true}
                deafultvalue="Classic"
                servicename="Category"
                service={category}
                sets={(val) => dispatch(setCategory(val))}
                services={services[1].options}
              />

              <Inputs
                error={error && !Author}
                value={Author}
                state={(val) => dispatch(setAuthor(val))}
                placeholder="Author"
                type="text"
                label="Author"
                Fullwidth={true}
                width="100%"
              />

              <TextField
                error={error && !content}
                value={content}
                onChange={(e) => dispatch(setContent(e.target.value))}
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
