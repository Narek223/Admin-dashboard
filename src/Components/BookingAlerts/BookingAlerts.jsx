import React,{useState} from "react";
import Header from "../Header/Header";
import BookingModal from "./BookingModal/BookingModal";


export default function BookingAlerts() {
 const [open,setopen]=useState(false)

const openmodal=()=>{
  setopen(true);
}
const handleClose = () => {
  setopen(false);

};

  return (
    <div>
      <Header handleOpen={openmodal} />
      <BookingModal open={open} handleClose={handleClose} />
    </div>
  );
}
