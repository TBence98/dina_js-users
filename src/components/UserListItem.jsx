import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "./UI/Modal";
import { changeUserStatus } from "../util/api";
import classes from "./UserListItem.module.css"

const UserListItem = ({ first_name, last_name, created_at, status, id }) => {
    const [userStatus, setUserStatus] = useState(status);
    const [modalMessage, setModalMessage] = useState(null);

    const toggleStatus = async () => {
        const newStatus = userStatus === "active" ? "locked" : "active";
        try {
            const response = await changeUserStatus(newStatus, id);
            if (response) {
                setUserStatus(newStatus);
            }
            setModalMessage(`${first_name} ${last_name} is now ${newStatus}`);
        } catch (error) {
            setModalMessage(error.message);
        }
    };

    const closeModal = () => {
        setModalMessage(null);
    };

    return (
        <>
            {modalMessage ? (
                    <Modal onClose={closeModal}>
                        <p style={{ color: "black" }}>{modalMessage}</p>
                        <button type="button" onClick={closeModal}>
                            OK
                        </button>
                    </Modal>
                ) : null}
            <li className={`${classes.user} ${
                    userStatus === "locked" ? classes.user_disabled : ""
                }`}>
                <p>{first_name}</p>
                <p>{last_name}</p>
                <p>{created_at}</p>
                <Link to={`/users/${id}`}>Edit User</Link>
                <button type="button" onClick={toggleStatus}>{userStatus === "active" ? "Disable" : "Activate"}</button>
            </li>
        </>
    )
}

export default UserListItem;