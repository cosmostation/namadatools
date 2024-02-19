import { Button, Input, Stack, Typography } from "@mui/joy";

import axios from "axios";
import { useState } from "react";

export const Search = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState();
  const search = async () => {
    try {
      const block = await axios.get(
        `http://222.106.187.14:56530/block/height/${query}`
      );
      setResult(block.data);
    } catch (e) {}
    try {
      const tx = await axios.get(`http://222.106.187.14:56530/tx/${query}`);
      setResult(tx.data);
    } catch (e) {}
  };
  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography level="title-lg">Search</Typography>
        <Stack direction="row" spacing={1}>
          <Input
            sx={{ width: "300px" }}
            placeholder="Input tx hash or block height."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button onClick={search}>Search</Button>
        </Stack>
      </Stack>
      <pre>
        <code>{JSON.stringify(result, null, 2)}</code>
      </pre>
    </Stack>
  );
};
