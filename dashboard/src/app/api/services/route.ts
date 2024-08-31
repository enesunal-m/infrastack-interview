import { NextResponse } from "next/server";

export async function GET() {
  // This is mock data. In a real application, you would fetch this from your backend or database.
  const services = [
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

  return NextResponse.json(services);
}
