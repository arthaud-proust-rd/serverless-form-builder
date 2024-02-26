import { downloadJsonFile } from "./downloader";

export type Form = {
  identity: {
    lastName: string;
    firstName: string;
    birthDate: Date;
  };
  likeChocolate: boolean;
};

const form: Form = {
  identity: {
    lastName: "",
    firstName: "",
    birthDate: new Date(),
  },
  likeChocolate: false,
};

const fields = {
  identity: {
    lastName: document.querySelector<HTMLInputElement>("#identity-lastName"),
    firstName: document.querySelector<HTMLInputElement>("#identity-firstName"),
    birthDate: document.querySelector<HTMLInputElement>("#identity-birthDate"),
  },
  likeChocolate: document.querySelector<HTMLInputElement>("#likeChocolate"),
};
const importJsonInput = document.querySelector<HTMLInputElement>("#importJson");
const exportJsonBtn = document.querySelector<HTMLButtonElement>("#exportJson");

importJsonInput!.addEventListener("change", (e) => {
  //@ts-expect-error
  const file: File = e.target.files[0];

  const reader = new FileReader();
  reader.addEventListener("load", (e) => {
    if (!e.target) {
      return;
    }

    if (!(typeof e.target.result === "string")) {
      return;
    }

    const parsedForm: Form = JSON.parse(e.target.result);

    form.identity.firstName = parsedForm.identity.firstName;
    form.identity.lastName = parsedForm.identity.lastName;
    form.identity.birthDate = new Date(parsedForm.identity.birthDate);
    form.likeChocolate = parsedForm.likeChocolate;

    fields.identity.firstName!.value = form.identity.firstName;
    fields.identity.lastName!.value = form.identity.lastName;
    fields.identity.birthDate!.valueAsDate = form.identity.birthDate;
    fields.likeChocolate!.checked = form.likeChocolate;
  });
  reader.readAsText(file);
});

fields.identity.lastName!.addEventListener("change", (e) => {
  //@ts-expect-error
  form.identity.lastName = e.currentTarget.value.trim();
});
fields.identity.firstName!.addEventListener("change", (e) => {
  //@ts-expect-error
  form.identity.firstName = e.currentTarget.value.trim();
});
fields.identity.birthDate!.addEventListener("change", (e) => {
  //@ts-expect-error
  form.identity.birthDate = e.currentTarget.valueAsDate;
});
fields.likeChocolate!.addEventListener("change", (e) => {
  //@ts-expect-error
  form.likeChocolate = e.currentTarget.checked;
});

exportJsonBtn!.addEventListener("click", () => {
  const json = JSON.stringify(form);

  downloadJsonFile({
    json,
  });
});
