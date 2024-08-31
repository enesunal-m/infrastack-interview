import useSWR from "swr";
import { getServiceMetrics, getServiceTraces } from "@/lib/data";

export function useServiceDetail(serviceName: string) {
  const { data: metrics, error: metricsError } = useSWR(
    ["metrics", serviceName],
    () => getServiceMetrics(serviceName),
  );
  const { data: traces, error: tracesError } = useSWR(
    ["traces", serviceName],
    () => getServiceTraces(serviceName),
  );

  return {
    metrics: metrics || [],
    traces: traces || [],
    isLoading: (!metrics && !metricsError) || (!traces && !tracesError),
    isError: metricsError || tracesError,
  };
}
