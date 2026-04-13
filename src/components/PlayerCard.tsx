import { Card, Text, Badge, Avatar, Group, Stack } from "@mantine/core";
import { GameRecord } from "../types";

type Props = {
  player: string;
  data: GameRecord[];
};

export default function PlayerCard({ player, data }: Props) {
  const games = data.filter((d) => d.player === player);

  const total = games.reduce((sum, g) => sum + g.points, 0);
  const avg = games.length ? (total / games.length).toFixed(2) : "0";

  const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${player}`;

  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <Group align="center" gap="md">
        <Avatar src={avatarUrl} radius="xl" size="lg" />

        <Stack gap={0}>
          <Text fw={700} size="lg">
            {player}
          </Text>

          <Text size="xs" c="dimmed">
            Description about {player} goes here. Maybe their playstyle or
            favorite strategies. This is just placeholder text for now.
          </Text>
        </Stack>

        <Group gap="xs">
          <Badge variant="light">Games: {games.length}</Badge>
          <Badge variant="light">Avg: {avg}</Badge>
          <Badge color="blue">{total} pts</Badge>
        </Group>
      </Group>
    </Card>
  );
}
