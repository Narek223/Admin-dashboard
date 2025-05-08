import React, { useState } from "react";
import styles from "./inbox.module.scss";
import Header from "../Header/Header";
import { CiSearch } from "react-icons/ci";
import { FaComments } from "react-icons/fa";
import { FaRegPaperPlane } from "react-icons/fa";
import { GoBell } from "react-icons/go";
import { AiOutlineMore } from "react-icons/ai";
import { Menu, MenuItem } from "@mui/material";
import { FaRegTrashAlt } from "react-icons/fa";

const Users = [
  {
    id: 1,
    name: "Jane Doe",
    avatar: "https://i.pravatar.cc/150?img=1",
    lastMessage: "Hey! How are you?",
    messages: [
      { id: 1, text: "Hey!", sender: "Jane", timestamp: "10:00 AM" },
      { id: 2, text: "How are you?", sender: "Jane", timestamp: "10:01 AM" },
    ],
  },
  {
    id: 2,
    name: "John Smith",
    avatar: "https://i.pravatar.cc/150?img=2",
    lastMessage: "Let's catch up later!",
    messages: [],
  },
];

export default function Inbox() {
  const [messages, setmessages] = useState(Users);
  const [dialog, setdialog] = useState(false);
  const [dialogheader, setdialogheader] = useState(true);
  const [user, setuser] = useState();
  const [anchorEl, setAnchorEl] = useState(null);

  const usersMessages = (el) => {
    setdialog(true);
    setdialogheader(false);

    setuser(el);
  };

  const deletefunc = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const deletedialog = () => {
    setmessages((prev) => prev.filter((item) => item.id !== user.id));

    setuser(null);
    setAnchorEl(null);
    setdialog(false);
    setdialogheader(true);
  };
  return (
    <div className={styles.inbox}>
      <div className={styles.header}>
        <div className={styles.headerWrapper}>
          <p>Inbox</p>
          <p>
            <GoBell className={styles.icon} />
          </p>
        </div>
      </div>
      <div className={styles.inboxheader}>
        <div className={styles.inbox_Messages}>
          <div className={styles.searchWrapper}>
            <CiSearch className={styles.Icon} />
            <input type="text" placeholder="Search" />
          </div>

          {!messages  ||  messages.length === 0? (
            <div className={styles.noDialogs}>
              <FaRegPaperPlane className={styles.icon} />
              <p>No messages yet</p>
              <span>Start a conversation to see it here</span>
            </div>
          ) : (
            <div className={styles.userbox}>
              {messages.map((elem, index) => (
                <div
                  key={index}
                  className={styles.users}
                  onClick={() => usersMessages(elem)}
                >
                  <img src={elem.avatar} />
                  <div className={styles.usermessages}>
                    <div className={styles.name}>
                      <h1> {elem.name} </h1>
                      <h1>10:30</h1>
                    </div>

                    <p>{elem.lastMessage}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={styles.messagesCont}>
          <div
            className={styles.Message_Header}
            style={{ display: dialog ? "block" : "none" }}
          >
            <div className={styles.header}>
              <div className={styles.headerbox}>
                <img src={user?.avatar} alt="avatar" />
                <h1>{user?.name}</h1>
              </div>
              <button
                className={styles.infobtn}
                aria-haspopup="true"
                aria-expanded={false}
                onClick={(event) => deletefunc(event)}
              >
                <AiOutlineMore className={styles.icon} />
              </button>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                disablePortal
                sx={{
                  "& .MuiPaper-root": {
                    width: "148px",
                    backgroundColor: "rgba(248, 249, 250, 1)",
                    borderRadius: "8px",
                    padding: 0,
                    boxShadow: "none",
                  },
                  "& .MuiMenuItem-root:hover": {
                    backgroundColor: "white",
                  },
                }}
              >
                <MenuItem
                  sx={{
                    color: "red",
                  }}
                  onClick={deletedialog}
                >
                  <FaRegTrashAlt
                    className={styles.newicon}
                    style={{ marginRight: "12px" }}
                  />
                  Delete
                </MenuItem>
              </Menu>
            </div>
          </div>
          <div
            className={styles.messagesBox}
            style={{
              height: dialog
                ? "   calc(100vh - 258px)"
                : "      calc(100vh - 130px)",
            }}
          >
            {dialogheader ? (
              <div className={styles.noChatSelected}>
                <FaComments className={styles.chatIcon} />
                <p>Select a conversation</p>
                <span>Choose a contact on the left to start chatting</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
