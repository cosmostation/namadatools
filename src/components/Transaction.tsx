import { Button, Input, Stack, Typography } from "@mui/joy";

import axios from "axios";
import { useState } from "react";

export const Transaction = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState();
  const [decryped, setDecrypted] = useState();
  const [title, setTitle] = useState("");
  const search = async () => {
    try {
      const tx = await axios.get(
        `${process.env.NEXT_PUBLIC_NAMADA_INDEXER_HOST}/tx/${query}`
      );
      setResult(tx.data);
      if (tx.data.wrapper_id !== "") {
      }
      const wrappedTx = await axios.get(
        `${process.env.NEXT_PUBLIC_NAMADA_INDEXER_HOST}/wrapped_tx/${query}`
      );
      setDecrypted(wrappedTx.data);
      setTitle("Transaction Search Result");
      return;
    } catch (e) {}
  };
  return (
    <Stack spacing={3}>
      <Stack spacing={2}>
        <Typography level="title-lg">Search Transaction</Typography>
        <Stack direction="row" spacing={1}>
          <Input
            sx={{ width: "300px" }}
            placeholder="Input tx hash."
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
      {decryped && (
        <Stack>
          <Typography level="title-md">Decrypted Transaction</Typography>
          <pre>
            <code>{JSON.stringify(decryped, null, 2)}</code>
          </pre>
        </Stack>
      )}
    </Stack>
  );
};
