import { format } from "date-fns";
import styles from "./customEvent.module.scss";
import "./newcss.css";
import { AiOutlineMore } from "react-icons/ai";
import EditDeleteBtn from "../../../SheredComponents/EditDeleteBtn/EditDeleteBtn";
import { useState } from "react";

const statusColors = {
  Booked: "#F9F0F0",
  Available: "#FFF9EE",
  "Not Confirm": "#EEF9EE",
  Default: "#f5f5f5",
};

const CustomEvent = ({ event, handleEditGlobal, handleDeleteGlobal }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const getBackgroundColor = () => {
    return statusColors[event.status] || statusColors.Default;
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleEditGlobal(event); 
    setAnchorEl(null);
  };

  const handleDelete = () => {
    handleDeleteGlobal(event);
    setAnchorEl(null);
  };

  return (
    <div
      className={styles.eventContainer}
      style={{ backgroundColor: getBackgroundColor() }}
    >
       <EditDeleteBtn
          anchorEl={anchorEl}
          onClose={handleClose}
          handleEdit={handleEdit}
          onClick={handleDelete}
        />
      <div className={styles.eventTitle}>
        <p>{event.title}</p>
        <button className={styles.infobtn} onClick={handleClick}>
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
