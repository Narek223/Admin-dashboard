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
import { paginate } from "../../Utils/pagination";



export default function Experts() {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const [error, setError] = useState(false);
  const [expert, setExpert] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [timeModalOpen, setTimeModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const onOpen = () => {
    setOpen(true);
    setError(false);
    setEdit(null);
  };

  const onClose = () => {
    setOpen(false);
    setError(false);
    setAnchorEl(null);
  };

  const handleAddExpert = (Expert, isEdit = false) => {
    if (isEdit) {
      setExpert((prev) =>
        prev.map((item) =>
          item.id === Expert.id
            ? { ...Expert, freeTime: item.freeTime || [] }
            : item
        )
      );
      setEdit(null);
    } else {
      setExpert((prev) => [
        ...prev,
        {
          ...Expert,
          id: Date.now(),
          freeTime: [],
        },
      ]);
    }
  };

  const handleEdit = () => {
    setAnchorEl(null);
    setOpen(true);
    setEdit(selectedService);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleCloseTimeModal = () => {
    setTimeModalOpen(false);
    
  };

  const handleInfoClick = (event, elem) => {
    setAnchorEl(event.currentTarget);
    setSelectedService(elem);
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleOpenTimeModal = () => {
    setTimeModalOpen(true);
  };

  const handleDeleteService = (id) => {
    setExpert(expert.filter((elem) => elem.id !== id));
    setAnchorEl(null);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (newPerPage) => {
    setItemsPerPage(newPerPage);
    setCurrentPage(0);
  };

   const paginationExperts = paginate(expert, currentPage, itemsPerPage);
 

  const onAddTime = (updatedTimeSlots) => {
    if (!selectedService) return ;
    setExpert((prevExperts) =>
      prevExperts.map((item) =>
        item.id === selectedService.id
          ? { ...item, freeTime: updatedTimeSlots }
          : item
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
        onTimeModal={handleOpenTimeModal}
      />

      <DeleteModal
        open={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        title="Delete Expert"
        text="Are you sure you want to delete this Expert? This action cannot be undone"
        onDelete={() => {
          if (selectedService) {
            handleDeleteService(selectedService.id);
          }
          handleCloseDeleteModal();
        }}
      />

      <TimePickerModal
        open={timeModalOpen}
        onClose={handleCloseTimeModal}
        onAddtime={onAddTime}
        initialFreeTime={
          selectedService
            ? expert.find((item) => item.id === selectedService.id)?.freeTime ||
              []
            : []
        }
        edit={edit}
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

                  <div className={styles.freetime} key={elem.id}>
                    <p>Free time:</p>
                    {(!elem.freeTime || elem.freeTime.length === 0) && (
                      <span>No free time yet</span>
                    )}
                    {elem.freeTime.map((slot, index) => (
                      <div key={elem.id}>{slot.times.join(", ")}</div>
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
