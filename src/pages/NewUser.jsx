import { redirect, useActionData } from "react-router-dom";

import UserForm from "../components/UserForm";
import { saveUser } from "../util/api";

const NewUser = () => {
    const data = useActionData();
    let firstNameError = null;
    let lastNameError = null;

    if (data) {
        firstNameError = data.first_name ? data.first_name[0] : null;
        lastNameError = data.last_name ? data.last_name[0] : null;
    }

    return (
        <>
            <h1>Add new user</h1>
            <UserForm
                firstNameError={firstNameError}
                lastNameError={lastNameError}
            />
        </>
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
