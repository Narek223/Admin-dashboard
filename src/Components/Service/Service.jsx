import React, { useEffect, useState } from "react";
import styles from "./service.module.scss";
import { MdOutlineAdd } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";
import Servicemodal from "./ServiceModal/Servicemodal";
import { AiOutlineMore } from "react-icons/ai";
import { FaAngleUp } from "react-icons/fa6";
import { GrEdit } from "react-icons/gr";
import { FaRegTrashAlt } from "react-icons/fa";
import { menuStyles } from "../../Services/data/addServices/serviceStyles";
import { Menu, MenuItem } from "@mui/material";

export default function Service() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [categoryAnchorEl, setCategoryAnchorEl] = useState(null);
  const [servicesAnchorEl, setServicesAnchorEl] = useState(null);

  // const open = Boolean(anchorEl);
  const openCategoryMenu = Boolean(categoryAnchorEl);
  const openServicesMenu = Boolean(servicesAnchorEl);
  
  const [icon, seticon] = useState(true);
  const [serviceicon, setserviceicon] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [servicesList, setServicesList] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleClosetwo = () => {
    setAnchorEl(null);
  };

  const handleDeleteService = (id) => {
    setServicesList(servicesList.filter((elem) => elem.id !== id));

    setAnchorEl(null);
  };

  
  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedServiceId(id);
  };

  const handleAddService = (newService) => {
    setServicesList((prevServices) => [...prevServices, newService]);
  };

  const handleClose = () => {
    setCategoryAnchorEl(null);
    setServicesAnchorEl(null);
    seticon(true);
    setserviceicon(true);
  };

  const infoclose = () => {
    setAnchorEl(null);
    setSelectedServiceId(null);
  };

  const handleSelect = (value) => {
    handleClose();
  };

  const handleCategoryClick = (event) => {
    setCategoryAnchorEl(event.currentTarget);
    setServicesList(
      servicesList.filter((elem, id) => elem.category !== event.target.value)
    );

    seticon(false);
  };

  const handleServicesClick = (event) => {
    setServicesAnchorEl(event.currentTarget);
    setserviceicon(false);
  };

  return (
    <div className={styles.servicesConteiner}>
      <div className={styles.filter}>
        <h1>Services</h1>
        <div className={styles.buttonBox}>
          <button
            onClick={handleCategoryClick}
            variant="contained"
            id="basic-button"
            aria-haspopup="true"
            aria-expanded={false}
          >
            Category
            {icon == true ? (
              <FaAngleDown className={styles.icon} />
            ) : (
              <FaAngleUp className={styles.icon} />
            )}
          </button>
          <Menu
            sx={{
              "& .MuiPaper-root": {
                backgroundColor: "rgba(248, 249, 250, 1)",
                borderRadius: "8px",
                padding: 0,
                width:
                  openCategoryMenu && categoryAnchorEl
                    ? `${categoryAnchorEl.offsetWidth}px`
                    : "auto",
                minWidth: 100,
              },
              "& .MuiMenuItem-root:hover": {
                backgroundColor: "white",
              },
            }}
            id="basic-menu"
            className={styles.manu}
            anchorEl={categoryAnchorEl}
            open={openCategoryMenu}
            onClose={handleClose}
          >
            {["Classic", "Modern"].map((category) => (
              <MenuItem key={category} onClick={() => handleSelect(category)}>
                {category}
              </MenuItem>
            ))}
          </Menu>
          <button onClick={handleServicesClick}>
            All Services{" "}
            {serviceicon == true ? (
              <FaAngleDown className={styles.icon} />
            ) : (
              <FaAngleUp className={styles.icon} />
            )}
          </button>
          <Menu
            anchorEl={servicesAnchorEl}
            open={openServicesMenu}
            onClose={handleClose}
            sx={{
              "& .MuiPaper-root": {
                backgroundColor: "rgba(248, 249, 250, 1)",
                borderRadius: "8px",
                padding: 0,
                width:
                  openServicesMenu && servicesAnchorEl
                    ? `${servicesAnchorEl.offsetWidth}px`
                    : "auto",
                minWidth: 100,
              },
              "& .MuiMenuItem-root:hover": {
                backgroundColor: "white",
              },
            }}
          >
            {["Hair Care", "Wedding Hairstyle", "Gunung Sumbing"].map(
              (service) => (
                <MenuItem key={service} onClick={() => handleSelect(service)}>
                  {service}
                </MenuItem>
              )
            )}
          </Menu>
          <button onClick={handleOpenModal}>
            <MdOutlineAdd className={styles.icon} /> Add Service
          </button>
        </div>
      </div>

      <Servicemodal
        open={isModalOpen}
        onClose={handleCloseModal}
        onAddService={handleAddService}
      />

      <div className={styles.addServices}>
        <div className={styles.servicesNames}>
          <div className={styles.servicebox}>
            <p>N</p>
            <p>Image</p>
            <p>Service Name</p>
            <p>Category</p>
            <p>Description</p>
          </div>

          <div className={styles.serviceboxtwo}>
            <p>Price</p>
            <p>Duration</p>
          </div>
        </div>

        {servicesList.length > 0 &&
          servicesList.map((elem) => (
            <div key={elem.id} className={styles.addServicesTwo}>
              <div className={styles.servicesNames}>
                <div className={styles.servicebox}>
                  <p></p>
                  <img src={elem.files} alt="Service" />
                  <p>{elem.service}</p>
                  <p>{elem.category}</p>
                  <p>{elem.description}</p>
                </div>
                <div className={styles.serviceboxtwo}>
                  <p>{elem.price}</p>
                  <p>{elem.duration}</p>
                </div>
                <p
                  id="info-btn"
                  className={styles.infobtn}
                  onClick={(event) => handleClick(event, elem.id)}
                  aria-haspopup="true"
                  aria-expanded={selectedServiceId === elem.id}
                >
                  <AiOutlineMore />
                </p>
                <Menu
                  id="info-btn"
                  className={styles.editandelete}
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && selectedServiceId === elem.id}
                  onClose={infoclose}
                  sx={{
                    "& .MuiPaper-root": {
                      width: "148px",
                      backgroundColor: "rgba(248, 249, 250, 1)",
                      borderRadius: "8px",
                      padding: 0,
                    },
                    "&.MuiSvgIcon-root": {
                      margin: "0 12px 0 0",
                    },
                    "& .MuiMenuItem-root:nth-child(2)": {
                      color: "red",
                    },
                    "& .MuiMenuItem-root:hover": {
                      backgroundColor: "white",
                    },
                  }}
                >
                  <MenuItem onClick={handleClosetwo}>
                    <GrEdit
                      className={styles.newicon}
                      style={{ marginRight: "12px" }}
                    />{" "}
                    Edit
                  </MenuItem>
                  <MenuItem onClick={() => handleDeleteService(elem.id)}>
                    <FaRegTrashAlt
                      className={styles.newicon}
                      style={{ marginRight: "12px" }}
                    />{" "}
                    Delete
                  </MenuItem>
                </Menu>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
