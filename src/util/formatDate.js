const padTo2Digits = (num) => {
    if (typeof num !== "number") {
        throw new Error("The num argument must be a number.");
    }
    return num.toString().padStart(2, "0");
};

export const formatDate = (date) => {
    if (!(date instanceof Date)) {
        throw new Error("The date argument must be a Date object.");
    }
    return (
        [
            date.getFullYear(),
            padTo2Digits(date.getMonth() + 1),
            padTo2Digits(date.getDate()),
        ].join("-") +
        " " +
        [
            padTo2Digits(date.getHours()),
            padTo2Digits(date.getMinutes()),
            padTo2Digits(date.getSeconds()),
        ].join(":")
    );
};
