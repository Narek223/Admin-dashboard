import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import styles from "./client.module.scss";
import ClientModal from "./ClientModal/ClientModal";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { AiOutlineMore } from "react-icons/ai";
import EditDeleteBtn from "../../SheredComponents/EditDeleteBtn/EditDeleteBtn";
import PaginationComponent from "../../SheredComponents/Pagination/PaginationComponent";

export default function Client() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [clientlist, setClientlist] = useState([]);
  const [edit, setedit] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [id, setId] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    setId(clientlist.length);
  }, [clientlist]);

  const handleOpen = () => {
    setOpen(true);
    setError(false);
  };
  const handleClose = () => {
    setOpen(false);
    setError(false);
  };

  const handleEdit = () => {
    setAnchorEl(null);
    setOpen(true);
    setedit(selectedService);
  };

  const handleAddClient = (client, isEdit = false) => {
    if (isEdit) {
      setClientlist((prev) =>
        prev.map((item) => (item.id === client.id ? client : item))
      );
      setedit(null);
    } else {
      setClientlist((prev) => [...prev, { ...client, id: prev.length + 1 }]);
    }
  };

  const handleInfoClick = (event, elem) => {
    setAnchorEl(event.currentTarget);
    setSelectedService(elem);
  };

  const infoclose = () => {
    setAnchorEl(null);
  };

  const handleDeleteService = (id) => {
    setClientlist(clientlist.filter((elem) => elem.id !== id));
    setAnchorEl(null);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleItemsPerPageChange = (newPerPage) => {
    setItemsPerPage(newPerPage);
    setCurrentPage(0);
  };

  const paginatedClient = clientlist.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className={styles.ClientConteiner}>
      <Header handleOpen={handleOpen} />
      <ClientModal
        open={open}
        handleClose={handleClose}
        error={error}
        setError={setError}
        onAddService={handleAddClient}
        edit={edit}
        id={id}
        setid={setId}
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
              <div key={index}>
                <div className={styles.clientList} key={index}>
                  <ul>
                    <li>{elem.id}</li>
                    <li>
                      <img className={styles.img} src={elem.files} />
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
                    onClick={(event) => handleInfoClick(event, elem)}
                  >
                    <AiOutlineMore />
                  </button>
                </div>
              
              </div>
            ))}
          </div>
        </div>
          <EditDeleteBtn
                  anchorEl={anchorEl}
                  onClose={infoclose}
                  handleEdit={handleEdit}
                  onClick={() => handleDeleteService(selectedService.id)}
                />
        <PaginationComponent
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={clientlist.length}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
    </div>
  );
}
