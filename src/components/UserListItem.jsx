import { Link } from "react-router-dom";
import { formatDate } from "../util/formatDate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPenToSquare,
    faLock,
    faLockOpen,
    faUser,
} from "@fortawesome/free-solid-svg-icons";

import classes from "./UserListItem.module.css";

const UserListItem = ({
    first_name,
    last_name,
    created_at,
    userStatus,
    id,
    toggleStatus,
}) => {
    return (
        <li
            className={`${classes.user} ${
                userStatus === "locked" ? classes.user_disabled : ""
            }`}
        >
            <FontAwesomeIcon icon={faUser} className={classes.user_icon} />
            <div className={classes.user_infos}>
                <p>{first_name}</p>
                <p>{last_name}</p>
                <p>{userStatus}</p>
                <p>{formatDate(new Date(created_at))}</p>
            </div>
            <div className={classes.user_actions}>
                <button type="button" onClick={() => toggleStatus(id)}>
                    {userStatus === "active" ? (
                        <FontAwesomeIcon icon={faLock} />
                    ) : (
                        <FontAwesomeIcon icon={faLockOpen} />
                    )}
                </button>
                <Link to={`/users/${id}`}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                </Link>
            </div>
        </li>
    );
};

export default UserListItem;
