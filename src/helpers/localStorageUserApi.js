export const getUserData = () => JSON.parse(localStorage.getItem("user"));

export const getUserType = () => {
    const user = getUserData();
    return user.user.type;
}

export const getUserId = () => {
    const  user = getUserData();
    return user.user.id;
}
