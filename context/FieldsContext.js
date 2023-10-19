import { createContext } from "react";

export const FieldsContext = createContext({
  primary: "",
  setPrimary: () => {},
  secondary: "",
  setSecondary: () => {},
});
