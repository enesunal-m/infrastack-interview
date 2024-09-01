import { useState, useEffect } from "react";
import { fetchServiceMetrics } from "@/utils/dataFetchers";
import { processServiceMetrics } from "@/utils/dataProcessors";

export function useServiceMetrics(startTime: string, endTime: string) {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const rawData = await fetchServiceMetrics(startTime, endTime);
        const processedData = processServiceMetrics(rawData);
        setData(processedData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [startTime, endTime]);

  return { data, isLoading, error };
}
