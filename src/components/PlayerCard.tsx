import { LineChart } from "@mantine/charts";
import { Avatar, Badge, Box, Card, Divider, Group, Text } from "@mantine/core";

import { getColorFromPlayerName } from "@/utils/getColorFromPlayerName";

import { GameRecord } from "../types";

type Props = {
  player: string;
  data: GameRecord[];
  sorting?: string | null;
};

export default function PlayerCard({ player, data, sorting }: Props) {
  const games = data.filter((d) => d.player === player);

  const wins = games.filter((g) => g.points >= 10).length;
  const total = games.reduce((sum, g) => sum + g.points, 0);
  const avgNum = games.length ? total / games.length : 0;
  const avg = games.length ? avgNum.toFixed(2) : "0";
  const winRate = games.length
    ? ((wins / games.length) * 100).toFixed(0) + "%"
    : "0%";
  const variance = games.length
    ? (
        games.reduce((sum, g) => sum + Math.pow(g.points - avgNum, 2), 0) /
        games.length
      ).toFixed(2) || 0
    : "0";

  const initial = player.charAt(0).toUpperCase();
  const color = getColorFromPlayerName(player);

  const last10 = games.slice(-10);
  const chartData = last10.map((g) => g.points);

  const playersPerGame = new Map<number, number>();

  data.forEach((g) => {
    playersPerGame.set(g.game, (playersPerGame.get(g.game) || 0) + 1);
  });

  const winRateByPlayers = [3, 4, 5, 6].map((numPlayers) => {
    const filtered = games.filter(
      (g) => playersPerGame.get(g.game) === numPlayers,
    );

    const wins = filtered.filter((g) => g.points >= 10).length;

    const rate = filtered.length
      ? ((wins / filtered.length) * 100).toFixed(0) + "%"
      : "-";

    return {
      players: numPlayers,
      rate,
      wins,
      count: filtered.length,
    };
  });

  const gameMap = new Map<number, GameRecord[]>();

  data.forEach((g) => {
    if (!gameMap.has(g.game)) gameMap.set(g.game, []);
    gameMap.get(g.game)!.push(g);
  });

  let gold = 0;
  let silver = 0;
  let bronze = 0;

  gameMap.forEach((players) => {
    const sorted = [...players].sort((a, b) => b.points - a.points);

    const current = sorted.find((p) => p.player === player);

    if (!current) return;

    const uniqueScores = [...new Set(sorted.map((p) => p.points))];

    const rank = uniqueScores.indexOf(current.points);

    if (rank === 0) gold++;
    else if (rank === 1) silver++;
    else if (rank === 2) bronze++;
  });

  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <Group align="center" gap="md">
        <Avatar radius="xl" size="lg" color={color}>
          {initial}
        </Avatar>

        <Group gap={0} style={{ flex: 1 }}>
          <Text fw={700} size="lg">
            {player}
          </Text>

          {/* <Text size="xs" c="dimmed">
            Description about {player} goes here. Maybe their playstyle or
            favorite strategies.
          </Text> */}
        </Group>

        <Group gap="xs">
          <Badge
            color="yellow"
            variant={sorting === "wins" ? "filled" : "light"}
          >
            👑 {gold}
          </Badge>

          <Badge color="gray" variant="light">
            🥈 {silver}
          </Badge>

          <Badge color="orange" variant="light">
            🥉 {bronze}
          </Badge>
        </Group>

        <Group gap="xs">
          <Group gap="xs">
            <Badge variant={sorting === "games" ? "filled" : "outline"}>
              Games: {games.length}
            </Badge>
            {/* <Badge variant={sorting === "wins" ? "filled" : "outline"}>
              Wins 👑: {wins}
            </Badge> */}
            <Badge variant={sorting === "total" ? "filled" : "outline"}>
              Total pts: {total}
            </Badge>
          </Group>
          <Badge variant={sorting === "winRate" ? "filled" : "outline"}>
            Win rate: {winRate}
          </Badge>
          <Badge variant={sorting === "avg" ? "filled" : "outline"}>
            Avg points: {avg}
          </Badge>
          <Badge variant={sorting === "variance" ? "filled" : "outline"}>
            Variance: {variance}
          </Badge>
        </Group>

        <Divider w="100%" />

        <Group gap="xs">
          <Text size="xs" c="dimmed" w="100%">
            Win rate by number of players:
          </Text>
          {winRateByPlayers.map(({ players, rate, wins, count }) => (
            <Badge key={players} variant="outline">
              {players}p: {rate} ({wins}/{count})
            </Badge>
          ))}
        </Group>

        {games.length > 1 && (
          <Group w="100%">
            <Text size="xs" c="dimmed" w="100%">
              Last {Math.min(chartData.length, 10)} games
            </Text>
            <Box style={{ width: "100%", minWidth: 0 }}>
              <LineChart
                h={120}
                data={chartData.map((points) => ({
                  points,
                }))}
                dataKey="points"
                series={[{ name: "points", color }]}
                withTooltip={false}
                withXAxis={false}
                withYAxis={false}
                withPointLabels={true}
                gridAxis="x"
                yAxisProps={{
                  domain: [2, 12],
                  tickCount: 6,
                  tickFormatter: (value) => {
                    return value === 10 ? "" : ""; // Can't say why but if I use this it show horizontal lines correctly 🤷‍♂️
                  },
                }}
                valueFormatter={(value) =>
                  value >= 10 ? `${value} 👑` : `${value}`
                }
              />
            </Box>
          </Group>
        )}
      </Group>
    </Card>
  );
}
