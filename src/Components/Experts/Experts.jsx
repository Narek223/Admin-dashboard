import React, { useState } from "react";
import Header from "../Header/Header";
import ExpertsModal from "./ExpertsModal/ExpertsModal";
import styles from "./experts.module.scss";

export default function Experts() {
  let [open, setopen] = useState(false);
  const [error, setError] = useState(false);

  const onOpen = () => {
    setopen(true);
  };

  const onClose = () => {
    setopen(false);
  };

  return (
    <div>
      <Header handleOpen={onOpen} />
      <ExpertsModal open={open} handleClose={onClose} error={error} />
    </div>
  );
}
