import { format } from "date-fns";
import styles from "./customEvent.module.scss";
import "./newcss.css";
import { AiOutlineMore } from "react-icons/ai";
import EditDeleteBtn from "../../../SheredComponents/EditDeleteBtn/EditDeleteBtn";
import { useDispatch, useSelector } from "react-redux";
import { handleClick, handleClose, handleEdit, handleDelete } from "../../../Redax/Slices/Availability/EventSlice";

const statusColors = {
  Booked: "#F9F0F0",
  Available: "#FFF9EE",
  "Not Confirm": "#EEF9EE",
  Default: "#f5f5f5",
};

const CustomEvent = ({ event, handleEditGlobal, handleDeleteGlobal }) => {
  const dispatch = useDispatch();
  const anchorEl = useSelector((state) => state.eventSlice.anchorEl);

  const getBackgroundColor = () => {
    return statusColors[event.status] || statusColors.Default;
  };

  const handleMenuClick = (e) => {
    dispatch(handleClick(e.currentTarget));
  };

  const handleMenuClose = () => {
    dispatch(handleClose());
  };

  const handleEditEvent = () => {
    dispatch(handleEdit(event));
    if (handleEditGlobal) handleEditGlobal(event);
  };

  const handleDeleteEvent = () => {
    dispatch(handleDelete(event));
    if (handleDeleteGlobal) handleDeleteGlobal(event);
  };

  return (
    <div
      className={styles.eventContainer}
      style={{ backgroundColor: getBackgroundColor() }}
    >
      <EditDeleteBtn
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        handleEdit={handleEditEvent}
        onClick={handleDeleteEvent}
      />
      <div className={styles.eventTitle}>
        <p>{event.title}</p>
        <button className={styles.infobtn} onClick={handleMenuClick}>
          <AiOutlineMore />
        </button>
      </div>
      <div className={styles.eventTime}>
        {format(event.start, "HH:mm")} - {format(event.end, "HH:mm")}
      </div>
    </div>
  );
};

export default CustomEvent;