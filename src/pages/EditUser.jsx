import { useState, useEffect } from "react";
import { useParams, redirect, useActionData } from "react-router-dom";
import UserForm from "../components/UserForm";
import { editUser } from "../util/api";

const EditUser = () => {
    const params = useParams();
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
            editId={params.id}
            firstNameError={firstNameError}
            lastNameError={lastNameError}
            removeError={removeError}
        />
    );
};

export default EditUser;

export const action = async ({ request, params }) => {
    const formData = await request.formData();
    const userId = params.id;

    try {
        const validationError = await editUser(formData, userId);
        if (validationError) {
            return validationError;
        }
    } catch (error) {
        throw error;
    }
    return redirect("/users");
};
