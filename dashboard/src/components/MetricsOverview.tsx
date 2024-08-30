import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MetricCard: React.FC<{
  title: string;
  value: string | number;
  description: string;
}> = ({ title, value, description }) => (
  <Card className="bg-white border-gray-200">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-gray-600">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-blue-600">{value}</div>
      <p className="text-xs text-gray-500">{description}</p>
    </CardContent>
  </Card>
);

const MetricsOverview: React.FC = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <MetricCard
        title="Total Requests"
        value="1,234"
        description="24h total"
      />
      <MetricCard
        title="Average Response Time"
        value="250ms"
        description="Last hour"
      />
      <MetricCard title="Error Rate" value="2.5%" description="Last 24 hours" />
    </div>
  );
};

export default MetricsOverview;
