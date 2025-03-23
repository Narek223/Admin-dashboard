import React, { useState } from "react";
import Header from "../Header/Header";
import ExpertsModal from "./ExpertsModal/ExpertsModal";
import styles from "./experts.module.scss";
import { AiOutlineMore } from "react-icons/ai";
import DeleteModal from "../../SheredComponents/DeleteModal/DeleteModal";
import EditDeleteBtn from "../../SheredComponents/EditDeleteBtn/EditDeleteBtn";
import TimePickerModal from "./TimePicker/TimePickerModal";
import NoAvatar from "../../assets/NoAvatart/download.png";
import PaginationComponent from "../../SheredComponents/Pagination/PaginationComponent";
import dayjs from "dayjs";
export default function Experts() {
  const [open, setopen] = useState(false);
  const [edit, setedit] = useState(null);
  const [error, setError] = useState(false);
  const [expert, setexpert] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [timeModalOpen, setimeModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
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
      setexpert((prev) => [
        ...prev,
        { ...Expert, id: prev.length + 1, freeTime: [] },
      ]);
    }
  };

  const handleEdit = () => {
    setAnchorEl(null);
    setopen(true);
    setedit(selectedService);
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

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (newPerPage) => {
    setItemsPerPage(newPerPage);
    setCurrentPage(0);
  };

  const paginationExperts = expert.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const onAddtime = (updatedTimeSlots) => {
    if (!selectedService) return;
    setexpert((prevExperts) =>
      prevExperts.map((expert) =>
        expert.id === selectedService.id
          ? { ...expert, freeTime: updatedTimeSlots }
          : expert
      )
    );
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
        onClose={() => setAnchorEl(null)}
        handleEdit={handleEdit}
        onClick={handleOpenDeleteModal}
        onTimeModal={handleOpentimeModal}
      />
      <DeleteModal
        open={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        title="Delete Expert"
        text="Are you sure you want to delete this Expert? This action cannot be undone"
        onDelete={() => {
          handleDeleteService(selectedService.id);
          handleCloseDeleteModal();
        }}
      />
      <TimePickerModal
        open={timeModalOpen}
        onClose={handleCloseTimeModal}
        onAddtime={onAddtime}
        initialFreeTime={selectedService?.freeTime || []}
      />

      <div className={styles.cont}>
        <div className={styles.ExpertCard}>
          <div className={styles.ExpertWrapper}>
            {paginationExperts.map((elem) => (
              <div key={elem.id} className={styles.expert}>
                <div>
                  <div className={styles.expertwrapper}>
                    <div className={styles.information}>
                      <img
                        src={elem.files ? elem.files : NoAvatar}
                        alt="Expert Avatar"
                      />
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
                    {Array.isArray(elem.freeTime) &&
                      elem.freeTime
                        .find(
                          (slot) => slot.date === dayjs().format("YYYY-MM-DD")
                        )
                        ?.times.map((time, index) => (
                          <div key={index}>
                            <span>{time}</span>
                          </div>
                        ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <PaginationComponent
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={expert.length}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
    </div>
  );
}
