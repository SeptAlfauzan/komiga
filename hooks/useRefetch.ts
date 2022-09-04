import axios from "axios";
import React from "react";

export const useRefetch = (initialData: any, endPointURL: string) => {
  const [data, setData] = React.useState<typeof initialData[]>(initialData);
  React.useEffect(() => {
    const refecth = async () => {
      try {
        setData(await (await axios.get(endPointURL)).data);
      } catch (error) {
        alert(error);
      }
    };
    refecth();
  }, [initialData, endPointURL]);

  return [data] as const;
};
