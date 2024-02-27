import { Files, Form } from "../contracts";
import { downloadPdf, downloadZip } from "../file/downloader";
import { loadZip } from "../file/loader";
import { saveToStorage } from "../storage/local";

export const setupDOM = ({ form, files }: { form: Form; files: Files }) => {
  const fields = {
    identity: {
      card: document.querySelector<HTMLInputElement>("#identity-card"),
      lastName: document.querySelector<HTMLInputElement>("#identity-lastName"),
      firstName: document.querySelector<HTMLInputElement>(
        "#identity-firstName"
      ),
      birthDate: document.querySelector<HTMLInputElement>(
        "#identity-birthDate"
      ),
    },
    likeChocolate: document.querySelector<HTMLInputElement>("#likeChocolate"),
  };

  const updateFields = (newForm: Form) => {
    fields.identity.firstName!.value = newForm.identity.firstName;
    fields.identity.lastName!.value = newForm.identity.lastName;
    fields.identity.birthDate!.valueAsDate = newForm.identity.birthDate;
    fields.likeChocolate!.checked = newForm.likeChocolate;
  };

  const loadForm = (formToLoad: Form) => {
    Object.assign(form, formToLoad);

    saveToStorage({ form });

    updateFields(form);
  };

  const loadFiles = (filesToLoad: Files) => {
    files.identity.card = filesToLoad.identity.card;
  };

  fields.identity.card!.addEventListener("change", (e) => {
    //@ts-expect-error
    const file: File = e.target.files[0];

    files.identity.card = file;
  });

  fields.identity.lastName!.addEventListener("change", (e) => {
    //@ts-expect-error
    form.identity.lastName = e.currentTarget.value.trim();

    saveToStorage({ form });
  });
  fields.identity.firstName!.addEventListener("change", (e) => {
    //@ts-expect-error
    form.identity.firstName = e.currentTarget.value.trim();

    saveToStorage({ form });
  });
  fields.identity.birthDate!.addEventListener("change", (e) => {
    //@ts-expect-error
    form.identity.birthDate = e.currentTarget.valueAsDate;

    saveToStorage({ form });
  });
  fields.likeChocolate!.addEventListener("change", (e) => {
    //@ts-expect-error
    form.likeChocolate = e.currentTarget.checked;

    saveToStorage({ form });
  });

  const importZipInput = document.querySelector<HTMLInputElement>("#importZip");
  const exportZipBtn = document.querySelector<HTMLButtonElement>("#exportZip");
  const downloadPdfBtn =
    document.querySelector<HTMLButtonElement>("#downloadPdf");

  importZipInput!.addEventListener("change", async (e) => {
    //@ts-expect-error
    const file: File = e.target.files[0];

    const loaded = await loadZip(file);

    loadForm(loaded.form);
    loadFiles(loaded.files);
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

  return {
    updateFields,
    loadForm,
    loadFiles,
  };
};
