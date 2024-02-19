import { Stack, Table, Typography } from "@mui/joy";
import { useEffect, useState } from "react";

import { useSigningInfos } from "@/hooks/useSigningInfos";
import { useValidators } from "@/hooks/useValidators";

export const Validator = () => {
  const [aggregatedValidator, setAggregatedValidator] = useState();
  const { data: validators } = useValidators();
  const { data: signingInfos } = useSigningInfos();
  useEffect(() => {
    if (!signingInfos) {
      return;
    }

    const transformedData = signingInfos.reduce(
      (acc: any, { validator_address, missed_block_counter }: any) => {
        acc[validator_address] = missed_block_counter;
        return acc;
      },
      {}
    );
    setAggregatedValidator(transformedData);
  }, [signingInfos]);
  return (
    <Stack spacing={1}>
      <Typography level="title-lg">Validators</Typography>
      <Table>
        <thead>
          <tr>
            <th>Moniker</th>
            <th style={{ width: "60%" }}>Address</th>
            <th>Missing Count</th>
          </tr>
        </thead>
        <tbody>
          {validators &&
            Object.keys(validators).map((key: any, index: number) => {
              const validator = validators[key];
              return (
                <tr key={index}>
                  <td>{validator.alias}</td>
                  <td>{validator.nam_address}</td>
                  <td>
                    {aggregatedValidator &&
                      aggregatedValidator[validator.nam_address]}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </Stack>
  );
};
