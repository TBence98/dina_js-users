const UserListItem = ({ first_name, last_name, created_at, status, id }) => {
    return (
        <li>
            <p>{first_name}</p>
            <p>{last_name}</p>
            <p>{created_at}</p>
        </li>
    )
}

export default UserListItem;