import { SimpleGrid, Title } from "@mantine/core";

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
        🤓 Players
      </Title>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="md">
        {players.map((p) => (
          <PlayerCard key={p} player={p} data={data} />
        ))}
      </SimpleGrid>
    </>
  );
}
