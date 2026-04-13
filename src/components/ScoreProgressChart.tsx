import { LineChart } from "@mantine/charts";

import { GameRecord } from "@/types";
import { getColorFromPlayerName } from "@/utils/getColorFromPlayerName";

type Props = {
  data: GameRecord[];
};

export default function ScoreProgressChart({ data }: Props) {
  const sorted = [...data].sort((a, b) => a.game - b.game);

  const players = [...new Set(sorted.map((d) => d.player))];

  const games = [...new Set(sorted.map((d) => d.game))].sort((a, b) => a - b);

  const gamePoints: Record<number, Record<string, number>> = {};

  games.forEach((g) => {
    gamePoints[g] = {};
    players.forEach((p) => {
      gamePoints[g][p] = 0;
    });
  });

  sorted.forEach((row) => {
    gamePoints[row.game][row.player] += row.points;
  });

  const cumulative: Record<string, number> = {};

  players.forEach((p) => (cumulative[p] = 0));

  const chartData = games.map((game) => {
    const row: any = { game };

    players.forEach((p) => {
      cumulative[p] += gamePoints[game][p];
      row[p] = cumulative[p];
    });

    return row;
  });

  return (
    <LineChart
      h={350}
      data={chartData}
      dataKey="game"
      withLegend
      curveType="linear"
      withDots
      series={players.map((p) => ({
        name: p,
        color: getColorFromPlayerName(p),
      }))}
    />
  );
}
