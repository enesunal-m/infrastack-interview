import { NextResponse } from "next/server";
import { getRecentTraces } from "@/utils/clickhouseClient";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const service = searchParams.get("service");

  if (!service) {
    return NextResponse.json(
      { error: "Missing service parameter" },
      { status: 400 },
    );
  }

  try {
    const traces = await getRecentTraces(service);
    return NextResponse.json(traces);
  } catch (error) {
    console.error("Error in traces route:", error);
    return NextResponse.json(
      { error: "Error fetching traces" },
      { status: 500 },
    );
  }
}
