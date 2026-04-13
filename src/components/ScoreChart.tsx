import { Table, Paper, Title } from "@mantine/core";
import { GameRecord } from "@/types";

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

  return (
    <Paper p="md" shadow="sm" radius="md">
      <Title order={3} mb="sm">
        🏆 Championship Standings
      </Title>

      <Table striped highlightOnHover>
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
    </Paper>
  );
}
