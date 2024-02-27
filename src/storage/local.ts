import { Form } from "../contracts";
import { emptyForm, parseForm, stringifyForm } from "../form";

export const saveToStorage = ({ form }: { form: Form }) => {
  localStorage.setItem("form", stringifyForm(form));
};

export const loadFromStorage = (): { form: Form } => {
  const storedForm = localStorage.getItem("form");

  const form = storedForm === null ? emptyForm() : parseForm(storedForm);

  return { form };
};
