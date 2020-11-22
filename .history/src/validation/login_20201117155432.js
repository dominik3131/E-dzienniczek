import validator from "validator";

export const loginFieldsValidate = (username, password) => {
  let errors = {
    email: [],
    password: [],
  };
  if (validator.isEmpty(username) || !validator.isEmail(username)) {
    errors.email.push("Podaj adres e-mail!");
  }
  if (validator.isEmpty(password)) {
    errors.password.push("Wprowadź hasło!");
  }
  if (password.length < 5) {
    errors.password.push("Hasło musi zawierać conajmniej 5 znaków");
  }
  return errors;
};
