"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import useSWR from "swr";

interface ServiceDetailProps {
  serviceName: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ServiceDetail: React.FC<ServiceDetailProps> = ({ serviceName }) => {
  const endTime = new Date().toISOString();
  const startTime = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(); // 24 hours ago

  const { data: metricsData, error: metricsError } = useSWR(
    `/api/metrics?service=${serviceName}&start=${startTime}&end=${endTime}`,
    fetcher,
    { refreshInterval: 60000 }, // Refresh every 60 seconds
  );

  const { data: tracesData, error: tracesError } = useSWR(
    `/api/traces?service=${serviceName}`,
    fetcher,
    { refreshInterval: 60000 }, // Refresh every 60 seconds
  );

  if (metricsError)
    return <div>Error loading metrics: {metricsError.message}</div>;
  if (tracesError)
    return <div>Error loading traces: {tracesError.message}</div>;
  if (!metricsData || !tracesData) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{serviceName} Details</CardTitle>
        </CardHeader>
        <CardContent>
          <h3 className="text-lg font-semibold">Metrics Overview</h3>
          <ul>
            {metricsData.data.map((metric: any, index: number) => (
              <li key={index}>
                Time: {new Date(metric.time_bucket).toLocaleString()} |
                Requests: {metric.request_count} | Avg Latency:{" "}
                {metric.avg_latency_ms.toFixed(2)}ms | Error Rate:{" "}
                {metric.error_rate.toFixed(2)}%
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent Traces</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {tracesData.data.map((trace: any) => (
              <li
                key={trace.TraceId}
                className="flex items-center justify-between"
              >
                <span>{new Date(trace.Timestamp).toLocaleString()}</span>
                <span>
                  {trace.SpanName} ({trace.SpanKind})
                </span>
                <span>{trace.duration_ms.toFixed(2)} ms</span>
                <Badge
                  variant={
                    trace.StatusCode === "OK" ? "default" : "destructive"
                  }
                >
                  {trace.StatusCode}
                </Badge>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceDetail;
