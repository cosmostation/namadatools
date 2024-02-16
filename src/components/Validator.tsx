import { Stack, Table, Typography } from "@mui/joy";

import { useValidators } from "@/hooks/useValidators";

export const Validator = () => {
  const { data: validators } = useValidators();
  return (
    <Stack spacing={1}>
      <Typography level="title-lg">Validators</Typography>
      <Table>
        <thead>
          <tr>
            <th>Moniker</th>
            <th>Address</th>
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
                </tr>
              );
            })}
        </tbody>
      </Table>
    </Stack>
  );
};
