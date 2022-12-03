import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

import Pagination from "./Pagination";
import UserListItem from "./UserListItem";
import { getUsers } from "../util/api";

const UserList = ({ users }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage, setUsersPerPage] = useState(10);
    const [searchParams, setSearchParams] = useSearchParams();

    // Get current page users
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    // This useEffect makes sure that you can link to a certain page number
    useEffect(() => {
        const pageNumber = +searchParams.get("page");
        if (pageNumber) {
            setCurrentPage(pageNumber);
        }
    }, [searchParams]);

    const changePage = (pageNumber) => {
        setSearchParams({ page: pageNumber });
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <ul>
                {currentUsers.map((user) => (
                    <UserListItem
                        key={user.id}
                        id={user.id}
                        first_name={user.first_name}
                        last_name={user.last_name}
                        created_at={user.created_at}
                        status={user.status}
                    />
                ))}
            </ul>
            <Pagination
                totalUsers={users.length}
                usersPerPage={usersPerPage}
                changePage={changePage}
            />
        </>
    );
};

export default UserList;

export const loader = () => {
    return getUsers();
};
