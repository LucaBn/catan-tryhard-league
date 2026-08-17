import { Fragment, ReactNode, useMemo } from "react";
import { Paper, Stack, Text, Title } from "@mantine/core";

import { GameRecord } from "@/types";

type Props = {
  data: GameRecord[];
};

const formatList = (elements: string[]) => {
  if (elements.length === 1) {
    return (
      <Text span fw={700} ms={4}>
        {elements[0]}
      </Text>
    );
  }

  if (elements.length === 2) {
    return (
      <>
        <Text span fw={700} ms={4}>
          {elements[0]}
        </Text>{" "}
        and{" "}
        <Text span fw={700}>
          {elements[1]}
        </Text>
      </>
    );
  }

  return (
    <>
      {elements.slice(0, -1).map((element, i) => (
        <Fragment key={element}>
          <Text span fw={700} ms={4}>
            {element}
          </Text>
          {i < elements.length - 2 ? ", " : " and "}
        </Fragment>
      ))}
      <Text span fw={700}>
        {elements[elements.length - 1]}
      </Text>
    </>
  );
};

export default function FanFacts({ data }: Props) {
  const facts = useMemo(() => {
    const byPlayer: Record<string, GameRecord[]> = {};

    data.forEach((g) => {
      if (!byPlayer[g.player]) byPlayer[g.player] = [];
      byPlayer[g.player].push(g);
    });

    const results: ReactNode[] = [];

    const streakByPlayer = Object.entries(byPlayer).map(([player, games]) => {
      const sorted = [...games].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      );

      let streak = 0;
      let maxStreak = 0;

      sorted.forEach((g) => {
        if (g.points >= 10) {
          streak++;

          if (streak > maxStreak) {
            maxStreak = streak;
          }
        } else {
          streak = 0;
        }
      });

      return { player, maxStreak };
    });

    const maxStreak = Math.max(...streakByPlayer.map((p) => p.maxStreak));

    if (maxStreak >= 2) {
      const top = streakByPlayer.filter((p) => p.maxStreak === maxStreak);
      const names = formatList(top.map((p) => p.player));

      results.push(
        <>
          🔥 {names} won {maxStreak} games in a row
        </>,
      );
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
      const top = highScoreByPlayer.filter((p) => p.ratio > 0.5);
      const names = formatList(top.map((p) => p.player));

      results.push(<>💪 {names} scored 8+ points in most of their games</>);
    }

    const over10ByPlayer = Object.entries(byPlayer).map(([player, games]) => {
      const gamesWithOver10 = games.filter((g) => g.points > 10);
      return {
        player,
        count: gamesWithOver10.length,
      };
    });

    const maxOver10 = Math.max(...over10ByPlayer.map((p) => p.count));

    if (maxOver10 > 0) {
      const top = over10ByPlayer.filter((p) => p.count === maxOver10);

      const names = formatList(top.map((p) => p.player));
      const times = maxOver10 === 1 ? "once" : `${maxOver10} times`;

      results.push(
        <>
          🚀 {names} broke the 10-point ceiling {times}
        </>,
      );
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

      results.push(
        <>
          😬 {names} stopped at 9 points {times}
        </>,
      );
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
              <Text size="sm" style={{ lineHeight: 1.4 }}>
                {fact}
              </Text>
            </Paper>
          );
        })}
      </Stack>
    </Paper>
  );
}
