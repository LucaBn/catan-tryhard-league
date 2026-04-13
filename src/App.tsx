import {
  Container,
  Title,
  Divider,
  Flex,
  Grid,
  Center,
  Loader,
} from "@mantine/core";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScoreChart from "@/components/ScoreChart";
import Leaderboard from "@/components/Leaderboard";
import PlayerCard from "@/components/PlayerCard";

import { useSheetsData } from "@/hooks/useSheetsData";

export default function App() {
  const { data, loading } = useSheetsData();

  const players = [...new Set(data.map((d) => d.player))];

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
      </Flex>

      <Title order={3} mt="xl" mb="sm">
        Players
      </Title>

      <Grid>
        {players.map((p) => (
          <Grid.Col key={p} span={4}>
            <PlayerCard player={p} data={data} />
          </Grid.Col>
        ))}
      </Grid>

      <Footer />
    </Container>
  );
}
