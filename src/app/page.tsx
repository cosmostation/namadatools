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

function App() {
  const [index, setIndex] = useState(0);
  return (
    <Container>
      <Card sx={{ m: 5 }}>
        <Stack spacing={3}>
          <Typography level="h1">Namada Tools ⚒️</Typography>

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