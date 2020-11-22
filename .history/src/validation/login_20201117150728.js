import validator from "validator";

export const loginFieldsValidate = (username, password) => {
  let errors = [];
  if (validator.isEmpty(username) || !validator.isEmail(username)) {
    errors.push("Podaj e-mail!");
  }
  if (validator.isEmpty(password)) {
    errors.push("Wprowadź hasło!");
  }
  if (password.length < 5) {
    errors.push("Hasło musi zawierać conajmniej 5 znaków");
  }
  debugger;
  return errors;
};
