import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import styles from "./client.module.scss";
import ClientModal from "./ClientModal/ClientModal";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { AiOutlineMore } from "react-icons/ai";

export default function Client() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [clientlist, setClientlist] = useState([]);
  const [edit, setedit] = useState(null);

  const [id, setId] = useState(0);

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

  const handleAddClient = (client, isEdit = false) => {
    setClientlist((prev) => [...prev, client]);
  };
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
          {clientlist.map(({ files, name, phone, mail, date, id }, index) => (
            <div key={index}>
              <div className={styles.clientList} key={index}>
                <ul>
                  <li>{index}</li>
                  <li>
                    <img className={styles.img} src={files} />
                  </li>
                  <li>{name}</li>
                  <li>{phone}</li>
                  <li>{mail}</li>
                  <li>{date}</li>
                </ul>
                <button className={styles.infobtn}>
                  <AiOutlineMore />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
