"use client";

import React from "react";
import { useServices } from "@/hooks/useServices";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ServiceList = () => {
  const { services, isLoading, isError } = useServices();

  if (isLoading) return <div>Loading services...</div>;
  if (isError) return <div>Error loading services</div>;

  return (
    <Table>
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
          <TableRow key={service.name}>
            <TableCell>{service.name}</TableCell>
            <TableCell>{service.status}</TableCell>
            <TableCell>{service.requestRate} req/s</TableCell>
            <TableCell>{service.errorRate}%</TableCell>
            <TableCell>{service.avgLatency} ms</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ServiceList;
