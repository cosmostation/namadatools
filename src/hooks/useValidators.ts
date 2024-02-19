import { useEffect, useState } from "react";

import { fetcher } from "./useBaseHooks";

export const useValidators = () => {
  const [validators, setValidators]: any = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchValidators = async (page = 1) => {
      try {
        const url = `${process.env.NEXT_PUBLIC_NAMADA_RPC_HOST}/validators?per_page=100&page=${page}`;
        const res = await fetcher(url);
        const data = res.result.validators;

        if (data.length > 0) {
          setValidators((prev: any) => [...prev, ...data]);
          if (data.length === 100) {
            fetchValidators(page + 1);
          } else {
            setIsLoading(false);
          }
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch validators", error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchValidators();
  }, []);

  return {
    validators,
    isLoading,
    isError,
  };
};
