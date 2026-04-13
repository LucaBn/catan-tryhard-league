import { Card, Text, Badge } from "@mantine/core";
import { GameRecord } from "../types";

type Props = {
  player: string;
  data: GameRecord[];
};

export default function PlayerCard({ player, data }: Props) {
  const games = data.filter((d) => d.player === player);

  const total = games.reduce((sum, g) => sum + g.points, 0);
  const avg = games.length ? (total / games.length).toFixed(2) : "0";

  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <Text fw={700} size="lg">
        {player}
      </Text>

      <Text size="sm">Games: {games.length}</Text>
      <Text size="sm">Average: {avg}</Text>

      <Badge mt="sm" color="blue">
        {total} points
      </Badge>
    </Card>
  );
}
