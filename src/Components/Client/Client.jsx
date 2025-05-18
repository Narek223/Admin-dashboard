import React from "react";
import Header from "../Header/Header";
import styles from "./client.module.scss";
import ClientModal from "./ClientModal/ClientModal";
import { AiOutlineFieldNumber, AiOutlineMore } from "react-icons/ai";
import EditDeleteBtn from "../../SheredComponents/EditDeleteBtn/EditDeleteBtn";
import PaginationComponent from "../../SheredComponents/Pagination/PaginationComponent";
import DeleteModal from "../../SheredComponents/DeleteModal/DeleteModal";
import NoAvatar from "../../assets/NoAvatart/download.png";
import { paginate } from "../../Utils/pagination";
import { useSelector, useDispatch } from "react-redux";
import * as clientSlice from "../../Features/Client/ClientSlice";

export default function Client() {
  const clientSliceState = useSelector((state) => state.client);
  const dispatch = useDispatch();

  const paginatedClient = paginate(
    clientSliceState.clientList,
    clientSliceState.currentPage,
    clientSliceState.itemsPerPage
  );

  return (
    <div className={styles.ClientConteiner}>
      <Header handleOpen={() => dispatch(clientSlice.openModal())} />
      <ClientModal
        open={clientSliceState.open}
        handleClose={() => dispatch(clientSlice.closeModal())}
        error={clientSliceState.error}
        setError={(error) => dispatch(clientSlice.setError(error))}
        onAddService={(client, isEdit = false) =>
          dispatch(clientSlice.addClient({ client, isEdit }))
        }
        edit={clientSliceState.edit}
      />
      <DeleteModal
        open={clientSliceState.isDeleteModalOpen}
        onClose={() => dispatch(clientSlice.closeDeleteModal())}
        title="Delete Client"
        text="Are you sure you want to delete this client? This action cannot be undone"
        onDelete={() => {
          dispatch(clientSlice.deleteClient(clientSliceState.selectedClient.id));
          dispatch(clientSlice.closeDeleteModal());
        }}
      />
      <div className={styles.clientbody}>
        <div className={styles.clinetWrapper}>
          <div className={styles.clientheader}>
            <ul>
              <li>
                <AiOutlineFieldNumber className={styles.icons} />
              </li>
              <li>Image</li>
              <li>Client Name</li>
              <li>Phone Number</li>
              <li>Email</li>
              <li>Birth Date</li>
            </ul>
          </div>

          <div className={styles.clientListConteiner}>
            {paginatedClient.map((elem, index) => (
              <div key={index} className={styles.clientItem}>
                <div className={styles.clientList} key={index}>
                  <ul>
                    <li>{elem.id}</li>
                    <li>
                      <img
                        className={styles.img}
                        src={elem.files ? elem.files : NoAvatar}
                        alt="Client"
                      />
                    </li>
                    <li>{elem.name}</li>
                    <li>{elem.phone}</li>
                    <li>{elem.mail}</li>
                    <li>{elem.date}</li>
                  </ul>
                  <button
                    className={styles.infobtn}
                    aria-haspopup="true"
                    aria-expanded={false}
                    onClick={(event) =>
                      dispatch(clientSlice.handleInfoClick({ event, elem }))
                    }
                  >
                    <AiOutlineMore />
                  </button>
                </div>
                <EditDeleteBtn
                  anchorEl={clientSliceState.anchorEl}
                  onClose={() => dispatch(clientSlice.closeInfo())}
                  handleEdit={() => dispatch(clientSlice.handleEdit())}
                  onClick={() => dispatch(clientSlice.openDeleteModal())}
                />
              </div>
            ))}
          </div>
        </div>
        <PaginationComponent
          currentPage={clientSliceState.currentPage}
          itemsPerPage={clientSliceState.itemsPerPage}
          totalItems={clientSliceState.clientList.length}
          onPageChange={(newPage) =>
            dispatch(clientSlice.handlePageChange({ newPage }))
          }
          onItemsPerPageChange={(newPerPage) =>
            dispatch(clientSlice.handleItemsPerPageChange({ newPerPage }))
          }
        />
      </div>
    </div>
  );
}