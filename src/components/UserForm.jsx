import { Form } from "react-router-dom";
import Card from "./UI/Card";
import Button from "./UI/Button";

import classes from "./UserForm.module.css";

//  If editId is there then we are editing else adding a new user
const UserForm = ({
    firstNameError,
    lastNameError,
    removeError,
    editId = false,
}) => {
    return (
        <Card className={classes.user_form}>
            <h1>{editId ? "Edit User" : "Add New User"}</h1>
            <Form
                method="post"
                action={editId ? `/users/${editId}` : "/users/new"}
            >
                <label htmlFor="first-name">First Name </label>
                {firstNameError ? (
                    <p className={classes.invalid_message}>{firstNameError}</p>
                ) : null}
                <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    className={`${firstNameError ? classes.invalid_field : ""}`}
                    onChange={removeError}
                />
                <label htmlFor="last-name">Last Name </label>
                {lastNameError ? (
                    <p className={classes.invalid_message}>{lastNameError}</p>
                ) : null}
                <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    className={`${lastNameError ? classes.invalid_field : ""}`}
                    onChange={removeError}
                />
                <Button>{editId ? "Edit User" : "Create New User"}</Button>
            </Form>
        </Card>
    );
};

export default UserForm;
