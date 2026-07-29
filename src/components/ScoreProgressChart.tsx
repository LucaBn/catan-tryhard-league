import { useState } from "react";
import { LineChart } from "@mantine/charts";
import { Group, Select } from "@mantine/core";

import { GameRecord } from "@/types";
import { getColorFromPlayerName } from "@/utils/getColorFromPlayerName";

type Props = {
  data: GameRecord[];
};

export default function ChampionshipRaceChart({ data }: Props) {
  const [range, setRange] = useState("10");

  const sorted = [...data].sort((a, b) => a.game - b.game);

  const allGames = [...new Set(sorted.map((d) => d.game))].sort(
    (a, b) => a - b,
  );

  const games = range === "all" ? allGames : allGames.slice(-Number(range));

  const filteredData = sorted.filter((d) => games.includes(d.game));

  const players = [...new Set(filteredData.map((d) => d.player))];

  const gamePoints: Record<number, Record<string, number>> = {};

  games.forEach((g) => {
    gamePoints[g] = {};
    players.forEach((p) => {
      gamePoints[g][p] = 0;
    });
  });

  filteredData.forEach((row) => {
    gamePoints[row.game][row.player] += row.points;
  });

  const cumulative: Record<string, number> = {};
  players.forEach((p) => (cumulative[p] = 0));

  const chartData = games.map((game) => {
    const row: Record<string, number> = { game };

    players.forEach((p) => {
      cumulative[p] += gamePoints[game][p];
      row[p] = cumulative[p];
    });

    return row;
  });

  return (
    <Group w="100%">
      <Select
        value={range}
        onChange={(value) => setRange(value ?? "10")}
        data={[
          { value: "10", label: "Last 10 Games" },
          { value: "all", label: "All games" },
        ]}
        w={220}
      />

      <LineChart
        h={420}
        data={chartData}
        dataKey="game"
        withLegend
        withDots
        curveType="linear"
        withTooltip
        strokeWidth={3}
        dotProps={{
          r: 3,
        }}
        activeDotProps={{
          r: 6,
        }}
        series={players.map((p) => ({
          name: p,
          color: getColorFromPlayerName(p),
        }))}
      />
    </Group>
  );
}
