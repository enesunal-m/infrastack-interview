import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StatusIndicator: React.FC<{
  status: "Healthy" | "Degraded" | "Down";
}> = ({ status }) => {
  const colors = {
    Healthy: "bg-green-500",
    Degraded: "bg-yellow-500",
    Down: "bg-red-500",
  };

  return (
    <span
      className={`inline-block w-3 h-3 rounded-full ${colors[status]} mr-2`}
    ></span>
  );
};

const ServiceHealth: React.FC = () => {
  const services = [
    { name: "User Service", status: "Healthy" as const },
    { name: "Product Service", status: "Healthy" as const },
    { name: "Order Service", status: "Degraded" as const },
  ];

  return (
    <Card className="bg-white border-gray-200">
      <CardHeader>
        <CardTitle className="text-blue-600">Service Health</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {services.map((service) => (
            <li key={service.name} className="flex items-center text-gray-700">
              <StatusIndicator status={service.status} />
              {service.name}:{" "}
              <span className="ml-1 font-medium">{service.status}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default ServiceHealth;
