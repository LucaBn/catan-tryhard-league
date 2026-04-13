import { GameRecord } from "@/types";

export function parseCsv(csv: string): GameRecord[] {
  return csv
    .trim()
    .split("\n")
    .slice(1)
    .map((line) => {
      const [date, game, player, points] = line
        .split(",")
        .map((v) => v.replace(/"/g, "").trim());

      return {
        date,
        game: Number(game),
        player,
        points: Number(points),
      };
    });
}
