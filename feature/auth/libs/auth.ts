import bcrypt from "bcrypt";
export const genHash = async (plain: string): Promise<string> =>
  new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) reject(err);
      bcrypt.hash(plain, salt, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    });
  });

export const compareHash = async (
  plain: string,
  hash: string
): Promise<boolean> =>
  new Promise((resolve, reject) => {
    bcrypt.compare(plain, hash, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
