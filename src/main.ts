import { Files } from "./contracts";
import { emptyForm } from "./form";
import { loadFromStorage } from "./storage/local";
import { setupDOM } from "./ui/dom";

const form = emptyForm();

const files: Files = {
  identity: {
    card: null,
  },
};

const { loadForm } = setupDOM({
  form,
  files,
});

loadForm(loadFromStorage().form);
