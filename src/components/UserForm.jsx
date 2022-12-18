import { Form } from "react-router-dom";
import Card from "./UI/Card";
import Button from "./UI/Button";

import classes from "./UserForm.module.css";

const UserForm = ({
    firstNameError,
    lastNameError,
    removeError,
    actionRoute,
    title,
    buttonMessage
}) => {
    return (
        <Card className={classes.user_form}>
            <h1>{title}</h1>
            <Form
                method="post"
                action={actionRoute}
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
                <Button type="submit">{buttonMessage}</Button>
            </Form>
        </Card>
    );
};

export default UserForm;
