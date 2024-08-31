import {
  getServiceMetrics as fetchServiceMetrics,
  getRecentTraces,
} from "@/utils/clickhouseClient";

export async function getServices() {
  // Fetch services data from ClickHouse
  // This is a placeholder - you'll need to implement the actual query
  const servicesData = await fetchServicesData();
  return servicesData.map((service) => ({
    name: service.name,
    status: service.status,
    requestRate: service.request_rate,
    errorRate: service.error_rate,
    avgLatency: service.avg_latency,
    connections: service.connections,
  }));
}

export async function getServiceMetrics(serviceName: string) {
  const currentTime = new Date().toISOString();
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const metrics = await fetchServiceMetrics(
    serviceName,
    oneDayAgo,
    currentTime,
  );
  return metrics.data.map((m) => ({
    timestamp: m.time_bucket,
    requestCount: m.request_count,
    errorRate: m.error_rate,
    avgLatency: m.avg_latency_ms,
  }));
}

export async function getServiceTraces(serviceName: string) {
  const traces = await getRecentTraces(serviceName);
  return traces.data.map((t) => ({
    timestamp: t.Timestamp,
    name: t.SpanName,
    duration: t.duration_ms,
  }));
}

async function fetchServicesData() {
  // Implement this function to fetch services data from ClickHouse
  // You'll need to write a query that returns service information including connections
  // This is a placeholder implementation
  return [
    {
      name: "User Service",
      status: "healthy",
      request_rate: 100,
      error_rate: 0.5,
      avg_latency: 20,
      connections: [
        { target: "Product Service", status: "OK", latency: 15 },
        { target: "Order Service", status: "OK", latency: 25 },
      ],
    },
    // Add other services here
  ];
}
