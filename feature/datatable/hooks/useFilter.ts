import { useEffect, useState } from "react";

export const useFilter = (data: any[], keyword: string) => {
  const [result, setResult] = useState<typeof data>([]);
  useEffect(() => {
    setResult(
      data.filter(
        (item) =>
          JSON.stringify(item).toLowerCase().indexOf(keyword.toLowerCase()) !==
          -1
      )
    );
  }, [data, keyword]);
  return [result] as const;
};
