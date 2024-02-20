import { useBaseHooks } from "./useBaseHooks";

export const useStatus = () => {
  return useBaseHooks(`${process.env.NEXT_PUBLIC_NAMADA_RPC_HOST}/status`);
};
