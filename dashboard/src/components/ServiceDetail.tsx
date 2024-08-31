"use client";

import React from "react";
import { useServiceDetail } from "@/hooks/useServiceDetail";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface ServiceDetailProps {
  serviceName: string;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ serviceName }) => {
  const { metrics, traces, isLoading, isError } = useServiceDetail(serviceName);

  if (isLoading) return <div>Loading service details...</div>;
  if (isError) return <div>Error loading service details</div>;

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{serviceName} Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart width={600} height={300} data={metrics}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="requestCount" stroke="#8884d8" />
            <Line type="monotone" dataKey="errorRate" stroke="#82ca9d" />
          </LineChart>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent Traces</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {traces.map((trace, index) => (
              <li key={index}>
                {trace.timestamp} - {trace.name} ({trace.duration}ms)
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceDetail;
