const URL = "https://assessment-users-backend.herokuapp.com/";

export async function getUsers() {
    const usersPath = URL + "users";
    try {
        const response = await fetch(usersPath, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Response("Failed to fetch users.", {
                status: response.status,
            });
        }

        return response.json();
    } catch (error) {
        throw new Response("Failed to fetch users", { status: 404 });
    }
}

export async function saveUser(data) {
    const newPath = URL + "users";
    const newUser = {
        first_name: data.get("first-name"),
        last_name: data.get("last-name"),
        status: "active",
    };

    const response = await fetch(newPath, {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (response.status === 422) {
        const validationErrors = await response.json();
        return validationErrors;
    }

    if (!response.ok) {
        throw response;
    }
}
