import { useBaseHooks } from "./useBaseHooks";

export const useShieldedAssets = () => {
  return useBaseHooks(
    `${process.env.NEXT_PUBLIC_NAMADA_INDEXER_HOST}/tx/shielded`
  );
};
