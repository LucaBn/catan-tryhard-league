import { useEffect, useState } from "react";
import axios from "axios";

import { type GameRecord } from "@/types";
import { parseCsv } from "@/utils/parseCsv";

export function useSheetsData(sheetId?: string) {
  const [data, setData] = useState<GameRecord[]>([]);
  const [loading, setLoading] = useState(!!sheetId);

  useEffect(() => {
    if (!sheetId) return;

    const url = `/api/sheet?id=${sheetId}`;

    axios
      .get(url, {
        withCredentials: false,
      })
      .then((res) => {
        const parsed = parseCsv(res.data);
        setData(parsed);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [sheetId]);

  return { data, loading };
}
