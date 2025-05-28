import React from "react";
import styles from "./inbox.module.scss";
import Header from "../Header/Header";
import { CiSearch } from "react-icons/ci";
import { FaComments } from "react-icons/fa";
import { FaRegPaperPlane, FaRegTrashAlt } from "react-icons/fa";
import { GoBell } from "react-icons/go";
import { AiOutlineMore } from "react-icons/ai";
import { Menu, MenuItem } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import * as InboxSlice from "../../Redax/Slices/Inbox/InboxSlice";

export default function Inbox() {
  const dispatch = useDispatch();
  const {
    messages,
    searchTerm,
    dialogheader,
    user,
    anchorEl,
    selectedUserId,
    dialog,
  } = useSelector((state) => state.inbox);

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
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => dispatch(InboxSlice.seacrchFunc(e.target.value))}
            />
          </div>

          {messages.length === 0 && !searchTerm ? (
            <div className={styles.noDialogs}>
              <div>
                <FaRegPaperPlane className={styles.icon} />
                <p>No messages yet</p>
                <span>Start a conversation to see it here</span>
              </div>
            </div>
          ) : messages.length === 0 && searchTerm ? (
            <div className={styles.noDialogs}>
              <p>Nothing found</p>
              <span>Try changing the query</span>
            </div>
          ) : (
            <div className={styles.userbox}>
              {messages.map((elem, index) => (
                <div
                  key={index}
                  className={`${styles.users} ${
                    selectedUserId === elem.id ? styles.selected : ""
                  }`}
                  onClick={() => dispatch(InboxSlice.usersMessages(elem))}
                >
                  <img src={elem.avatar} alt="avatar" />
                  <div className={styles.usermessages}>
                    <div className={styles.name}>
                      <h1>{elem.name}</h1>
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
                onClick={(e) =>
                  dispatch(InboxSlice.deletefunc(e.currentTarget))
                }
              >
                <AiOutlineMore className={styles.icon} />
              </button>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => dispatch(InboxSlice.closeMenu())}
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
                  sx={{ color: "red" }}
                  onClick={() => dispatch(InboxSlice.deletedialog())}
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
              height: dialog ? "calc(100vh - 258px)" : "calc(100vh - 130px)",
            }}
          >
            {dialogheader ? (
              <div className={styles.noChatSelected}>
                <FaComments className={styles.chatIcon} />
                <p>Select a conversation</p>
                <span>Choose a contact on the left to start chatting</span>
              </div>
            ) : (
              <div className={styles.messagesConteiner}>
                {user?.messages.map((msg, index) => (
                  <div key={index} className={styles.message}>
                    <img src={user.avatar} alt="avatar" />
                    <div className={styles.messageContent}>
                      <p>{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
