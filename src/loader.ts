import { strFromU8, unzipSync } from "fflate";
import { Files, Form } from "./contracts";

export const loadU8 = async (file: File): Promise<Uint8Array> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.addEventListener("load", (e) => {
      if (!e.target) {
        reject("No content");
        return;
      }

      if (e.target.result instanceof ArrayBuffer) {
        const uInt8Array = new Uint8Array(e.target.result);
        resolve(uInt8Array);
      } else {
        reject("Not of type ArrayBuffer");
      }
    });

    reader.readAsArrayBuffer(file);
  });
};

export const loadZip = async (
  file: File
): Promise<{ form: Form; files: Files }> => {
  const unzipped = unzipSync(await loadU8(file));

  const form: Form = JSON.parse(strFromU8(unzipped["data.json"]));

  const files: Files = {
    identity: {
      card: new File([unzipped["identity.card.pdf"]], "identity.card.pdf"),
    },
  };

  return {
    form,
    files,
  };
};
