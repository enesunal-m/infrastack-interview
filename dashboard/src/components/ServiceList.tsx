import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Service {
  id: string;
  name: string;
  status: "healthy" | "degraded" | "down";
  requestRate: number;
  errorRate: number;
  avgLatency: number;
}

const services: Service[] = [
  {
    id: "1",
    name: "User Service",
    status: "healthy",
    requestRate: 100,
    errorRate: 0.5,
    avgLatency: 20,
  },
  {
    id: "2",
    name: "Product Service",
    status: "degraded",
    requestRate: 150,
    errorRate: 2.5,
    avgLatency: 35,
  },
  {
    id: "3",
    name: "Order Service",
    status: "healthy",
    requestRate: 80,
    errorRate: 0.8,
    avgLatency: 25,
  },
];

const ServiceList: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Service List</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of your services</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Service</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Request Rate</TableHead>
              <TableHead>Error Rate</TableHead>
              <TableHead>Avg Latency</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium">{service.name}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      service.status === "healthy"
                        ? "default"
                        : service.status === "degraded"
                          ? "warning"
                          : "destructive"
                    }
                  >
                    {service.status}
                  </Badge>
                </TableCell>
                <TableCell>{service.requestRate} req/s</TableCell>
                <TableCell>{service.errorRate}%</TableCell>
                <TableCell>{service.avgLatency} ms</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ServiceList;
