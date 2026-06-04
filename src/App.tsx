import { useEffect, useState } from "react";
import {
  Alert,
  Badge,
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
import Games from "@/components/Games";
import Header from "@/components/Header";
import Leaderboard from "@/components/Leaderboard";
import Players from "@/components/Players";
import { useSheetsData } from "@/hooks/useSheetsData";
import { getStoredIds, removeId, saveId } from "@/utils/handleSheetIds";

export default function App() {
  const params = new URLSearchParams(window.location.search);
  const sheetId = params.get("id") || undefined;

  const { data, loading, error } = useSheetsData(sheetId);

  const [input, setInput] = useState<string>("");
  const [recentIds, setRecentIds] = useState<string[]>(getStoredIds());
  const [loadingId, setLoadingId] = useState<boolean>(false);

  const isValid = /^[a-zA-Z0-9-_]{20,}$/.test(input);

  useEffect(() => {
    if (!sheetId) return;

    if (!loading && !error && data.length >= 0) {
      saveId(sheetId);
      setRecentIds(getStoredIds());
      setLoadingId(false);
    }
  }, [sheetId, loading, error, data]);

  const handleRemove = (id: string) => {
    removeId(id);
    setRecentIds(getStoredIds());
  };

  const handleLoad = () => {
    setLoadingId(true);
    window.location.search = `?id=${input}`;
  };

  if (sheetId && loading) {
    return (
      <Center h="100vh">
        <Loader type="dots" size="xl" />
      </Center>
    );
  }

  if (sheetId && !error) {
    return (
      <Container size="lg" pt={70}>
        <Header />

        <Flex gap={16} direction="column">
          <Leaderboard data={data} />
          <Games data={data} />
          <Players data={data} />
          <FanFacts data={data} />
        </Flex>

        <Divider my="md" />

        <Footer />
      </Container>
    );
  }

  return (
    <Center h="100vh">
      <Flex direction="column" gap="xs" maw={500} w="100%">
        <Header />

        <Text>Paste your Google Sheets ID</Text>

        <TextInput
          placeholder="Paste your Google Sheets ID"
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
          mb={10}
        />

        <Button disabled={!isValid || loadingId} onClick={handleLoad}>
          {loadingId ? "Loading..." : "Load"}
        </Button>

        {error && (
          <Alert color="red" title="Loading failed" mt={10}>
            Invalid or inaccessible sheet
          </Alert>
        )}

        {recentIds.length > 0 && (
          <Text size="sm" mt={15}>
            Recently used IDs
          </Text>
        )}

        <Flex direction="column" gap={6}>
          {recentIds.map((id) => (
            <Badge
              key={id}
              size="lg"
              style={{ cursor: "pointer", textTransform: "none" }}
              rightSection={
                <Text
                  size="md"
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(id);
                  }}
                  ms={5}
                >
                  ✕
                </Text>
              }
              onClick={() => {
                window.location.search = `?id=${id}`;
              }}
              variant="gradient"
            >
              {id}
            </Badge>
          ))}
        </Flex>

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
                rel="noopener noreferrer"
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
