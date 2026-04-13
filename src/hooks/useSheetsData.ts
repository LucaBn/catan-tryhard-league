import { useEffect, useState } from "react";
import axios from "axios";

import { type GameRecord } from "@/types";
import { parseCsv } from "@/utils/parseCsv";

const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1DjZX1p7WGxgL00EdAxoUjLhIJZuVWZGOKNoHX2ytEb4/gviz/tq?tqx=out:csv";

export function useSheetsData() {
  const [data, setData] = useState<GameRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(SHEET_URL).then((res) => {
      const parsed = parseCsv(res.data);
      setData(parsed);
      setLoading(false);
    });
  }, []);

  return { data, loading };
}
