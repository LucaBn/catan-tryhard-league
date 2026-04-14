import { useMemo, useState } from "react";
import { Flex, Group, Paper, Select, Table, Text, Title } from "@mantine/core";

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
  avg: number;
  winRate: number;
};

export default function Leaderboard({ data }: Props) {
  const [sortBy, setSortBy] = useState<string>("totalPoints");
  const [direction, setDirection] = useState<"asc" | "desc">("desc");

  const gamesMap: Record<string, Record<string, number>> = {};

  data.forEach((row) => {
    const key = row.game;

    if (!gamesMap[key]) gamesMap[key] = {};

    gamesMap[key][row.player] = (gamesMap[key][row.player] || 0) + row.points;
  });

  const stats = useMemo(() => {
    const statsObj: Record<string, PlayerStats> = {};

    Object.values(gamesMap).forEach((game) => {
      Object.entries(game).forEach(([player, points]) => {
        if (!statsObj[player]) {
          statsObj[player] = {
            player,
            games: 0,
            totalPoints: 0,
            wins: 0,
            avg: 0,
            winRate: 0,
          };
        }

        statsObj[player].games += 1;
        statsObj[player].totalPoints += points;

        if (points >= 10) {
          statsObj[player].wins += 1;
        }
      });
    });

    Object.values(statsObj).forEach((p) => {
      p.avg = p.games ? p.totalPoints / p.games : 0;
      p.winRate = p.games ? (p.wins / p.games) * 100 : 0;
    });

    return statsObj;
  }, [data]);

  const sorted = useMemo(() => {
    const arr = Object.values(stats);

    return [...arr].sort((a, b) => {
      const valA = a[sortBy as keyof PlayerStats] as number;
      const valB = b[sortBy as keyof PlayerStats] as number;

      return direction === "asc" ? valA - valB : valB - valA;
    });
  }, [stats, sortBy, direction]);

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

      <Group gap={2} mb="md">
        <Text me={8}>Sort by:</Text>

        <Group justify="flex-start" wrap="wrap" gap={8}>
          <Select
            w="40%"
            maw={200}
            value={sortBy}
            onChange={(v) => setSortBy(v || "totalPoints")}
            data={[
              { value: "totalPoints", label: "Total points" },
              { value: "avg", label: "Average points" },
              { value: "wins", label: "Wins" },
              { value: "winRate", label: "Win Rate" },
              { value: "games", label: "Games" },
            ]}
          />

          <Select
            w="40%"
            maw={200}
            value={direction}
            onChange={(v) => setDirection((v as "asc" | "desc") || "desc")}
            data={[
              { value: "desc", label: "Desc" },
              { value: "asc", label: "Asc" },
            ]}
          />
        </Group>
      </Group>

      <Group maw="100%" style={{ overflowX: "auto" }}>
        <Table striped withRowBorders={false} highlightOnHover mb={24}>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Player</Table.Th>
              <Table.Th>Games</Table.Th>
              <Table.Th>Wins 👑</Table.Th>
              <Table.Th>Win Rate</Table.Th>
              <Table.Th>Total Points</Table.Th>
              <Table.Th>Avg Points</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>
            {sorted.map((p) => (
              <Table.Tr key={p.player}>
                <Table.Td>{p.player}</Table.Td>
                <Table.Td>{p.games}</Table.Td>
                <Table.Td>{p.wins}</Table.Td>
                <Table.Td>{p.winRate.toFixed(0)}%</Table.Td>
                <Table.Td>{p.totalPoints}</Table.Td>
                <Table.Td>{p.avg.toFixed(1)}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </Group>

      <Flex mt="xl" gap="xl" justify="center" wrap="wrap">
        <ScorePieCharts pointsData={pointsData} winsData={winsData} />
      </Flex>

      <Flex mt="xl" justify="center">
        <ScoreProgressChart data={data} />
      </Flex>
    </Paper>
  );
}
