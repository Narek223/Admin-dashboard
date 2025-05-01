import React, { useState } from "react";
import styles from "./Categories.module.scss";
import Header from "../Header/Header";
import CategoriesModal from "./CategoriesModal/CategoriesModal";
import { AiOutlineFieldNumber } from "react-icons/ai";

export default function Categories() {
  const [open, setopen] = useState(false);
  const [categorieslist, setcategorieslist] = useState([]);
  const [edit, setedit] = useState(null);

  const openHeader = () => {
    setopen(true);
  };

  const handleClose = () => {
    setopen(false);
  };

  const addcategories = (categories, isEdit = false) => {
    if (isEdit) {
      setcategorieslist((prev) =>
        prev.map((item) => (item.id === categories.id ? categories : item))
      );
      setedit(null);
    } else {
      setcategorieslist((prev) => [
        ...prev,
        { ...categories, id: prev.length + 1 },
      ]);
    }
  };
  return (
    <div>
      <Header handleOpen={openHeader} />
      <CategoriesModal
        open={open}
        close={handleClose}
        addcategories={addcategories}
      />
      <div className={styles.categories}>
        <div className={styles.categoriesHeader}>
          <div className={styles.categoriesTitle}>
            <ul>
              <li>
                <AiOutlineFieldNumber className={styles.icons} />
              </li>
              <li>Image</li>
              <li>Category Name </li>
              <li>Description</li>
              <li>Publish Date</li>
            </ul>
          </div>
          <div className={styles.categoriesListContainer}>
            {categorieslist.map((elem, index) => (
              <div key={index} className={styles.categoriesList}>
                <div className={styles.categoriesListItem}>
                  <ul>
                    <li>{elem.id}</li>

                    <li>
                      <img
                        src={elem.files}
                        className={styles.img}
                        alt="Service"
                      />
                    </li>

                    <li>{elem.name}</li>
                    <li>{elem.description}</li>
                    <li>{elem.date}</li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
