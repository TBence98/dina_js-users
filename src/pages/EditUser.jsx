import { useParams, redirect, useActionData } from "react-router-dom";
import UserForm from "../components/UserForm";
import { editUser } from "../util/api";

const EditUser = () => {
    const params = useParams();
    const data = useActionData();
    let firstNameError = null;
    let lastNameError = null;

    if (data) {
        firstNameError = data.first_name ? data.first_name[0] : null;
        lastNameError = data.last_name ? data.last_name[0] : null;
    }

    return (
        <>
            <h1>Edit user</h1>
            <UserForm
                editId={params.id}
                firstNameError={firstNameError}
                lastNameError={lastNameError}
            />
        </>
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
