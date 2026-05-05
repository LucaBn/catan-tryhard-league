import { useEffect, useState } from "react";

import { type GameRecord } from "@/types";
import { parseCsv } from "@/utils/parseCsv";

const buildWorkerUrl = (sheetId: string) => {
  const workerProtocol = "https";
  const workerSubdomain = "ctl";
  const workerAccount = "lucabn";

  return `${workerProtocol}://${workerSubdomain}.${workerAccount}.workers.dev?id=${sheetId}`;
};

export function useSheetsData(sheetId?: string) {
  const [data, setData] = useState<GameRecord[]>([]);
  const [loading, setLoading] = useState(!!sheetId);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sheetId) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const url = buildWorkerUrl(sheetId);

        const response = await fetch(url, {
          method: "GET",
          mode: "cors",
          credentials: "omit",
        });

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const text = await response.text();
        const parsed = parseCsv(text);

        setData(parsed);
      } catch (err) {
        setError((err as Error).message);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sheetId]);

  return { data, loading, error };
}
