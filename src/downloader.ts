import { Zippable, strToU8, zipSync } from "fflate";
import { Files, Form } from "./contracts";
import { loadU8 } from "./loader";
import { makePdf } from "./pdf";

const downloadURL = ({ url, fileName }: { url: string; fileName: string }) => {
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  a.remove();
};

export const downloadJsonFile = ({
  fileName = "dossier.json",
  form,
}: {
  fileName?: string;
  form: Form;
}) => {
  const json = JSON.stringify(form);

  downloadURL({
    url: "data:text/plain;charset=utf-8," + encodeURIComponent(json),
    fileName,
  });
};

const downloadBlob = ({
  data,
  fileName,
  mimeType,
}: {
  data: BlobPart;
  fileName: string;
  mimeType: string;
}) => {
  const blob = new Blob([data], {
    type: mimeType,
  });

  const url = window.URL.createObjectURL(blob);

  downloadURL({
    url,
    fileName,
  });

  setTimeout(() => window.URL.revokeObjectURL(url), 1000);
};

export const downloadZip = async ({
  folderName = "dossier",
  form,
  files,
}: {
  folderName?: string;
  form: Form;
  files: Files;
}) => {
  const json = JSON.stringify(form);

  const zipContent: Zippable = {
    "data.json": strToU8(json),
  };

  if (files.identity.card) {
    zipContent[`identity.card.pdf`] = await loadU8(files.identity.card);
  }

  const zipped = zipSync(zipContent);

  downloadBlob({
    data: zipped,
    fileName: `${folderName}.zip`,
    mimeType: "application/zip",
  });
};

export const downloadPdf = async ({
  pdfName = "dossier",
  form,
  files,
}: {
  pdfName?: string;
  form: Form;
  files: Files;
}) => {
  const pdf = await makePdf({
    form,
    files,
  });

  downloadBlob({
    data: pdf,
    fileName: `${pdfName}.pdf`,
    mimeType: "application/pdf",
  });
};
