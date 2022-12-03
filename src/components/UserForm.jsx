import { Form } from "react-router-dom";

const UserForm = ({ firstNameError, lastNameError, editId = false }) => {
    return (
        <Form method="post" action={editId ? `/users/${editId}` : "/users/new"}>
            <label htmlFor="first-name">First Name:</label>
            <input type="text" name="first-name" id="first-name" />
            {firstNameError ? <p>{firstNameError}</p> : null}
            <label htmlFor="last-name">Last Name:</label>
            <input type="text" name="last-name" id="last-name" />
            {lastNameError ? <p>{lastNameError}</p> : null}
            <button>{editId ? "Edit User" : "Create New User"}</button>
        </Form>
    );
};

export default UserForm;
