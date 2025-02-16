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
import Pagination from "@mui/material/Pagination";
import PaginationComponent from "../../SheredComponents/Pagination/PaginationComponent";

export default function Service() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [categoryAnchorEl, setCategoryAnchorEl] = useState(null);
  const [servicesAnchorEl, setServicesAnchorEl] = useState(null);

  const openCategoryMenu = Boolean(categoryAnchorEl);
  const openServicesMenu = Boolean(servicesAnchorEl);

  const [categoryValue, setcategoryValue] = useState("All");
  const [serviceValue, setserviceValue] = useState("All Services");
  const open = Boolean(anchorEl);
  const [icon, seticon] = useState(true);
  const [serviceicon, setserviceicon] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [servicesList, setServicesList] = useState([]);
  const [edit, setedit] = useState();

  const handleCloseModal = () => setIsModalOpen(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);

    setedit(null);
  };

  const handleClosetwo = (id) => {
    setAnchorEl(null);
    setIsModalOpen(true);

    setedit(id);
  };

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleDeleteService = (id) => {
    setServicesList(servicesList.filter((elem) => elem.id !== id));
    setAnchorEl(null);
  };

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
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
  };

  const infoclose = () => {
    setAnchorEl(null);
  };

  const filterCategory =
    categoryValue === "All"
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
    <div className={styles.servicesConteiner}>
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
              Category{" "}
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
              {["All", "Classic", "Modern"].map((category) => (
                <MenuItem key={category} onClick={() => handleSelect(category)}>
                  {category}
                </MenuItem>
              ))}
            </Menu>
            <button onClick={handleServicesClick}>
              {serviceValue}
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
              edit={edit}
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
              <p>Description</p>
            </div>

            <div className={styles.serviceboxtwo}>
              <p>Price</p>
              <p>Duration</p>
            </div>
          </div>

          {paginatedServices.length > 0 &&
            paginatedServices.map((elem, index) => (
              <div key={elem.id} className={styles.addServicesTwo}>
                <div className={styles.servicesNames}>
                  <div className={styles.servicebox}>
                    <p>{elem.id}</p>
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
                    onClick={handleClick}
                    aria-haspopup="true"
                    aria-expanded={false}
                  >
                    <AiOutlineMore />
                  </p>
                  <Menu
                    id="info-btn"
                    className={styles.editandelete}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={infoclose}
                    sx={{
                      "& .MuiPaper-root": {
                        width: "148px",
                        backgroundColor: "rgba(248, 249, 250, 1)",
                        borderRadius: "8px",
                        padding: 0,
                        boxShadow: "none",
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
                    <MenuItem onClick={() => handleClosetwo(elem)}>
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
      <PaginationComponent
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={filterServices.length}
        onPageChange={handlePageChange}
        onItemsPerPageChange={handleItemsPerPageChange}
      />
    </div>
  );
}
