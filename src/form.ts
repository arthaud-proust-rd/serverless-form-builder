import { Form } from "./contracts";

export const emptyForm = (): Form => ({
  identity: {
    lastName: "",
    firstName: "",
    birthDate: new Date(),
  },
  likeChocolate: false,
});

export const parseForm = (json: string): Form => {
  const form: Form = emptyForm();

  const parsedForm = JSON.parse(json);
  form.identity.firstName = parsedForm.identity.firstName;
  form.identity.lastName = parsedForm.identity.lastName;
  form.identity.birthDate = new Date(parsedForm.identity.birthDate);
  form.likeChocolate = parsedForm.likeChocolate;

  return form;
};

export const stringifyForm = (form: Form): string => {
  return JSON.stringify(form);
};
