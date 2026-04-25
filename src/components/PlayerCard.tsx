import { Sparkline } from "@mantine/charts";
import { Avatar, Badge, Card, Group, Stack, Text } from "@mantine/core";

import { getColorFromPlayerName } from "@/utils/getColorFromPlayerName";

import { GameRecord } from "../types";

type Props = {
  player: string;
  data: GameRecord[];
  sorting?: string | null;
};

export default function PlayerCard({ player, data, sorting }: Props) {
  const games = data.filter((d) => d.player === player);

  const wins = games.filter((g) => g.points === 10).length;
  const total = games.reduce((sum, g) => sum + g.points, 0);
  const avgNum = games.length ? total / games.length : 0;
  const avg = games.length ? avgNum.toFixed(2) : "0";
  const winRate = games.length
    ? ((wins / games.length) * 100).toFixed(0) + "%"
    : "0%";
  const variance = games.length
    ? (
        games.reduce((sum, g) => sum + Math.pow(g.points - avgNum, 2), 0) /
        games.length
      ).toFixed(2) || 0
    : "0";

  const initial = player.charAt(0).toUpperCase();
  const color = getColorFromPlayerName(player);

  const last10 = games.slice(-10);
  const chartData = last10.map((g) => g.points);

  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <Group align="center" gap="md">
        <Avatar radius="xl" size="lg" color={color}>
          {initial}
        </Avatar>

        <Stack gap={0} style={{ flex: 1 }}>
          <Text fw={700} size="lg">
            {player}
          </Text>

          <Text size="xs" c="dimmed">
            Description about {player} goes here. Maybe their playstyle or
            favorite strategies.
          </Text>
        </Stack>

        <Group gap="xs">
          <Group gap="xs">
            <Badge variant={sorting === "games" ? "filled" : "outline"}>
              Games: {games.length}
            </Badge>
            <Badge variant={sorting === "wins" ? "filled" : "outline"}>
              Wins 👑: {wins}
            </Badge>
            <Badge variant={sorting === "total" ? "filled" : "outline"}>
              Total pts: {total}
            </Badge>
          </Group>
          <Badge variant={sorting === "winRate" ? "filled" : "outline"}>
            Win rate: {winRate}
          </Badge>
          <Badge variant={sorting === "avg" ? "filled" : "outline"}>
            Avg points: {avg}
          </Badge>
          <Badge variant={sorting === "variance" ? "filled" : "outline"}>
            Variance: {variance}
          </Badge>
        </Group>

        {games.length > 1 && (
          <Group gap={0} align="center">
            <Sparkline
              w={200}
              h={60}
              data={chartData}
              curveType="linear"
              color={color}
              fillOpacity={0.6}
              strokeWidth={2}
              p={0}
            />
            <Text size="xs" c="dimmed" mt={4}>
              Last {chartData.length < 10 ? chartData.length : 10} games
              performance
            </Text>
          </Group>
        )}
      </Group>
    </Card>
  );
}
