import React, { useState, useCallback, useEffect } from "react";
import fileimg from '../../assets/Services/file.png'
import { useDropzone } from "react-dropzone";
import styles from "./choosefile.module.scss";
import { FaTrash } from "react-icons/fa";

export default function ChooseFile({ addimg, edit }) {
  const [file, setFile] = useState([]);

useEffect(() => {
  if (edit && edit.files && edit.files.length > 0) {
    const url = edit.files[0];
    setFile({
      file: url,
      preview: url instanceof File ? URL.createObjectURL(url) : url.path,
      name: url.name,
      size: url.size || 0,
    });
  } else {
    setFile([]);
  }
}, [edit]);
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length === 0) return;
      const fileObj = acceptedFiles[0];
      const mappedFile = {
        file: fileObj,
        preview: URL.createObjectURL(fileObj),
        name: fileObj.name,
        size: fileObj.size,
      };
      setFile(mappedFile);
      addimg([mappedFile.file || mappedFile.preview]);
    },
    [addimg]
  );


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    maxSize: 2500000,
    multiple: false,
  });

  const delate = () => {
 setFile([]);
    addimg([]);
  };

  return (
    <div>
      <div className={styles.choosefile}>
        <div className={styles.dragandrob} {...getRootProps()}>
          <img src={fileimg} />

          <input {...getInputProps()} />
          {isDragActive ? (
            <h1>Release the files to be downloaded</h1>
          ) : (
            <h1>Drag & drop your files here or</h1>
          )}

          <button type="button"> Choose file </button>
        </div>
        <p>Only .doc, .txt and .pdf files 2500 kb max file size</p>
        {file.length !== 0 ? (
          <div className={styles.UploadedfilesBox}>
            <h1>Uploaded Profile Image</h1>
            <div className={styles.Uploadedfiles}>
              <div className={styles.global}>
                <img src={fileimg} />
                <div className={styles.fileinfo}>
                 

                  <p>{file.name}</p>
                  <p>{(file.size / 1024).toFixed(2)} kb </p>
                </div>
                <div className={styles.trash} onClick={delate}>
                  <FaTrash />
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
