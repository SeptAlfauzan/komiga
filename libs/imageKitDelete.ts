import ImageKit from "imagekit";

// server code
var imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_publicKey!,
  privateKey: process.env.privateKey!,
  urlEndpoint: process.env.NEXT_PUBLIC_urlEndpoint!,
});

export const imageKitDelete = (arg: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    imagekit.deleteFile(arg, function (error, result) {
      if (error) return reject(error);
      resolve(result);
    });
  });
};
