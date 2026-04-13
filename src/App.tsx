import { Center, Container, Divider, Flex, Loader } from "@mantine/core";

import Footer from "@/components/Footer";
import GamesTable from "@/components/GamesTable";
import Header from "@/components/Header";
import Leaderboard from "@/components/Leaderboard";
import Players from "@/components/Players";
import { useSheetsData } from "@/hooks/useSheetsData";

const colorList = ["blue", "green", "red", "purple"];

export default function App() {
  const { data, loading } = useSheetsData();

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
      </Flex>

      <Divider my="md" />

      <Footer />
    </Container>
  );
}
