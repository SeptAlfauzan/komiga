export const toJSON = (arg: any) =>
  JSON.stringify(
    arg,
    (key, value) => (typeof value === "bigint" ? Number(value) : value) // return everything else unchanged
  );
