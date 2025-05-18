import React from "react";
import styles from "./Categories.module.scss";
import Header from "../Header/Header";
import CategoriesModal from "./CategoriesModal/CategoriesModal";
import { AiOutlineFieldNumber, AiOutlineMore } from "react-icons/ai";
import EditDeleteBtn from "../../SheredComponents/EditDeleteBtn/EditDeleteBtn";
import DeleteModal from "../../SheredComponents/DeleteModal/DeleteModal";
import PaginationComponent from "../../SheredComponents/Pagination/PaginationComponent";
import NoAvatar from "../../assets/NoAvatart/download.png";
import { paginate } from "../../Utils/pagination";
import { useSelector, useDispatch } from "react-redux";
import * as categoriesSlice from "../../Features/Categories/CategoriesSlice";

export default function Categories() {
  const categoriesslice = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  const paginatedClient = paginate(
    categoriesslice.categorieslist,
    categoriesslice.currentPage,
    categoriesslice.itemsPerPage
  );

  return (
    <div>
      <Header handleOpen={() => dispatch(categoriesSlice.openHeader())} />
      <CategoriesModal
        open={categoriesslice.open}
        close={() => dispatch(categoriesSlice.handleClose())}
        addcategories={(categories, isEdit = false) =>
          dispatch(categoriesSlice.addcategories({ categories, isEdit }))
        }
        edit={categoriesslice.edit}
        error={categoriesslice.error}
        setError={(error) => dispatch(categoriesSlice.setError(error))}
      />
      <EditDeleteBtn
        anchorEl={categoriesslice.infoanchorEl}
        onClose={()=>dispatch(categoriesSlice.infoclose())}
        handleEdit={() => dispatch(categoriesSlice.handleEdit())}
        onClick={() => dispatch(categoriesSlice.handleOpenDeleteModal())}
      />
      <DeleteModal
        open={categoriesslice.isDeleteModalOpen}
        onClose={() => dispatch(categoriesSlice.handleCloseDeleteModal())}
        title="Delete this Categorie?"
        text="Are you sure you want to delete this Categorie? This action cannot be undone"
        onDelete={() => {
          dispatch(
            categoriesSlice.handleDeleteblog(
              categoriesslice.selectedCategory.id
            )
          );
          dispatch(categoriesSlice.handleCloseDeleteModal());
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
                        src={elem.files ? elem.files : NoAvatar}
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
                    onClick={(event) =>
                      dispatch(categoriesSlice.handleInfoClick({ event, elem }))
                    }
                  >
                    <AiOutlineMore />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <PaginationComponent
          currentPage={categoriesslice.currentPage}
          itemsPerPage={categoriesslice.itemsPerPage}
          totalItems={categoriesslice.categorieslist.length}
          onPageChange={(newPage) =>
            dispatch(categoriesSlice.handlePageChange({ newPage }))
          }
          onItemsPerPageChange={(newPerPage) =>
            dispatch(categoriesSlice.handleItemsPerPageChange({ newPerPage }))
          }
        />
      </div>
    </div>
  );
}
