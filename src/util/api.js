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
