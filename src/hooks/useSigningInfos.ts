import { useBaseHooks } from "./useBaseHooks";

export const useSigningInfos = () => {
  return useBaseHooks(
    `${process.env.NEXT_PUBLIC_NAMADA_INDEXER_HOST}/validator_siging_infos`
  );
};
