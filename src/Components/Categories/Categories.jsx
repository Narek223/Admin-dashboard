import React, { useState } from "react";
import styles from "./Categories.module.scss";
import Header from "../Header/Header";
import CategoriesModal from "./CategoriesModal/CategoriesModal";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { AiOutlineMore } from "react-icons/ai";
import EditDeleteBtn from "../../SheredComponents/EditDeleteBtn/EditDeleteBtn";
import DeleteModal from "../../SheredComponents/DeleteModal/DeleteModal";
import PaginationComponent from "../../SheredComponents/Pagination/PaginationComponent";

export default function Categories() {
  const [open, setopen] = useState(false);
  const [categorieslist, setcategorieslist] = useState([]);
  const [edit, setedit] = useState(null);
  const [infoanchorEl, setinfoanchorEl] = useState(null);
  const [selectedcadegories, setselectedcadegories] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const openHeader = () => {
    setopen(true);
    setedit(null);
  };

  const handleClose = () => {
    setopen(false);
    setinfoanchorEl(null);
  };

  const addcategories = (categories, isEdit = false) => {
    if (isEdit) {
      setcategorieslist((prev) =>
        prev.map((item) => (item.id === categories.id ? categories : item))
      );
      setedit(null);
    } else {
      setcategorieslist((prev) => [
        ...prev,
        { ...categories, id: prev.length + 1 },
      ]);
    }
  };
  const handleInfoClick = (event, elem) => {
    setinfoanchorEl(event.currentTarget);
    setselectedcadegories(elem);
  };
  const infoclose = () => {
    setinfoanchorEl(null);
  };
  const handleEdit = () => {
    setinfoanchorEl(null);
    setopen(true);
    setedit(selectedcadegories);
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteblog = (id) => {
    setselectedcadegories(categorieslist.filter((elem) => elem.id !== id));
    setinfoanchorEl(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleItemsPerPageChange = (newPerPage) => {
    setItemsPerPage(newPerPage);
    setCurrentPage(0);
  };
  const paginatedClient = categorieslist.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div>
      <Header handleOpen={openHeader} />
      <CategoriesModal
        open={open}
        close={handleClose}
        addcategories={addcategories}
        edit={edit}
      />
      <EditDeleteBtn
        anchorEl={infoanchorEl}
        onClose={infoclose}
        handleEdit={handleEdit}
        onClick={() => {
          handleOpenDeleteModal();
        }}
      />
      <DeleteModal
        open={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        title="Delete this Categorie?"
        text="Are you sure you want to delete this Categorie? This action cannot be undone"
        onDelete={() => {
          if (selectedcadegories) {
            handleDeleteblog(selectedcadegories.id);
          }
          handleCloseDeleteModal();
        }}
      />
      <div className={styles.categories}>
        <div className={styles.categoriesHeader}>
          <div className={styles.categoriesTitle}>
            <ul>
              <li>
                <AiOutlineFieldNumber className={styles.icons} />
              </li>
              <li>Image</li>
              <li>Category Name </li>
              <li>Description</li>
              <li>Publish Date</li>
            </ul>
          </div>
          <div className={styles.categoriesListContainer}>
            {paginatedClient.map((elem, index) => (
              <div key={index} className={styles.categoriesList}>
                <div className={styles.categoriesListItem}>
                  <ul>
                    <li>{elem.id}</li>

                    <li>
                      <img
                        src={elem.files}
                        className={styles.img}
                        alt="Service"
                      />
                    </li>

                    <li>{elem.name}</li>
                    <li>{elem.description}</li>
                    <li>{elem.date}</li>
                  </ul>
                  <button
                    className={styles.infobtn}
                    onClick={(event) => handleInfoClick(event, elem)}
                  >
                    <AiOutlineMore />
                  </button>
                </div>
              </div>
            ))}

          
          </div>
        
        </div>
        <PaginationComponent
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalItems={categorieslist.length}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
      </div>
    </div>
  );
}
