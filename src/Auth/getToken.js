import { getItem } from "../Services/localStorageService";

export const getToken = () => {
  return getItem("token") || "";
};
