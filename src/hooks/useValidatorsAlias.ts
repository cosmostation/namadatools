import { useBaseHooks } from "./useBaseHooks";

export const useValidatorsAlias = () => {
  return useBaseHooks(
    "https://namada.info/shielded-expedition.88f17d1d14/output/genesis_tm_address_to_alias.json"
  );
};
