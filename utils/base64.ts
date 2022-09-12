import { FileWithPath } from "file-selector";

export const getBase64string = async (file: FileWithPath): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      // Use a regex to remove data url
      try {
        const base64String = reader.result
          ?.toString()
          .replace("data:", "")
          .replace(/^.+,/, "");

        return resolve(base64String!);
      } catch (error) {
        return reject(error);
      }
    };
    reader.readAsDataURL(file);
  });
};
export const getImageUrl = async (file: FileWithPath): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      // Use a regex to remove data url
      try {
        const url = reader.result?.toString();

        return resolve(url!);
      } catch (error) {
        return reject(error);
      }
    };
    reader.readAsDataURL(file);
  });
};
