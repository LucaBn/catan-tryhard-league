import { Center, Container, Divider, Flex, Loader } from "@mantine/core";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Leaderboard from "@/components/Leaderboard";
import MatchesTable from "@/components/MatchesTable";
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

      <Divider mb="md" />

      <Flex gap={16} direction="column">
        <Leaderboard data={data} />
        <MatchesTable data={data} />
        <Players data={data} />
      </Flex>

      <Divider mb="md" />

      <Footer />
    </Container>
  );
}
