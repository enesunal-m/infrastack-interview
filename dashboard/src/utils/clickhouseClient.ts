"use server";
import { createClient } from "@clickhouse/client";

const clickhouseClient = createClient({
  url: process.env.CLICKHOUSE_ENDPOINT || "http://localhost:8123",
  username: process.env.CLICKHOUSE_USERNAME || "default",
  password: process.env.CLICKHOUSE_PASSWORD || "",
});

function formatDateTime(date: string): string {
  return date.replace("T", " ").replace("Z", "");
}

export async function getServiceMetrics(
  serviceName: string,
  startTime: string,
  endTime: string,
) {
  const formattedStartTime = formatDateTime(startTime);
  const formattedEndTime = formatDateTime(endTime);
  const query = `
    SELECT
      toStartOfInterval(Timestamp, INTERVAL 5 MINUTE) AS time_bucket,
      count() AS request_count,
      avg(Duration) / 1000000 AS avg_latency_ms,
      (countIf(StatusCode != 'OK') / count()) * 100 AS error_rate
    FROM otel_traces
    WHERE ServiceName = {serviceName:String}
      AND Timestamp BETWEEN parseDateTimeBestEffort({startTime:String}) AND parseDateTimeBestEffort({endTime:String})
    GROUP BY time_bucket
    ORDER BY time_bucket ASC
  `;

  try {
    const result = await clickhouseClient.query({
      query,
      query_params: {
        serviceName,
        startTime: formattedStartTime,
        endTime: formattedEndTime,
      },
      format: "JSONEachRow",
    });

    return result.json();
  } catch (error) {
    console.error("Error querying ClickHouse:", error);
    throw new Error("Failed to fetch service metrics");
  }
}

export async function getRecentTraces(serviceName: string) {
  const query = `
    SELECT
      TraceId,
      toString(Timestamp) AS Timestamp,
      Duration / 1000000 AS duration_ms,
      StatusCode,
      SpanName,
      SpanKind
    FROM otel_traces
    WHERE ServiceName = {serviceName:String}
    ORDER BY Timestamp DESC
    LIMIT 10
  `;

  try {
    const result = await clickhouseClient.query({
      query,
      query_params: {
        serviceName,
      },
      format: "JSONEachRow",
    });

    return result.json();
  } catch (error) {
    console.error("Error querying ClickHouse:", error);
    throw new Error("Failed to fetch recent traces");
  }
}
