import { Stack, Table, Typography } from "@mui/joy";

import { useChainInfos } from "@/hooks/useChainInfos";
import { useShieldedAssets } from "@/hooks/useShieldedAssets";

export const NamadaInfo = () => {
  const { data: assets } = useShieldedAssets();
  const { data: chainInfos } = useChainInfos();
  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography level="title-lg">Chain Infos</Typography>
        <Table>
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {chainInfos &&
              Object.keys(chainInfos).map((key: any, index: number) => {
                const info = chainInfos[key];
                return (
                  <tr key={index}>
                    <td>{key}</td>
                    <td>{info}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Stack>
      <Stack spacing={1}>
        <Typography level="title-lg">Sheilded Assets</Typography>
        <Table>
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {assets &&
              assets["shielded_assets"] &&
              Object.keys(assets["shielded_assets"]).map(
                (key: any, index: number) => {
                  const info = assets["shielded_assets"][key];
                  return (
                    <tr key={index}>
                      <td>{key}</td>
                      <td>{info}</td>
                    </tr>
                  );
                }
              )}
          </tbody>
        </Table>
      </Stack>
    </Stack>
  );
};
