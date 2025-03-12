import React, { useState } from "react";
import Header from "../Header/Header";
import ExpertsModal from "./ExpertsModal/ExpertsModal";
import styles from "./experts.module.scss";
import { AiOutlineMore } from "react-icons/ai";
import DeleteModal from "../../SheredComponents/DeleteModal/DeleteModal";
import EditDeleteBtn from "../../SheredComponents/EditDeleteBtn/EditDeleteBtn";
import TimePickerModal from "./TimePicker/TimePickerModal";


export default function Experts() {
  let [open, setopen] = useState(false);
  const [edit, setedit] = useState(null);
  const [error, setError] = useState(false);
  const [expert, setexpert] = useState([]);
  const [id, setId] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [timeModalOpen, setimeModalOpen] = useState(false);

  const onOpen = () => {
    setopen(true);
    setError(false);
    setedit(null);
  };

  const onClose = () => {
    setopen(false);
    setError(false);
    setAnchorEl(null);
  };

  const handleAddExpert = (Expert, isEdit = false) => {
    if (isEdit) {
      setexpert((prev) =>
        prev.map((item) => (item.id === Expert.id ? Expert : item))
      );
      setedit(null);
    } else {
      setexpert((prev) => [...prev, { ...Expert, id: prev.length + 1 }]);
    }
  };

  const handleEdit = () => {
    setAnchorEl(null);
    setopen(true);
    setedit(selectedService);
  };

  let serviceinfo = () => {
    setAnchorEl(null);
  };
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  const handleCloseTimeModal = () => {
    setimeModalOpen(false);
  };
  const handleInfoClick = (event, elem) => {
    setAnchorEl(event.currentTarget);
    setSelectedService(elem);
  };
  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
  const handleOpentimeModal = () => {
    setimeModalOpen(true);
  };
  const handleDeleteService = (id) => {
    setexpert(expert.filter((elem) => elem.id !== id));
    setAnchorEl(null);
  };

  return (
    <div className={styles.expertConteiner}>
      <Header handleOpen={onOpen} />
      <ExpertsModal
        open={open}
        handleClose={onClose}
        onAddExpert={handleAddExpert}
        error={error}
        seterror={setError}
        edit={edit}
      />
      <EditDeleteBtn
        anchorEl={anchorEl}
        onClose={serviceinfo}
        handleEdit={handleEdit}
        onClick={() => {
          handleOpenDeleteModal();
        }}
        onTimeModal={()=>{
          handleOpentimeModal()
         }}
      />
       <DeleteModal
       open={isDeleteModalOpen}
       onClose={handleCloseDeleteModal}
       title="Delete Expert"
       text="Are you sure you want to delete this Expert?This action cannot be undone"
       onDelete={() => {
        handleDeleteService(selectedService.id); 
        handleCloseDeleteModal(); 
      }}/>
      <TimePickerModal
         open={timeModalOpen}
         onClose={handleCloseTimeModal}
        
      />
      <div className={styles.cont}>
        <div className={styles.ExpertCard}>
          <div className={styles.ExpertWrapper}>
            {expert.map((elem, id) => (
              <div key={id} className={styles.expert}>
                <div>
                  <div className={styles.expertwrapper}>
                    <div className={styles.information}>
                      <img src={elem.files} />
                      <div className={styles.specialistInfo}>
                        <h1>{elem.name}</h1>
                        <p>{elem.specialist}</p>
                      </div>
                    </div>

                    <button
                      className={styles.infobtn}
                      aria-haspopup="true"
                      aria-expanded={false}
                      onClick={(event) => handleInfoClick(event, elem)}
                    >
                      <AiOutlineMore className={styles.icon} />
                    </button>
                  </div>
                  <hr />

                  <div className={styles.freetime}>
                    <p> Free time today </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
