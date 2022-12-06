import { useState } from "react";

import Pagination from "./Pagination";
import UserListItem from "./UserListItem";
import Card from "./UI/Card";
import Modal from "./UI/Modal";
import { getUsers } from "../util/api";
import { changeUserStatus } from "../util/api";
import { sortUsers } from "../util/sortUsers";
import classes from "./UsersList.module.css";

const UserList = ({ loadedUsers }) => {
    const [users, setUsers] = useState(sortUsers(loadedUsers));
    const [modalMessage, setModalMessage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(10);
    /* const [searchParams, setSearchParams] = useSearchParams(); */

    // Get current page users
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    // This useEffect makes sure that you can link to a certain page number
    /* The current router setup with the loader always fetch unnecessarily the user 
        datas when you change query params therefore this is currently disabled */
    /* useEffect(() => {
        const pageNumber = +searchParams.get("page");
        if (pageNumber) {
            setCurrentPage(pageNumber);
        }
    }, [searchParams]); */

    const toggleUserStatus = async (id) => {
        const indexOfUser = users.findIndex((user) => user.id === id);
        const selectedUser = { ...users[indexOfUser] };
        const newStatus =
            selectedUser.status === "active" ? "locked" : "active";
        selectedUser.status = newStatus;
        try {
            const response = await changeUserStatus(newStatus, id);
            /* if we successfully updated the user in the server we also update
             our local users list. An alternative could be refetching the users list
             from the server, but this would increase load time and server load */
            if (response) {
                const updatedUsers = [...users];
                updatedUsers[indexOfUser] = selectedUser;
                setUsers(updatedUsers);
            }
            setModalMessage(
                `${selectedUser.first_name} ${selectedUser.last_name} is now ${newStatus}`
            );
        } catch (error) {
            setModalMessage(error.message);
        }
    };

    const changePage = (pageNumber) => {
        /* The current router setup with the loader always fetch unnecessarily the user 
        datas when you change query params therefore this is currently disabled */
        // setSearchParams({ page: pageNumber });
        setCurrentPage(pageNumber);
    };

    const closeModal = () => {
        setModalMessage(null);
    };

    return (
        <>
            {modalMessage ? (
                <Modal onClose={closeModal} message={modalMessage} />
            ) : null}
            <section className={classes.users}>
                <Card>
                    <ul>
                        {currentUsers.map((user) => (
                            <UserListItem
                                key={user.id}
                                id={user.id}
                                first_name={user.first_name}
                                last_name={user.last_name}
                                created_at={user.created_at}
                                userStatus={user.status}
                                toggleStatus={toggleUserStatus}
                            />
                        ))}
                    </ul>
                </Card>
                <Pagination
                    totalUsers={users.length}
                    usersPerPage={usersPerPage}
                    changePage={changePage}
                    currentPage={currentPage}
                />
            </section>
        </>
    );
};

export default UserList;

export const loader = () => {
    return getUsers();
};
