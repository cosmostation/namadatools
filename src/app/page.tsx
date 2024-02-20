"use client";

import {
  Card,
  Container,
  Stack,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Typography,
} from "@mui/joy";

import { NamadaInfo } from "@/components/NamadaInfo";
import { Search } from "@/components/Search";
import { Validator } from "@/components/Validator";
import { useState } from "react";
import { useStatus } from "@/hooks/\buseStatus";

function App() {
  const [index, setIndex] = useState(0);
  const { data: status } = useStatus();
  return (
    <Container>
      <Card sx={{ m: 5 }}>
        <Stack spacing={3}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography level="h1">Namada Tools ⚒️</Typography>
            <Typography level="body-sm">
              Last Block Height:
              {status && status.result.sync_info.latest_block_height}
              <br />
              Last Block Time:
              {status &&
                new Date(
                  status.result.sync_info.latest_block_time
                ).toLocaleString()}
            </Typography>
          </Stack>

          <Tabs
            value={index}
            onChange={(event, value) => setIndex(value as number)}
          >
            <TabList disableUnderline sx={{ mb: 3 }}>
              <Tab disableIndicator>Validators</Tab>
              <Tab disableIndicator>Namada Infos</Tab>
              <Tab disableIndicator>Transaction, Block</Tab>
            </TabList>
            <TabPanel value={0}>
              <Validator />
            </TabPanel>
            <TabPanel value={1}>
              <NamadaInfo />
            </TabPanel>
            <TabPanel value={2}>
              <Search />
            </TabPanel>
          </Tabs>
        </Stack>
      </Card>
    </Container>
  );
}

export default App;
