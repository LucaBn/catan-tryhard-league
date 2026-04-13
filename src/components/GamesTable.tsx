import {
  Accordion,
  Badge,
  Group,
  Paper,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";

import { GameRecord } from "@/types";
import { getColorFromPlayerName } from "@/utils/getColorFromPlayerName";

type Props = {
  data: GameRecord[];
};

type GameSummary = {
  game: number;
  date: string;
  players: { player: string; points: number }[];
  winner: string;
};

export default function GamesTable({ data }: Props) {
  const gamesMap: Record<number, GameSummary> = {};

  data.forEach((row) => {
    if (!gamesMap[row.game]) {
      gamesMap[row.game] = {
        game: row.game,
        date: row.date,
        players: [],
        winner: "",
      };
    }

    gamesMap[row.game].players.push({
      player: row.player,
      points: row.points,
    });
  });

  const games = Object.values(gamesMap)
    .map((g) => {
      const winner = [...g.players].sort((a, b) => b.points - a.points)[0]
        .player;

      return { ...g, winner };
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <Paper p="md" shadow="sm" radius="md">
      <Title order={3} mb="md">
        🎮 Games
      </Title>

      <Stack gap="xs">
        {games.map((g) => (
          <Accordion key={g.game} variant="separated">
            <Accordion.Item value={`game-${g.game}`}>
              <Accordion.Control>
                <Group justify="space-between" w="100%">
                  <Text size="sm" c="dimmed">
                    Game {g.game} -{" "}
                    {new Date(g.date).toLocaleDateString("it-IT")}
                  </Text>

                  <Group gap={4} me={8}>
                    <Text size="sm">Won by</Text>
                    <Badge
                      color={getColorFromPlayerName(g.winner)}
                      variant="filled"
                    >
                      {g.winner}
                    </Badge>
                  </Group>
                </Group>
              </Accordion.Control>

              <Accordion.Panel>
                <Table striped withRowBorders={false} highlightOnHover mb={24}>
                  <Table.Thead>
                    <Table.Tr style={{ textAlign: "left" }}>
                      <Table.Th>Player</Table.Th>
                      <Table.Th>Points</Table.Th>
                    </Table.Tr>
                  </Table.Thead>

                  <Table.Tbody>
                    {g.players
                      .sort((a, b) => b.points - a.points)
                      .map((p) => (
                        <Table.Tr key={p.player}>
                          <Table.Td>{p.player}</Table.Td>

                          <Table.Td>
                            <Badge
                              color={getColorFromPlayerName(p.player)}
                              variant="light"
                            >
                              {p.points} pts
                            </Badge>
                          </Table.Td>
                        </Table.Tr>
                      ))}
                  </Table.Tbody>
                </Table>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        ))}
      </Stack>
    </Paper>
  );
}
