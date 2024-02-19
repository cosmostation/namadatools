import {
  Card,
  CardContent,
  CardCover,
  Grid,
  Stack,
  Table,
  Typography,
} from "@mui/joy";
import { ellipsisAddress, formatDecimal } from "@/utils/strings";
import { useEffect, useState } from "react";

import { useChainInfos } from "@/hooks/useChainInfos";
import { useSigningInfos } from "@/hooks/useSigningInfos";
import { useValidators } from "@/hooks/useValidators";
import { useValidatorsAlias } from "@/hooks/useValidatorsAlias";

export const Validator = () => {
  const [aggregatedValidator, setAggregatedValidator] = useState([]);
  const { validators } = useValidators();
  const { data: signingInfos } = useSigningInfos();
  const { data: chainInfos } = useChainInfos();
  const { data: validatorsAlias } = useValidatorsAlias();

  useEffect(() => {
    if (!signingInfos || !validatorsAlias || !validators) {
      return;
    }

    const aggregatedInfo = validators.map((validator: any) => {
      const signingInfo = signingInfos.find(
        (info: any) => info.tendermint_address === validator.address
      );

      const aliasInfo = validatorsAlias[validator.address];

      const aggregatedInfo = {
        address: validator.address,
        voting_power: validator.voting_power,
        proposer_priority: validator.proposer_priority,
        missed_blocks: signingInfo?.missed_block_counter,
        alias: aliasInfo?.alias,
        nam_address: aliasInfo?.nam_address,
        net_address: aliasInfo?.net_address,
      };

      return aggregatedInfo;
    });
    setAggregatedValidator(aggregatedInfo);
  }, [signingInfos, validatorsAlias]);

  return (
    <Stack spacing={3}>
      {chainInfos && (
        <Grid container spacing={1}>
          <Grid xs={3}>
            <Card>
              <Typography level="body-sm">Current Epoch</Typography>
              <Typography level="h4">{chainInfos.current_epoch}</Typography>
            </Card>
          </Grid>
          <Grid xs={3}>
            <Card>
              <Typography level="body-sm">Liveness Window Check</Typography>
              <Typography level="h4">
                {chainInfos.liveness_window_check}
              </Typography>
            </Card>
          </Grid>
          <Grid xs={3}>
            <Card>
              <Typography level="body-sm">Liveness Threshold</Typography>
              <Typography level="h4">
                {chainInfos.liveness_threshold}
              </Typography>
            </Card>
          </Grid>
          <Grid xs={3}>
            <Card>
              <Typography level="body-sm">Missing Vote Threshold</Typography>
              <Typography level="h4">
                {(
                  (1 - chainInfos.liveness_threshold) *
                  chainInfos.liveness_window_check
                ).toFixed()}
              </Typography>
            </Card>
          </Grid>
        </Grid>
      )}
      <Stack spacing={1}>
        <Typography level="title-lg">Validators</Typography>
        <Table>
          <thead>
            <tr>
              <th>Moniker</th>
              <th>Validator Address</th>
              <th>Tendermint Address</th>
              <th>Epoch Uptime</th>
              <th>Missing Count</th>
              <th>Voting Power</th>
            </tr>
          </thead>
          <tbody>
            {aggregatedValidator &&
              chainInfos &&
              aggregatedValidator.map((validator: any, index: number) => {
                return (
                  <tr key={index}>
                    <td>
                      {validator.alias ?? ellipsisAddress(validator.address)}
                    </td>
                    <td>{ellipsisAddress(validator.address)}</td>
                    <td>
                      {validator.nam_address
                        ? ellipsisAddress(validator.nam_address)
                        : "-"}
                    </td>
                    <td>
                      {(
                        100 -
                        (validator.missed_blocks /
                          chainInfos.liveness_window_check) *
                          100
                      ).toFixed(1)}
                      %
                    </td>
                    <td>
                      {validator.missed_blocks} /{" "}
                      {chainInfos.liveness_window_check}
                    </td>
                    <td>{formatDecimal(validator.voting_power, 6, 2)}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </Stack>
    </Stack>
  );
};
