import { useState } from "react";
import {
  Button,
  Center,
  Container,
  Divider,
  Flex,
  List,
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
        <Flex direction="column" gap="xs" maw={500} w="100%">
          <Header />

          <Text size="sm">Paste your Google Sheets ID</Text>

          <TextInput
            placeholder="Paste your Google Sheets ID"
            value={input}
            onChange={(e) => setInput(e.currentTarget.value)}
            mb={15}
          />

          <Button
            disabled={!isValid}
            onClick={() => {
              window.location.search = `?id=${input}`;
            }}
          >
            Load
          </Button>

          <Divider my="sm" />

          <Text fw={600} size="xl">
            Don't have a Google Sheets ID?
          </Text>
          <Flex direction="column" gap={4}>
            <List type="ordered">
              <List.Item>
                Download the example template from{" "}
                <a
                  href="https://docs.google.com/spreadsheets/d/1DrXpjuFCPClz4YB0PTb5zDlS_4__t03xxqlHKz4XVg8"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                >
                  here
                </a>
              </List.Item>
              <List.Item>Make a copy to your Drive</List.Item>
              <List.Item>Update your game results</List.Item>
              <List.Item>Copy the sheet ID from the URL</List.Item>
              <List.Item>Open the app and paste your ID above</List.Item>
            </List>
          </Flex>
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
