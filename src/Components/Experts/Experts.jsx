import React from "react";
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
import * as ExpertSlice from "../../Redax/Slices/Experts/ExpertsSlice";
import { useSelector, useDispatch } from "react-redux";

export default function Experts() {
  const dispatch = useDispatch();
  const {
    open,
    edit,
    error,
    expert,
    anchorEl,
    selectedService,
    isDeleteModalOpen,
    timeModalOpen,
    currentPage,
    itemsPerPage,
  } = useSelector((state) => state.expert);

  const paginationExperts = paginate(expert, currentPage, itemsPerPage);

  const handleAddExpert = (newExpert, isEdit = false) => {
    if (isEdit) {
      dispatch(ExpertSlice.editExpert(newExpert));
    } else {
      dispatch(ExpertSlice.addExpert(newExpert));
    }
  };

  
  const onAddTime = (updatedTimeSlots) => {
    if (!selectedService) return;
    dispatch(ExpertSlice.updateExpertTime({ id: selectedService.id, updatedTimeSlots }));
  };

  return (
    <div className={styles.expertConteiner}>
      <Header handleOpen={() => dispatch(ExpertSlice.onOpen())} />

      <ExpertsModal
        open={open}
        handleClose={() => dispatch(ExpertSlice.onClose())}
        onAddExpert={handleAddExpert}
        error={error}
        seterror={(error) => dispatch(ExpertSlice.setError(error))}
        edit={edit}
      />

      <EditDeleteBtn
        anchorEl={anchorEl}
        onClose={() => dispatch(ExpertSlice.onClose())}
        handleEdit={() => dispatch(ExpertSlice.handleEdit())}
        onClick={() => dispatch(ExpertSlice.handleOpenDeleteModal())}
        onTimeModal={() => dispatch(ExpertSlice.handleOpenTimeModal())}
      />

      <DeleteModal
        open={isDeleteModalOpen}
        onClose={() => dispatch(ExpertSlice.handleCloseDeleteModal())}
        title="Delete Expert"
        text="Are you sure you want to delete this Expert? This action cannot be undone"
        onDelete={() => {
          if (selectedService) {
            dispatch(ExpertSlice.handleDeleteService(selectedService.id));
          }
          dispatch(ExpertSlice.handleCloseDeleteModal());
        }}
      />

      <TimePickerModal
        open={timeModalOpen}
        onClose={() => dispatch(ExpertSlice.handleCloseTimeModal())}
        onAddtime={onAddTime}
        initialFreeTime={
          selectedService
            ? expert.find((item) => item.id === selectedService.id)?.freeTime || []
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
                      onClick={(event) => dispatch(ExpertSlice.handleInfoClick({event, elem}))}
                    >
                      <AiOutlineMore className={styles.icon} />
                    </button>
                  </div>
                  <hr />
                  <div className={styles.freetime}>
                    <p>Free time:</p>
                    {(!elem.freeTime || elem.freeTime.length === 0) && (
                      <span>No free time yet</span>
                    )}
                    {elem.freeTime.map((slot) => (
                      <div key={slot.date}>{slot.times.join(", ")}</div>
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
          onPageChange={(page) => dispatch(ExpertSlice.handlePageChange(page))}
          onItemsPerPageChange={(count) =>
            dispatch(ExpertSlice.handleItemsPerPageChange(count))
          }
        />
      </div>
    </div>
  );
}
