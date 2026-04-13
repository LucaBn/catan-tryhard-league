import { Center, Container, Divider, Flex, Loader } from "@mantine/core";

import Footer from "@/components/Footer";
import GamesTable from "@/components/GamesTable";
import Header from "@/components/Header";
import Leaderboard from "@/components/Leaderboard";
import Players from "@/components/Players";
import { useSheetsData } from "@/hooks/useSheetsData";

export default function App() {
  const { data, loading } = useSheetsData();

  if (loading) {
    return (
      <Center h="100vh">
        <Loader />
      </Center>
    );
  }

  return (
    <Container size="lg">
      <Header />

      <Divider my="md" />

      <Flex gap={16} direction="column">
        <Leaderboard data={data} />
        <GamesTable data={data} />
        <Players data={data} />
      </Flex>

      <Divider my="md" />

      <Footer />
    </Container>
  );
}
