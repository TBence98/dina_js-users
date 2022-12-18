// Sorting by creation time

export const sortUsers = (users) => {
    if (!Array.isArray(users)) {
        throw new Error("The users argument must be an array.");
    }
    const sortedUsers = [...users];
    return sortedUsers.sort((a, b) => {
        let dateA = new Date(a.created_at).getTime();
        let dateB = new Date(b.created_at).getTime();
        if (isNaN(dateA)) {
            dateA = Number.MIN_SAFE_INTEGER;
        }
        if (isNaN(dateB)) {
            dateB = Number.MIN_SAFE_INTEGER;
        }
        return dateB - dateA;
    });
};
