import { useMemo } from "react";
import { Paper, Stack, Text, Title } from "@mantine/core";

import { GameRecord } from "@/types";

type Props = {
  data: GameRecord[];
};

const formatList = (elements: string[]) => {
  if (elements.length === 1) return elements[0];
  if (elements.length === 2) return `${elements[0]} and ${elements[1]}`;
  return `${elements.slice(0, -1).join(", ")} and ${elements.slice(-1)}`;
};

export default function FanFacts({ data }: Props) {
  const facts = useMemo(() => {
    const byPlayer: Record<string, GameRecord[]> = {};

    data.forEach((g) => {
      if (!byPlayer[g.player]) byPlayer[g.player] = [];
      byPlayer[g.player].push(g);
    });

    const results: string[] = [];

    const streakByPlayer = Object.entries(byPlayer).map(([player, games]) => {
      const sorted = [...games].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      );

      let streak = 0;
      let maxStreak = 0;
      let start = 0;
      let tempStart = 0;

      sorted.forEach((g) => {
        if (g.points >= 10) {
          if (streak === 0) tempStart = g.game;
          streak++;

          if (streak > maxStreak) {
            maxStreak = streak;
            start = tempStart;
          }
        } else {
          streak = 0;
        }
      });

      return { player, maxStreak, start };
    });

    const maxStreak = Math.max(...streakByPlayer.map((p) => p.maxStreak));

    if (maxStreak >= 2) {
      const top = streakByPlayer.filter((p) => p.maxStreak === maxStreak);
      const names = formatList(top.map((p) => p.player));

      results.push(`🔥 ${names} won ${maxStreak} games in a row`);
    }

    const highScoreByPlayer = Object.entries(byPlayer).map(
      ([player, games]) => {
        const ratio =
          games.length > 0
            ? games.filter((g) => g.points >= 8).length / games.length
            : 0;

        return { player, ratio };
      },
    );

    const maxRatio = Math.max(...highScoreByPlayer.map((p) => p.ratio));

    if (maxRatio > 0.5) {
      const top = highScoreByPlayer.filter((p) => p.ratio === maxRatio);
      const names = formatList(top.map((p) => p.player));

      results.push(`💪 ${names} score 8+ points in most of their games`);
    }

    const over10ByPlayer = Object.entries(byPlayer).map(([player, games]) => {
      const matches = games.filter((g) => g.points > 10);
      return { player, count: matches.length, matches };
    });

    const maxOver10 = Math.max(...over10ByPlayer.map((p) => p.count));

    if (maxOver10 > 0) {
      const top = over10ByPlayer.filter((p) => p.count === maxOver10);

      const names = formatList(top.map((p) => p.player));
      const times = maxOver10 === 1 ? "once" : `${maxOver10} times`;

      results.push(`🚀 ${names} broke the 10-point ceiling ${times}`);
    }

    const almostByPlayer = Object.entries(byPlayer).map(([player, games]) => {
      const count = games.filter((g) => g.points === 9).length;
      return { player, count };
    });

    const maxAlmost = Math.max(...almostByPlayer.map((p) => p.count));

    if (maxAlmost >= 1) {
      const top = almostByPlayer.filter((p) => p.count === maxAlmost);
      const names = formatList(top.map((p) => p.player));
      const times = maxAlmost === 1 ? "once" : `${maxAlmost} times`;

      results.push(`😬 ${names} stopped at 9 points ${times}`);
    }

    return results;
  }, [data]);

  if (facts.length === 0) return null;

  return (
    <Paper p="lg" shadow="md" radius="lg" mt="xl" withBorder>
      <Title order={3} mb="md">
        🎉 Fan Facts
      </Title>

      <Stack gap="sm">
        {facts.map((fact, i) => {
          const icon = fact.split(" ")[0];

          return (
            <Paper
              key={i}
              p="md"
              radius="md"
              withBorder
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <Text size="lg" style={{ width: 20 }}>
                {icon}
              </Text>

              <Text size="sm" style={{ lineHeight: 1.4 }}>
                {fact.replace(icon + " ", "")}
              </Text>
            </Paper>
          );
        })}
      </Stack>
    </Paper>
  );
}
