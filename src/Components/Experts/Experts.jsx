import React, { useState } from "react";
import Header from "../Header/Header";
import ExpertsModal from "./ExpertsModal/ExpertsModal";
import styles from "./experts.module.scss";

export default function Experts() {
  let [open, setopen] = useState(false);
  const [edit, setedit] = useState(null);
  const [error, setError] = useState(false);
const [expert,setexpert]=useState([])
  const onOpen = () => {
    setopen(true);
    setError(false);
  };

  const onClose = () => {
    setopen(false);
    setError(false);
  };

 const handleAddExpert = (Expert, isEdit = false) => {
  setexpert(Expert)
};
  return (
    <div>
      <Header handleOpen={onOpen} />
    <ExpertsModal open={open} handleClose={onClose}    onAddExpert={handleAddExpert} error={error} seterror={setError} edit={edit}/>
    </div>
  );
}
