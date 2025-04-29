import React, { useState } from "react";
import styles from "./Categories.module.scss";
import Header from "../Header/Header";
import CategoriesModal from "./CategoriesModal/CategoriesModal";

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
    </div>
  );
}
