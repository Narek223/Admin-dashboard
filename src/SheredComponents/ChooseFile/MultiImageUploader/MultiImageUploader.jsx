import React, { useState, useCallback, useEffect } from "react";
import fileimg from "../../../assets/Services/file.png";
import { useDropzone } from "react-dropzone";
import styles from "./files.module.scss";
import { FaTrash } from "react-icons/fa";

export default function MultiImageUploader({ addimg, edit, initialFiles = [], label,DragAndDrop }) {
  const [files, setFiles] = useState(initialFiles);

  useEffect(() => {
    if (edit && edit.length > 0) {
      const mapped = edit.map((url, index) => ({
        file: url ,
        preview: url[index],
        name: url.name,
        size: url.size || 0,
      }));
      setFiles(mapped);
    }
  }, [edit]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const mappedFiles = acceptedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        name: file.name,
        size: file.size,
      }));

      const newFiles = [...files, ...mappedFiles];
      setFiles(newFiles);
      addimg(newFiles.map((f) => f.file || f.preview));
    },
    [files, addimg]
  );

  const deleteFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    addimg(newFiles.map((f) => f.file || f.preview));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    maxSize: 2500000,
    multiple: true,
  });

  return (
    <div className={styles.file}>
      <div className={styles.dragandrob} {...getRootProps()}>
        <img src={fileimg} alt="upload icon" />
        <input {...getInputProps()} />
        {isDragActive ? (
          <h1>Release the files to upload</h1>
        ) : (
          <h1>{DragAndDrop}</h1>
        )}
        <button type="button">Choose file</button>
      </div>

      {files.length > 0 && (
        <div className={styles.UploadedfilesBox}>
          <h1>{label}</h1>
          {files.map((f, index) => (
            <div className={styles.Uploadedfiles} key={index}>
              <div className={styles.global}>
                <img src={fileimg} alt={f.name} />
                <div className={styles.fileinfo}>
                  <p>{f.name}</p>
                  <p>{(f.size / 1024).toFixed(2)} kb</p>
                </div>
                <div className={styles.trash} onClick={() => deleteFile(index)}>
                  <FaTrash />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
