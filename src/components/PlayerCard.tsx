import { Avatar, Badge, Card, Group, Stack, Text } from "@mantine/core";

import { getColorFromPlayerName } from "@/utils/getColorFromPlayerName";

import { GameRecord } from "../types";

type Props = {
  player: string;
  data: GameRecord[];
};

export default function PlayerCard({ player, data }: Props) {
  const games = data.filter((d) => d.player === player);

  const wins = games.filter((g) => g.points === 10).length;
  const total = games.reduce((sum, g) => sum + g.points, 0);
  const avg = games.length ? (total / games.length).toFixed(2) : "0";

  const initial = player.charAt(0).toUpperCase();
  const color = getColorFromPlayerName(player);

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
          <Badge variant="light">Games: {games.length}</Badge>
          <Badge variant="light">👑: {wins}</Badge>
          <Badge variant="light">Avg: {avg}</Badge>
          <Badge color={color}>{total} pts</Badge>
        </Group>
      </Group>
    </Card>
  );
}
