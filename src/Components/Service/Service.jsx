import React, { useState } from "react";
import styles from "./service.module.scss";
import { MdOutlineAdd } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";
import Servicemodal from "./ServiceModal/Servicemodal";
import { AiOutlineMore } from "react-icons/ai";
import { FaAngleUp } from "react-icons/fa6";
import { Menu, MenuItem } from "@mui/material";
import { AiOutlineFieldNumber } from "react-icons/ai";
import PaginationComponent from "../../SheredComponents/Pagination/PaginationComponent";
import Header from "../Header/Header";
import EditDeleteBtn from "../../SheredComponents/EditDeleteBtn/EditDeleteBtn";
import DeleteModal from "../../SheredComponents/DeleteModal/DeleteModal";
import NoAvatar from "../../assets/NoAvatart/download.png";
import { VscDebugRestart } from "react-icons/vsc";
import { manageItems } from "../../Utils/EditFunction";
import { paginate } from "../../Utils/pagination";


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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleCloseModal = () => {
    setError(false);
    setIsModalOpen(false);
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
    setedit(null);
    setError(false);
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

  const handleDeleteService = (id) => {
    setServicesList(servicesList.filter((elem) => elem.id !== id));
    setAnchorEl(null);
  };

  const handleAddService = (newService, isEdit = false) => {
    setServicesList((prev) => manageItems(prev, newService, isEdit));
  };

  const handleClose = () => {
    setCategoryAnchorEl(null);
    setServicesAnchorEl(null);
    seticon(true);
    setserviceicon(true);
    setError(false);
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

  const paginatedServices = paginate(filterServices, currentPage, itemsPerPage);

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const restarTwo = () => {
    setcategoryValue("All Categories");
    setserviceValue("All Services");
  };
  return (
    <div>
      <Header />
      <DeleteModal
        open={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        title="Delete Service"
        text="Are you sure you want to delete this Service?This action cannot be undone"
        onDelete={() => {
          handleDeleteService(selectedService.id);
          handleCloseDeleteModal();
        }}
      />
      <div className={styles.servicesConteiner}>
        <div className={styles.Wrapper}>
          <div className={styles.serviceWrapper}>
            <div className={styles.test}>
              <div className={styles.service}>
                <div className={styles.filter}>
                  <h1>Services</h1>
                  <div className={styles.buttonBox}>
                    <button
                      className={styles.restart}
                      onClick={() => restarTwo()}
                    >
                      <VscDebugRestart />
                    </button>
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
                          margin: "4px 0",
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
                      {["All Categories", "Classic", "Modern"].map(
                        (category) => (
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
                        )
                      )}
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
                          margin: "4px 0",
                          width:
                            openServicesMenu && servicesAnchorEl
                              ? `${servicesAnchorEl.offsetWidth}px`
                              : "auto",
                        },
                        "& .MuiMenuItem-root:hover": {
                          backgroundColor: "white",
                        },
                      }}
                    >
                      {[
                        "All Services",
                        ...new Set(servicesList.map((s) => s.service)),
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
                              <img
                                src={elem.files ? elem.files : NoAvatar}
                                alt="Service"
                              />
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
            <EditDeleteBtn
              anchorEl={anchorEl}
              onClose={infoclose}
              handleEdit={handleEdit}
              onClick={handleOpenDeleteModal}
            />
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
