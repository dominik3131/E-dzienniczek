import { isEmpty, isEmail } from "react-validation";

export const loginFieldsValidate = (username, password) => {
  let errors = [];
  if (isEmpty(username) || !isEmail(username)) {
    errors.push("Podaj e-mail!");
  }
  if (isEmpty(password)) {
    errors.push("Wprowadź hasło!");
  }
  if (password.length < 5) {
    errors.push("Hasło musi zawierać conajmniej 5 znaków");
  }
  return errors;
};
