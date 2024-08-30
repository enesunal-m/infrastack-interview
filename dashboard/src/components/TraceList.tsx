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

const TraceList: React.FC = () => {
  const traces = [
    {
      id: "1234",
      service: "User Service",
      operation: "Get User",
      duration: "100ms",
      status: "OK",
    },
    {
      id: "5678",
      service: "Product Service",
      operation: "List Products",
      duration: "150ms",
      status: "OK",
    },
    {
      id: "9012",
      service: "Order Service",
      operation: "Create Order",
      duration: "80ms",
      status: "Error",
    },
  ];

  return (
    <Table>
      <TableCaption>Recent Traces</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Trace ID</TableHead>
          <TableHead>Service</TableHead>
          <TableHead>Operation</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {traces.map((trace) => (
          <TableRow key={trace.id}>
            <TableCell className="font-medium">{trace.id}</TableCell>
            <TableCell>{trace.service}</TableCell>
            <TableCell>{trace.operation}</TableCell>
            <TableCell>{trace.duration}</TableCell>
            <TableCell>{trace.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TraceList;
