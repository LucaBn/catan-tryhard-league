import { Container, Divider, Flex, Center, Loader } from "@mantine/core";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScoreChart from "@/components/ScoreChart";
import Leaderboard from "@/components/Leaderboard";

import { useSheetsData } from "@/hooks/useSheetsData";
import Players from "./components/Players";

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

      <Divider mb="md" />

      <Flex gap={16} direction="column">
        <ScoreChart data={data} />
        <Leaderboard data={data} />
        <Players data={data} />
      </Flex>

      <Divider mb="md" />

      <Footer />
    </Container>
  );
}
