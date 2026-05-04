import { useEffect, useState } from "react";
import axios from "axios";

import { type GameRecord } from "@/types";
import { parseCsv } from "@/utils/parseCsv";

export function useSheetsData(sheetId?: string) {
  const [data, setData] = useState<GameRecord[]>([]);
  const [loading, setLoading] = useState(!!sheetId);

  useEffect(() => {
    if (!sheetId) return;

    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`;

    axios.get(url).then((res) => {
      const parsed = parseCsv(res.data);
      setData(parsed);
      setLoading(false);
    });
  }, [sheetId]);

  return { data, loading };
}
