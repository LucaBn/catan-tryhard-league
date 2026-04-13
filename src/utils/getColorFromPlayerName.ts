export const getColorFromPlayerName = (name: string) => {
  const colorMap: Record<string, string> = {
    Bono: "#FF6384",
    Bas: "#36A2EB",
    David: "#FFCE56",
    Fra: "#4BC0C0",
    Frullo: "#9966FF",
    Sara: "#FF9F40",
    Luca: "#F44336",
  };

  return colorMap[name] ?? "#9AA0A6";
};
