"use client";

import {
  Badge,
  Card,
  Chip,
  Container,
  Stack,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Typography,
} from "@mui/joy";

import { Block } from "@/components/Block";
import { NamadaInfo } from "@/components/NamadaInfo";
import { Transaction } from "@/components/Transaction";
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
              {status &&
              Math.abs(
                new Date(status.result.sync_info.latest_block_time).getTime() -
                  new Date().getTime()
              ) >
                1000 * 60 * 10 ? (
                <Chip color="danger" variant="solid">
                  Halt
                </Chip>
              ) : (
                <Chip color="success" variant="solid">
                  Live
                </Chip>
              )}
              <br />
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
              <Tab disableIndicator>Block</Tab>
              <Tab disableIndicator>Transaction</Tab>
            </TabList>
            <TabPanel value={0}>
              <Validator />
            </TabPanel>
            <TabPanel value={1}>
              <NamadaInfo />
            </TabPanel>
            <TabPanel value={2}>
              <Block />
            </TabPanel>
            <TabPanel value={3}>
              <Transaction />
            </TabPanel>
          </Tabs>
        </Stack>
      </Card>
    </Container>
  );
}

export default App;
