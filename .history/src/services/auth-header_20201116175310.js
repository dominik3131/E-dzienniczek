export const authHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.key) {
    return { Authorization: "Bearer " + user.key };
  } else {
    return {};
  }
};
