const authHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.key) {
    return { Authorization: "token" + user.key};
  } else {
    return {};
  }
};

export default authHeader;
