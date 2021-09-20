import { URL } from "url";

export const validateUrl = async (url: string) => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
};
