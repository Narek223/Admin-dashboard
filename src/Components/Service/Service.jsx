import React from "react";
import styles from "./service.module.scss";
import { MdOutlineAdd } from "react-icons/md";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Servicemodal from "./ServiceModal/Servicemodal";
import { AiOutlineMore, AiOutlineFieldNumber } from "react-icons/ai";
import PaginationComponent from "../../SheredComponents/Pagination/PaginationComponent";
import Header from "../Header/Header";
import EditDeleteBtn from "../../SheredComponents/EditDeleteBtn/EditDeleteBtn";
import DeleteModal from "../../SheredComponents/DeleteModal/DeleteModal";
import NoAvatar from "../../assets/NoAvatart/download.png";
import { VscDebugRestart } from "react-icons/vsc";
import { Menu, MenuItem } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import * as serviceActions from "../../Redax/Slices/Service/ServiceSlice";
import { paginate } from "../../Utils/pagination";

export default function Service() {
  const dispatch = useDispatch();
  const {
    anchorEl,
    categoryAnchorEl,
    servicesAnchorEl,
    categoryValue,
    serviceValue,
    icon,
    serviceicon,
    isModalOpen,
    servicesList,
    edit,
    error,
    selectedService,
    isDeleteModalOpen,
    currentPage,
    itemsPerPage,
  } = useSelector((state) => state.service);
  const { categorieslist } = useSelector((state) => state.categories);
  const openCategoryMenu = Boolean(categoryAnchorEl);
  const openServicesMenu = Boolean(servicesAnchorEl);

  const filterCategory =
    categoryValue === "All Categories"
      ? servicesList
      : servicesList.filter((elem) => elem.category === categoryValue);

  const filterServices =
    serviceValue === "All Services"
      ? filterCategory
      : filterCategory.filter((elem) => elem.service === serviceValue);

  const paginatedServices = paginate(filterServices, currentPage, itemsPerPage);

  return (
    <div>
      <Header />
      <DeleteModal
        open={isDeleteModalOpen}
        onClose={() => dispatch(serviceActions.handleCloseDeleteModal())}
        title="Delete Service"
        text="Are you sure you want to delete this Service? This action cannot be undone"
        onDelete={() => {
          dispatch(serviceActions.handleDeleteService(selectedService.id));
          dispatch(serviceActions.handleCloseDeleteModal());
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
                      onClick={() => dispatch(serviceActions.restarTwo())}
                    >
                      <VscDebugRestart />
                    </button>
                    <button
                      onClick={(e) => dispatch(serviceActions.handleCategoryClick(e))}
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
                          maxHeight: 150,
                              overflowY: "auto",
                           
 
                        },
                        "& .MuiMenuItem-root:hover": {
                          backgroundColor: "white",
                        },
                      }}
                      id="basic-menu"
                      className={styles.manu}
                      anchorEl={categoryAnchorEl}
                      open={openCategoryMenu}
                      onClose={() => dispatch(serviceActions.handleClose())}
                    >
                      {["All Categories", ...new Set(categorieslist.map((s) => s.name))].map(
                        (category) => (
                          <MenuItem
                            key={category}
                            style={{
                              backgroundColor:
                                category === categoryValue
                                  ? "rgba(25, 118, 210, 0.08)"
                                  : "",
                            }}
                            onClick={() => dispatch(serviceActions.handleSelect(category))}
                          >
                            {category}
                          </MenuItem>
                        )
                      )}
                    </Menu>
                    <button onClick={(e) => dispatch(serviceActions.handleServicesClick(e))}>
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
                      onClose={() => dispatch(serviceActions.handleClose())}
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
                                 maxHeight: 150,
                              overflowY: "auto",
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
                          onClick={() => dispatch(serviceActions.handleServiceSelect(service))}
                        >
                          {service}
                        </MenuItem>
                      ))}
                    </Menu>
                    <button onClick={() => dispatch(serviceActions.handleOpenModal())}>
                      <MdOutlineAdd className={styles.icon} /> Add Service
                    </button>
                  </div>
                </div>
                <Servicemodal
                  open={isModalOpen}
                  onClose={() => dispatch(serviceActions.handleCloseModal())}
                  onAddService={(newService, isEdit) =>
                    dispatch(serviceActions.handleAddService({ newService, isEdit }))
                  }
                  edit={edit}
                  seterror={(val) => dispatch(serviceActions.setError(val))}
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
                            onClick={(event) =>
                              dispatch(
                                serviceActions.handleInfoClick({ event, elem })
                              )
                            }
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
              onClose={() => dispatch(serviceActions.infoclose())}
              handleEdit={() => dispatch(serviceActions.handleEdit())}
              onClick={() => dispatch(serviceActions.handleOpenDeleteModal())}
            />
            <PaginationComponent
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalItems={filterServices.length}
              onPageChange={(page) => dispatch(serviceActions.handlePageChange(page))}
              onItemsPerPageChange={(perPage) =>
                dispatch(serviceActions.handleItemsPerPageChange(perPage))
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}