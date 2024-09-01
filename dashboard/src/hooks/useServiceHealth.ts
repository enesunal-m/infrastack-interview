import { useState, useEffect } from "react";
import { fetchServiceHealth } from "../utils/dataFetchers";
import { processServiceHealth } from "../utils/dataProcessors";

export function useServiceHealth(timeWindow: string = "15 MINUTE") {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const rawData = await fetchServiceHealth(timeWindow);
        const processedData = processServiceHealth(rawData);
        setData(processedData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [timeWindow]);

  return { data, isLoading, error };
}
