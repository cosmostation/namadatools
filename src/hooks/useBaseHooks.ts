import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useBaseHooks = (url: string, interval: number = 300000) => {
  const { data, error } = useSWR(url, fetcher, {
    refreshInterval: interval,
    shouldRetryOnError: false,
  });

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
