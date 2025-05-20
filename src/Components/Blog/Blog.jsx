import React from "react";
import Header from "../Header/Header";
import styles from "./blog.module.scss";
import BlogModal from "./BlogModal/BlogModal";
import { AiOutlineMore } from "react-icons/ai";
import NoAvatar from "../../assets/NoAvatart/download.png";
import EditDeleteBtn from "../../SheredComponents/EditDeleteBtn/EditDeleteBtn";
import DeleteModal from "../../SheredComponents/DeleteModal/DeleteModal";
import PaginationComponent from "../../SheredComponents/Pagination/PaginationComponent";
import { paginate } from "../../Utils/pagination";
import { useSelector, useDispatch } from "react-redux";
import * as blogActions from "../../Redax/Slices/blog/blogSlice"

export default function Blog() {
  const blogslice = useSelector((state) => state.blog);
  const dispatch = useDispatch();

  const paginatedBlog = paginate(
    blogslice.blogList,
    blogslice.currentPage,
    blogslice.itemsPerPage
  );

  return (
    <div className={styles.blogConteiner}>
      <Header handleOpen={() => dispatch(blogActions.openmodal())} />

      <BlogModal
        error={blogslice.error}
        seterror={(error) => dispatch(blogActions.setError(error))}
        open={blogslice.open}
        handleClose={() => dispatch(blogActions.handleClose())}
        addblog={(blog, isEdit = false) =>
          dispatch(blogActions.addblog({ blog, isEdit }))
        }
        edit={blogslice.edit}
      />

      <EditDeleteBtn
        anchorEl={blogslice.infoanchorEl}
        onClose={() => dispatch(blogActions.infoclose())}
        handleEdit={() => dispatch(blogActions.handleEdit())}
        onClick={() => {
          dispatch(blogActions.handleOpenDeleteModal());
        }}
      />

      <DeleteModal
        open={blogslice.isDeleteModalOpen}
        onClose={() => dispatch(blogActions.handleCloseDeleteModal())}
        title="Delete this Blog?"
        text="Are you sure you want to delete this blog? This action cannot be undone"
        onDelete={() => {
       
          dispatch(blogActions.handleDeleteblog(blogslice.selectedblog.id));
          
          dispatch(blogActions.handleCloseDeleteModal());
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
                        alt="Blog"
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
                    onClick={(event) =>
                      dispatch(blogActions.handleInfoClick({ event, elem }))
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
          currentPage={blogslice.currentPage}
          itemsPerPage={blogslice.itemsPerPage}
          totalItems={blogslice.blogList.length}
          onPageChange={(newPage) =>
            dispatch(blogActions.handlePageChange({ newPage }))
          }
          onItemsPerPageChange={(newPerPage) =>
            dispatch(blogActions.handleItemsPerPageChange({ newPerPage }))
          }
        />
      </div>
    </div>
  );
}