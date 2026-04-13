import {
  Accordion,
  Badge,
  Group,
  Paper,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";

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

export default function MatchesTable({ data }: Props) {
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

  const games = Object.values(gamesMap).map((g) => {
    const winner = [...g.players].sort((a, b) => b.points - a.points)[0].player;

    return {
      ...g,
      winner,
    };
  });

  return (
    <Paper p="md" shadow="sm" radius="md">
      <Title order={3} mb="md">
        🎮 Matches
      </Title>

      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>Game</th>
            <th>Winner 👑</th>
            <th>Details</th>
          </tr>
        </thead>

        <tbody>
          {games.map((g) => (
            <tr key={g.game}>
              <td>Game {g.game}</td>

              <td>
                <Badge color={getColorFromPlayerName(g.winner)}>
                  {g.winner}
                </Badge>
              </td>

              <td>
                <Accordion variant="contained">
                  <Accordion.Item value={`game-${g.game}`}>
                    <Accordion.Control icon={<IconChevronDown size={16} />}>
                      View details
                    </Accordion.Control>

                    <Accordion.Panel>
                      <Text size="sm" c="dimmed" mb="sm">
                        Date: {g.date}
                      </Text>

                      {g.players.map((p) => (
                        <Group key={p.player} justify="space-between">
                          <Text>{p.player}</Text>
                          <Badge
                            color={getColorFromPlayerName(p.player)}
                            variant="light"
                          >
                            {p.points} pts
                          </Badge>
                        </Group>
                      ))}
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Paper>
  );
}
