const COLORS = [
  "#36A2EB",
  "#FF6384",
  "#FFCE56",
  "#221E90",
  "#4BC0C0",
  "#9966FF",
  "#F44336",
  "#008000",
  "#FF9F40",
  "#800000",
  "#00FF00",
  "#800080",
  "#008080",
];

const assigned = new Map<string, string>();
let colorIndex = 0;

export const getColorFromPlayerName = (name: string) => {
  if (assigned.has(name)) {
    return assigned.get(name)!;
  }

  const color = COLORS[colorIndex % COLORS.length];

  assigned.set(name, color);
  colorIndex++;

  return color;
};
