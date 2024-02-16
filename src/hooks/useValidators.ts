import axios from "axios";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useValidators = () => {
  const { data, error } = useSWR(
    "https://namada.info/shielded-expedition.88f17d1d14/output/genesis_tm_address_to_alias.json",
    fetcher,
    {
      refreshInterval: 60000,
    }
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
