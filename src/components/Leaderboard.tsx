import { Flex, Paper, Table, Title } from "@mantine/core";

import { ScorePieCharts } from "@/components/ScorePieCharts";
import ScoreProgressChart from "@/components/ScoreProgressChart";
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

export default function Leaderboard({ data }: Props) {
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
        🏆 Leaderboard
      </Title>

      <Table striped withRowBorders={false} highlightOnHover mb={24}>
        <Table.Thead>
          <Table.Tr style={{ textAlign: "left" }}>
            <Table.Th>Player</Table.Th>
            <Table.Th>Games</Table.Th>
            <Table.Th>Total Points</Table.Th>
            <Table.Th>Wins 👑</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {sorted.map((p) => (
            <Table.Tr key={p.player}>
              <Table.Td>{p.player}</Table.Td>
              <Table.Td>{p.games}</Table.Td>
              <Table.Td>{p.totalPoints}</Table.Td>
              <Table.Td>{p.wins}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      <Flex gap="xl" justify="center" wrap="wrap">
        <ScorePieCharts pointsData={pointsData} winsData={winsData} />
      </Flex>

      <Flex>
        <ScoreProgressChart data={data} />
      </Flex>
    </Paper>
  );
}
