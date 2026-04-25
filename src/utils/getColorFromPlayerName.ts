export const getColorFromPlayerName = (name: string) => {
  const colorMap: Record<string, string> = {
    Bas: "#36A2EB",
    Bono: "#FF6384",
    David: "#FFCE56",
    Edo: "#221E90",
    Fra: "#4BC0C0",
    Frullo: "#9966FF",
    Luca: "#F44336",
    Pelle: "#008000",
    Sara: "#FF9F40",
  };

  return colorMap[name] ?? "#9AA0A6";
};
