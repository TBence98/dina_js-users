import { useLoaderData } from "react-router-dom";

import UsersList from "../components/UsersList";

const Users = () => {
    const loaderData = useLoaderData();
    return (
        <>
            <h1>The Users List</h1>
            <UsersList users={loaderData} />
        </>
    );
};

export default Users;
