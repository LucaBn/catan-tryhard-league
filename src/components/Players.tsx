import { Grid, Title } from "@mantine/core";

import { GameRecord } from "@/types";

import PlayerCard from "./PlayerCard";

type Props = {
  data: GameRecord[];
};

export default function Players({ data }: Props) {
  const players = [...new Set(data.map((d) => d.player))];

  return (
    <>
      <Title order={3} mt="xl" mb="sm">
        Players
      </Title>

      <Grid>
        {players.map((p) => (
          <Grid.Col key={p} span={4}>
            <PlayerCard player={p} data={data} />
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
}
