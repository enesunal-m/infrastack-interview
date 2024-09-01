import { useState, useEffect } from "react";
import { fetchRecentTraces } from "../utils/dataFetchers";
import { processRecentTraces } from "../utils/dataProcessors";

export function useRecentTraces(limit: number = 10) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const rawData = await fetchRecentTraces(limit);
        const processedData = processRecentTraces(rawData);
        setData(processedData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [limit]);

  return { data, isLoading, error };
}
