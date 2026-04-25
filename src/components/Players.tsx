import { useMemo, useState } from "react";
import { Group, Select, SimpleGrid, Text, Title } from "@mantine/core";

import { GameRecord } from "@/types";

import PlayerCard from "./PlayerCard";

type Props = {
  data: GameRecord[];
};

type PlayerStats = {
  player: string;
  games: number;
  total: number;
  avg: number;
  wins: number;
  winRate: number;
  variance: number;
};

export default function Players({ data }: Props) {
  const [sortBy, setSortBy] = useState<string | null>("total");
  const [direction, setDirection] = useState<"asc" | "desc">("desc");

  const stats = useMemo<PlayerStats[]>(() => {
    const map: Record<string, { points: number[] }> = {};

    data.forEach((d) => {
      if (!map[d.player]) {
        map[d.player] = { points: [] };
      }

      map[d.player].points.push(d.points);
    });

    return Object.entries(map).map(([player, { points }]) => {
      const games = points.length;
      const total = points.reduce((a, b) => a + b, 0);
      const avg = games ? total / games : 0;

      const wins = points.filter((p) => p === 10).length;
      const winRate = games ? wins / games : 0;

      const variance =
        games > 0
          ? points.reduce((sum, p) => sum + (p - avg) ** 2, 0) / games
          : 0;

      return {
        player,
        games,
        total,
        avg,
        wins,
        winRate,
        variance,
      };
    });
  }, [data]);

  const filtered = useMemo(() => {
    let result = stats;

    if (sortBy) {
      result = result.sort((a, b) => {
        const val = a[sortBy as keyof PlayerStats] as number;
        const val2 = b[sortBy as keyof PlayerStats] as number;

        return direction === "asc" ? val - val2 : val2 - val;
      });
    }

    return result;
  }, [stats, sortBy, direction]);

  return (
    <>
      <Title order={3} mt="xl" mb="sm">
        🤓 Players
      </Title>

      <Group gap={2}>
        <Text me={8}>Sort by:</Text>
        <Group justify="flex-start" wrap="wrap" gap={8}>
          <Select
            w="40%"
            maw={200}
            value={sortBy}
            onChange={setSortBy}
            data={[
              { value: "total", label: "Total points" },
              { value: "avg", label: "Average points" },
              { value: "wins", label: "Wins" },
              { value: "winRate", label: "Win Rate" },
              { value: "games", label: "Games" },
              { value: "variance", label: "Variance" },
            ]}
          />
          <Select
            w="40%"
            maw={200}
            value={direction}
            onChange={(v) => setDirection(v as "asc" | "desc")}
            data={[
              { value: "desc", label: "Desc" },
              { value: "asc", label: "Asc" },
            ]}
          />
        </Group>
        {sortBy === "variance" && (
          <Text c="dimmed" size="xs">
            Variance indicates consistency in performance.
            <br />
            Lower variance means more consistent results, while higher variance
            indicates more fluctuation in points scored.
          </Text>
        )}
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 3, lg: 4 }} spacing="md">
        {filtered.map((p) => (
          <PlayerCard
            key={p.player}
            player={p.player}
            data={data}
            sorting={sortBy}
          />
        ))}
      </SimpleGrid>
    </>
  );
}
