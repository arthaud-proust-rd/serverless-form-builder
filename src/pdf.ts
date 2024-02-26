import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { Files, Form } from "./contracts";
import { loadU8 } from "./loader";

const addFormPages = async ({
  pdfDoc,
  form,
}: {
  pdfDoc: PDFDocument;
  form: Form;
}) => {
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

  const page = pdfDoc.addPage();
  const { height } = page.getSize();

  const fontSize = 16;
  page.drawText(
    `
  Test document\n
  Identité\n
  Prénom: ${form.identity.firstName}\n
  Nom: ${form.identity.lastName}\n
  Date de naissance: ${JSON.stringify(form.identity.birthDate)}\n
  \n
  Autre\n
  Aime le chocolat: ${form.likeChocolate}\n
  `,
    {
      x: 50,
      y: height - 4 * fontSize,
      size: fontSize,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    }
  );
};

const attachFilesToPdf = async ({
  pdfDoc,
  files,
}: {
  pdfDoc: PDFDocument;
  files: Files;
}) => {
  if (files.identity.card) {
    const cardPdf = await loadU8(files.identity.card);
    const cardPdfDoc = await PDFDocument.load(cardPdf);

    const pages = await pdfDoc.copyPages(
      cardPdfDoc,
      cardPdfDoc.getPageIndices()
    );

    pages.forEach((page) => {
      pdfDoc.addPage(page);
    });
  }
};

export const makePdf = async ({
  form,
  files,
}: {
  form: Form;
  files: Files;
}): Promise<Uint8Array> => {
  const pdfDoc = await PDFDocument.create();

  await addFormPages({
    pdfDoc,
    form,
  });

  await attachFilesToPdf({
    pdfDoc,
    files,
  });

  return await pdfDoc.save();
};
