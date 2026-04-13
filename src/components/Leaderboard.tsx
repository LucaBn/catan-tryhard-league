import { Table, Paper, Title } from "@mantine/core";
import { GameRecord } from "@/types";

type Props = {
  data: GameRecord[];
};

export default function Leaderboard({ data }: Props) {
  const totals: Record<string, number> = {};

  data.forEach((d) => {
    totals[d.player] = (totals[d.player] || 0) + d.points;
  });

  const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1]);

  return (
    <Paper p="md" shadow="sm">
      <Title order={3} mb="sm">
        Leaderboard
      </Title>

      <Table>
        <thead style={{ textAlign: "left" }}>
          <tr>
            <th>Player</th>
            <th>Total Points</th>
          </tr>
        </thead>

        <tbody>
          {sorted.map(([player, points]) => (
            <tr key={player}>
              <td>{player}</td>
              <td>{points}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Paper>
  );
}
