import { useState } from "react";
import {
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Loader,
  Text,
  TextInput,
} from "@mantine/core";

import FanFacts from "@/components/FanFacts";
import Footer from "@/components/Footer";
import GamesTable from "@/components/GamesTable";
import Header from "@/components/Header";
import Leaderboard from "@/components/Leaderboard";
import Players from "@/components/Players";
import { useSheetsData } from "@/hooks/useSheetsData";

const colorList = ["blue", "green", "red", "purple"];

export default function App() {
  const params = new URLSearchParams(window.location.search);
  const sheetId = params.get("id") || undefined;

  const { data, loading } = useSheetsData(sheetId);

  const [input, setInput] = useState<string>("");

  const isValid = /^[a-zA-Z0-9-_]{20,}$/.test(input);

  if (!sheetId) {
    return (
      <Center h="100vh">
        <Flex direction="column" gap="md" maw={400} w="100%">
          <Header />

          <Text size="sm">Paste your Google Sheets ID</Text>

          <TextInput
            placeholder="Paste your Google Sheets ID"
            value={input}
            onChange={(e) => setInput(e.currentTarget.value)}
          />

          <Button
            disabled={!isValid}
            onClick={() => {
              window.location.search = `?id=${input}`;
            }}
          >
            Load
          </Button>
        </Flex>
      </Center>
    );
  }

  const randomColor = colorList[Math.floor(Math.random() * colorList.length)];

  if (loading) {
    return (
      <Center h="100vh">
        <Loader type="dots" size="xl" color={randomColor} />
      </Center>
    );
  }

  return (
    <Container size="lg" pt={70}>
      <Header />

      <Flex gap={16} direction="column">
        <Leaderboard data={data} />
        <GamesTable data={data} />
        <Players data={data} />
        <FanFacts data={data} />
      </Flex>

      <Divider my="md" />

      <Footer />
    </Container>
  );
}
