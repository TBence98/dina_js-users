import { useState, useEffect } from "react";
import { redirect, useActionData } from "react-router-dom";

import UserForm from "../components/UserForm";
import { saveUser } from "../util/api";

const NewUser = () => {
    const errors = useActionData();
    const [firstNameError, setFirstNameError] = useState(null);
    const [lastNameError, setLastNameError] = useState(null);

    useEffect(() => {
        if (errors) {
            setFirstNameError(errors.first_name ? errors.first_name[0] : null);
            setLastNameError(errors.last_name ? errors.last_name[0] : null);
        }
    }, [errors]);

    const removeError = (event) => {
        if (firstNameError && event.target.id === "first-name") {
            setFirstNameError(null);
        }
        if (lastNameError && event.target.id === "last-name") {
            setLastNameError(null);
        }
    };

    return (
        <UserForm
            actionRoute="/users/new"
            title="Add New User"
            buttonMessage="Create New User"
            firstNameError={firstNameError}
            lastNameError={lastNameError}
            removeError={removeError}
        />
    );
};

export default NewUser;

export const action = async ({ request }) => {
    const formData = await request.formData();

    try {
        const validationError = await saveUser(formData);
        if (validationError) {
            return validationError;
        }
    } catch (error) {
        throw error;
    }
    return redirect("/users");
};
