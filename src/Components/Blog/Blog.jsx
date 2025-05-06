import React, { useState } from "react";
import Header from "../Header/Header";
import styles from "./blog.module.scss";
import BlogModal from "./BlogModal/BlogModal";
import { AiOutlineMore } from "react-icons/ai";
import NoAvatar from "../../assets/NoAvatart/download.png";
import EditDeleteBtn from "../../SheredComponents/EditDeleteBtn/EditDeleteBtn";
import DeleteModal from "../../SheredComponents/DeleteModal/DeleteModal";
import PaginationComponent from "../../SheredComponents/Pagination/PaginationComponent";
import { manageItems } from "../../Utils/EditFunction";
import { paginate } from "../../Utils/pagination";



export default function Blog() {
  const [open, setopen] = useState(false);
  const [edit, setedit] = useState(null);
  const [bloglist, setbloglist] = useState([]);
  const [infoanchorEl, setinfoanchorEl] = useState(null);
  const [selectedblog, setselectedblog] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);


  const openmodal = () => {
    setopen(true);
    setError(false);
    setedit(null);
  };

  const handleClose = () => {
    setopen(false);
    setError(false);
  };

  const addblog = (blog, isEdit = false) => {
    setbloglist((prev) => manageItems(prev, blog, isEdit));
   
  };

  
  const infoclose = () => {
    setinfoanchorEl(null);
  };
  const handleEdit = () => {
    setinfoanchorEl(null);
    setopen(true);
    setedit(selectedblog);
  };
  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleInfoClick = (event, elem) => {
    setselectedblog(elem);
    setinfoanchorEl(event.currentTarget);
  };
  const handleDeleteblog = (id) => {
    setbloglist(bloglist.filter((elem) => elem.id !== id));
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

  const paginatedBlog = paginate(bloglist, currentPage, itemsPerPage);
 

  return (
    <div className={styles.blogConteiner}>
      <Header handleOpen={openmodal} />

      <BlogModal
        error={error}
        seterror={setError}
        open={open}
        handleClose={handleClose}
        addblog={addblog}
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
        title="Delete this Blog?"
        text="Are you sure you want to delete this blog? This action cannot be undone"
        onDelete={() => {
          if (selectedblog) {
            handleDeleteblog(selectedblog.id);
          }
          handleCloseDeleteModal();
        }}
      />
      <div className={styles.blog}>
        <div className={styles.blogHeader}>
          <div className={styles.blogHeaderTitle}>
            <ul>
              <li>Image</li>
              <li>Title</li>
              <li>Category</li>
              <li>Author</li>
              <li>Status</li>
              <li>Publish Date</li>
            </ul>
          </div>

          <div className={styles.blogList}>
            {paginatedBlog.map((elem, id) => (
              <div className={styles.blogbody} key={id}>
                <div className={styles.blogbodylist}>
                  <ul>
                    <li>
                      <img
                        className={styles.img}
                        src={elem.files ? elem.files : NoAvatar}
                      />
                    </li>
                    <li>{elem.title}</li>
                    <li>{elem.category}</li>
                    <li>{elem.Author}</li>
                    <li>{elem.Author}</li>
                    <li>{elem.Author}</li>
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
                  totalItems={bloglist.length}
                  onPageChange={handlePageChange}
                  onItemsPerPageChange={handleItemsPerPageChange}
                />
      </div>
    </div>
  );
}
