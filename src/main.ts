import { Files, Form } from "./contracts";
import { downloadPdf, downloadZip } from "./downloader";
import { loadZip } from "./loader";

const form: Form = {
  identity: {
    lastName: "",
    firstName: "",
    birthDate: new Date(),
  },
  likeChocolate: false,
};

const files: Files = {
  identity: {
    card: null,
  },
};

const fields = {
  identity: {
    card: document.querySelector<HTMLInputElement>("#identity-card"),
    lastName: document.querySelector<HTMLInputElement>("#identity-lastName"),
    firstName: document.querySelector<HTMLInputElement>("#identity-firstName"),
    birthDate: document.querySelector<HTMLInputElement>("#identity-birthDate"),
  },
  likeChocolate: document.querySelector<HTMLInputElement>("#likeChocolate"),
};
const importZipInput = document.querySelector<HTMLInputElement>("#importZip");
const exportZipBtn = document.querySelector<HTMLButtonElement>("#exportZip");
const downloadPdfBtn =
  document.querySelector<HTMLButtonElement>("#downloadPdf");

const loadForm = (formToLoad: Form) => {
  form.identity.firstName = formToLoad.identity.firstName;
  form.identity.lastName = formToLoad.identity.lastName;
  form.identity.birthDate = new Date(formToLoad.identity.birthDate);
  form.likeChocolate = formToLoad.likeChocolate;

  fields.identity.firstName!.value = form.identity.firstName;
  fields.identity.lastName!.value = form.identity.lastName;
  fields.identity.birthDate!.valueAsDate = form.identity.birthDate;
  fields.likeChocolate!.checked = form.likeChocolate;
};

const loadFiles = (filesToLoad: Files) => {
  files.identity.card = filesToLoad.identity.card;
};

importZipInput!.addEventListener("change", async (e) => {
  //@ts-expect-error
  const file: File = e.target.files[0];

  const loaded = await loadZip(file);

  loadForm(loaded.form);
  loadFiles(loaded.files);
});

fields.identity.card!.addEventListener("change", (e) => {
  //@ts-expect-error
  const file: File = e.target.files[0];

  files.identity.card = file;
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

exportZipBtn!.addEventListener("click", () => {
  downloadZip({
    form,
    files,
  });
});

downloadPdfBtn!.addEventListener("click", () => {
  downloadPdf({
    form,
    files,
  });
});
