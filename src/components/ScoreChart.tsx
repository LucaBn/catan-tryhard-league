import { Table, Paper, Title, Text, Flex } from "@mantine/core";
import { PieChart } from "@mantine/charts";
import { GameRecord } from "@/types";
import { getColorFromPlayerName } from "@/utils/getColorFromPlayerName";

type Props = {
  data: GameRecord[];
};

type PlayerStats = {
  player: string;
  games: number;
  totalPoints: number;
  wins: number;
};

export default function ScoreChart({ data }: Props) {
  const gamesMap: Record<string, Record<string, number>> = {};

  data.forEach((row) => {
    const key = row.game;

    if (!gamesMap[key]) gamesMap[key] = {};

    gamesMap[key][row.player] = (gamesMap[key][row.player] || 0) + row.points;
  });

  const stats: Record<string, PlayerStats> = {};

  Object.values(gamesMap).forEach((game) => {
    Object.entries(game).forEach(([player, points]) => {
      if (!stats[player]) {
        stats[player] = {
          player,
          games: 0,
          totalPoints: 0,
          wins: 0,
        };
      }

      stats[player].games += 1;
      stats[player].totalPoints += points;

      if (points >= 10) {
        stats[player].wins += 1;
      }
    });
  });

  const sorted = Object.values(stats).sort(
    (a, b) => b.totalPoints - a.totalPoints,
  );

  const pointsData = sorted.map((p) => ({
    name: p.player,
    value: p.totalPoints,
    color: getColorFromPlayerName(p.player),
  }));

  const winsData = sorted
    .filter((p) => p.wins > 0)
    .map((p) => ({
      name: p.player,
      value: p.wins,
      color: getColorFromPlayerName(p.player),
    }));

  return (
    <Paper p="md" shadow="sm" radius="md">
      <Title order={3} mb="md">
        🏆 Championship Stats
      </Title>

      <Table striped highlightOnHover mb={24}>
        <thead>
          <tr style={{ textAlign: "left" }}>
            <th>Player</th>
            <th>Games</th>
            <th>Total Points</th>
            <th>Wins 👑</th>
          </tr>
        </thead>

        <tbody>
          {sorted.map((p) => (
            <tr key={p.player}>
              <td>{p.player}</td>
              <td>{p.games}</td>
              <td>{p.totalPoints}</td>
              <td>{p.wins}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Flex gap="xl" justify="center" wrap="wrap">
        <Flex gap="xs" direction="column">
          <Text fz="xs" ta="center">
            Total points
          </Text>
          <PieChart
            data={pointsData}
            withTooltip
            withLabels
            labelsPosition="inside"
          />
        </Flex>
        <Flex gap="xs" direction="column">
          <Text fz="xs" ta="center">
            Total wins
          </Text>
          <PieChart
            data={winsData}
            withTooltip
            withLabels
            labelsPosition="inside"
          />
        </Flex>
      </Flex>
    </Paper>
  );
}
