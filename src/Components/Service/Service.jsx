import React, { useState } from "react";
import styles from "./service.module.scss";
import { MdOutlineAdd } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";
import Servicemodal from "./ServiceModal/Servicemodal";
import { AiOutlineMore } from "react-icons/ai";
import { FaAngleUp } from "react-icons/fa6";
import { GrEdit } from "react-icons/gr";
import { FaRegTrashAlt } from "react-icons/fa";
import { Menu, MenuItem } from "@mui/material";
import { AiOutlineFieldNumber } from "react-icons/ai";
import PaginationComponent from "../../SheredComponents/Pagination/PaginationComponent";
import Header from "../Header/Header";

export default function Service() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [categoryAnchorEl, setCategoryAnchorEl] = useState(null);
  const [servicesAnchorEl, setServicesAnchorEl] = useState(null);

  const openCategoryMenu = Boolean(categoryAnchorEl);
  const openServicesMenu = Boolean(servicesAnchorEl);

  const [categoryValue, setcategoryValue] = useState("All Categories");
  const [serviceValue, setserviceValue] = useState("All Services");
  const [icon, seticon] = useState(true);
  const [serviceicon, setserviceicon] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [servicesList, setServicesList] = useState([]);
  const [edit, setedit] = useState(null);
  const [error, setError] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleCloseModal = () => {
    setError(false)
    setIsModalOpen(false)
  
    setError(false)
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
    setedit(null);
    setError(false)
  };

  const handleInfoClick = (event, elem) => {
    setAnchorEl(event.currentTarget);
    setSelectedService(elem);
  };

  const handleEdit = () => {
    setAnchorEl(null);
    setIsModalOpen(true);
    setedit(selectedService);
  };

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleDeleteService = (id) => {
    setServicesList(servicesList.filter((elem) => elem.id !== id));
    setAnchorEl(null);
  };

  const handleAddService = (newService, isEdit = false) => {
    if (isEdit) {
      setServicesList((prev) =>
        prev.map((item) => (item.id === newService.id ? newService : item))
      );
      setedit(null);
    } else {
      setServicesList((prev) => [
        ...prev,
        { ...newService, id: prev.length + 1 },
      ]);
    }
  };

  const handleClose = () => {
    setCategoryAnchorEl(null);
    setServicesAnchorEl(null);
    seticon(true);
    setserviceicon(true);
    setError(false)

  };

  const infoclose = () => {
    setAnchorEl(null);
  };

  const filterCategory =
    categoryValue === "All Categories"
      ? servicesList
      : servicesList.filter((elem) => elem.category === categoryValue);

  const filterServices =
    serviceValue === "All Services"
      ? filterCategory
      : filterCategory.filter((elem) => elem.service === serviceValue);

  const handleSelect = (value) => {
    setcategoryValue(value);
    handleClose();
  };

  const handleServiceSelect = (value) => {
    setserviceValue(value);
    handleClose();
  };

  const handleCategoryClick = (event) => {
    setCategoryAnchorEl(event.currentTarget);
    seticon(false);
  };

  const handleServicesClick = (event) => {
    setServicesAnchorEl(event.currentTarget);
    setserviceicon(false);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleItemsPerPageChange = (newPerPage) => {
    setItemsPerPage(newPerPage);
    setCurrentPage(0);
  };

  const paginatedServices = filterServices.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div>
   <Header/>

    <div className={styles.servicesConteiner}>
      <div className={styles.Wrapper}>

      
   <div className={styles.serviceWrapper}>

<div className={styles.test}>
  

      <div className={styles.service}>
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
              {categoryValue}
              {icon ? (
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
              {["All Categories", "Classic", "Modern"].map((category) => (
                <MenuItem
                  key={category}
                  style={{
                    backgroundColor:
                      category === categoryValue
                        ? "rgba(25, 118, 210, 0.08)"
                        : "",
                  }}
                  onClick={() => handleSelect(category)}
                >
                  {category}
                </MenuItem>
              ))}
            </Menu>
            <button onClick={handleServicesClick}>
              {serviceValue}
              {serviceicon ? (
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
              {[
                "All Services",
                "Hair Care",
                "Wedding Hairstyle",
                "Gunung Sumbing",
              ].map((service) => (
                <MenuItem
                  key={service}
                  style={{
                    backgroundColor:
                      service === serviceValue
                        ? "rgba(25, 118, 210, 0.08)"
                        : "",
                  }}
                  onClick={() => handleServiceSelect(service)}
                >
                  {service}
                </MenuItem>
              ))}
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
          edit={edit}
          seterror={setError}
          error={error}
        />

        <div className={styles.addServices}>
          <div className={styles.servicesNames}>
            <div className={styles.servicebox}>
              <p>
                <AiOutlineFieldNumber />
              </p>
              <p>Image</p>
              <p>Service Name</p>
              <p>Category</p>
              <p className={styles.description}>Description</p>
              <p>Price</p>
              <p>Duration</p>
            </div>
          </div>

          {paginatedServices.length > 0 &&
            paginatedServices.map((elem) => (
              <div key={elem.id} className={styles.addServicesTwo}>
                <div className={styles.servicesNames}>
                  <div className={styles.servicebox}>
                    <p>{elem.id}</p>
                    <div className={styles.img}>
                      <img src={elem.files} alt="Service" />
                    </div>
                    <p>{elem.service}</p>
                    <p>{elem.category}</p>
                    <p>{elem.description}</p>
                    <p>{elem.price}</p>
                    <p>{elem.duration}</p>
                  </div>
                  <button
                    id="info-btn"
                    className={styles.infobtn}
                    onClick={(event) => handleInfoClick(event, elem)}
                    aria-haspopup="true"
                    aria-expanded={false}
                  >
                    <AiOutlineMore />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
</div>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={infoclose}
        sx={{
          "& .MuiPaper-root": {
            width: "148px",
            backgroundColor: "rgba(248, 249, 250, 1)",
            borderRadius: "8px",
            padding: 0,
            boxShadow: "none",
          },
          "& .MuiMenuItem-root:hover": {
            backgroundColor: "white",
          },
          "& .MuiMenuItem-root:nth-child(2)": {
            color: "red",
          },
        }}
      >
        <MenuItem onClick={handleEdit}>
          <GrEdit className={styles.newicon} style={{ marginRight: "12px" }} />
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            if (selectedService) {
              handleDeleteService(selectedService.id);
            }
          }}
        >
          <FaRegTrashAlt
            className={styles.newicon}
            style={{ marginRight: "12px" }}
          />
          Delete
        </MenuItem>
      </Menu>

      <PaginationComponent
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={filterServices.length}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
    </div>
    </div>
    </div>
  );
}
