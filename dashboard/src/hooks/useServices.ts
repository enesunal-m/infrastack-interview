import useSWR from "swr";
import { getServices } from "@/lib/data";

export function useServices() {
  const { data, error } = useSWR("services", getServices);

  return {
    services: data || [],
    isLoading: !error && !data,
    isError: error,
  };
}
