import { NextResponse } from "next/server";
import { getServiceMetrics } from "@/utils/clickhouseClient";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const service = searchParams.get("service");
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  if (!service || !start || !end) {
    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 },
    );
  }

  try {
    const metrics = await getServiceMetrics(service, start, end);
    return NextResponse.json(metrics);
  } catch (error) {
    console.error("Error in metrics route:", error);
    return NextResponse.json(
      { error: "Error fetching metrics" },
      { status: 500 },
    );
  }
}
