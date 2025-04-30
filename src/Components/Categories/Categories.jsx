import React, { useState } from "react";
import styles from "./Categories.module.scss";
import Header from "../Header/Header";
import CategoriesModal from "./CategoriesModal/CategoriesModal";
import { AiOutlineFieldNumber } from "react-icons/ai";


export default function Categories() {
  const [open, setopen] = useState(false);

  const openHeader = () => {
    setopen(true);
  };

  const handleClose = () => {
    setopen(false);
  };

  return (
    <div>
      <Header handleOpen={openHeader} />
      <CategoriesModal open={open} close={handleClose} />
      <div className={styles.categories}>
        <div className={styles.categoriesHeader}>
          <div className={styles.categoriesTitle}>
            <ul>
              <li><AiOutlineFieldNumber className={styles.icons} /></li>
              <li>Image</li>
              <li>Category Name </li>
              <li>Description</li>
              <li>Publish Date</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
