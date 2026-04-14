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
};

export default function Players({ data }: Props) {
  const [sortBy, setSortBy] = useState<string | null>("total");
  const [direction, setDirection] = useState<"asc" | "desc">("desc");

  const stats = useMemo<PlayerStats[]>(() => {
    const map: Record<string, PlayerStats> = {};

    data.forEach((d) => {
      if (!map[d.player]) {
        map[d.player] = {
          player: d.player,
          games: 0,
          total: 0,
          avg: 0,
        };
      }

      map[d.player].games += 1;
      map[d.player].total += d.points;
    });

    return Object.values(map).map((p) => ({
      ...p,
      avg: p.games ? p.total / p.games : 0,
      wins: p.total >= 10 ? 1 : 0,
      winRate: p.games ? (p.total >= 10 ? 1 : 0) / p.games : 0,
    }));
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
      </Group>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="md">
        {filtered.map((p) => (
          <PlayerCard key={p.player} player={p.player} data={data} />
        ))}
      </SimpleGrid>
    </>
  );
}
