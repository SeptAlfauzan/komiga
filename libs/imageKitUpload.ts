import axios from "axios";

export const uploadImageKit = async (
  imageBase64: string,
  imageName: string
): Promise<string> => {
  try {
    const responsetoken = await axios.get("/api/imagekitAuth");
    const { signature, expire, token } = responsetoken.data;

    const body = {
      file: imageBase64,
      publicKey: process.env.NEXT_PUBLIC_publicKey,
      fileName: imageName,
      signature,
      expire,
      token,
    };
    console.log("test", body);
    const response = await axios.post(
      "https://upload.imagekit.io/api/v1/files/upload",
      body,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    const { url } = response.data;
    return url;
  } catch (error) {
    return `${error}`;
  }
};
