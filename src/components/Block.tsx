import { Button, Input, Stack, Typography } from "@mui/joy";

import axios from "axios";
import { useState } from "react";

export const Block = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState();
  const [title, setTitle] = useState("");
  const search = async () => {
    try {
      const block = await axios.get(
        `${process.env.NEXT_PUBLIC_NAMADA_INDEXER_HOST}/block/height/${query}`
      );
      setResult(block.data);
      setTitle("Block Search Result");
      return;
    } catch (e) {}
  };
  return (
    <Stack spacing={3}>
      <Stack spacing={2}>
        <Typography level="title-lg">Search Block</Typography>
        <Stack direction="row" spacing={1}>
          <Input
            sx={{ width: "300px" }}
            placeholder="Input block height."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button onClick={search}>Search</Button>
        </Stack>
      </Stack>

      <Stack>
        <Typography level="title-md">{title}</Typography>
        <pre>
          <code>{JSON.stringify(result, null, 2)}</code>
        </pre>
      </Stack>
    </Stack>
  );
};
