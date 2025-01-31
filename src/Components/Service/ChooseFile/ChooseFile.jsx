import React, { useState, useCallback,useEffect } from "react";
import fileimg from "../../../assets/Services/file.png";
import { useDropzone } from "react-dropzone";
import styles from "./choosefile.module.scss";
import { FaTrash } from "react-icons/fa";

export default function ChooseFile({ addimg }) {
  const [files, setFiles] = useState([]);
  const [imagePreview, setImagePreview] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const previewURL = URL.createObjectURL(file);

      setImagePreview(imagePreview);
      addimg(previewURL);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept:{ 'image/*': ['.png',".jpg",'.jpeg','.webp']},
    maxSize: 2500000,
    multiple: false,
  });

const delate=()=>{

}

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
        {files.length !==0?(
        <div className={styles.UploadedfilesBox}>
         
          <h1>Uploaded files</h1>
          <div className={styles.Uploadedfiles}>
    
                 <div className={styles.global}>
              <img src={fileimg} />
                <div className={styles.fileinfo}>
                  <p>{files[0].name}</p>
                  <p> {(files[0].size / 1024).toFixed(2)} kb </p>
                </div>
                <div className={styles.trash} onClick={delate}>
                <FaTrash />
              </div>
              </div>
            </div>
         

        </div>
         ) : (
          null
        )}
      </div>
    </div>
  );
}
