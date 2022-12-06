import { useLoaderData } from "react-router-dom";

import UsersList from "../components/UsersList";

const Users = () => {
    const loaderData = useLoaderData();
    return <UsersList loadedUsers={loaderData} />;
};

export default Users;
