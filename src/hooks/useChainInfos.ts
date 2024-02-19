import { useBaseHooks } from "./useBaseHooks";

export const useChainInfos = () => {
  return useBaseHooks(`${process.env.NEXT_PUBLIC_NAMADA_RPC_HOST}/chain_info`);
};
