import { NextResponse } from "next/server";
import { getServiceMetrics } from "@/utils/clickhouseClient";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const service = searchParams.get("service");
  const start =
    searchParams.get("start") ||
    new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const end = searchParams.get("end") || new Date().toISOString();

  if (!service) {
    return NextResponse.json(
      { error: "Missing service parameter" },
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
