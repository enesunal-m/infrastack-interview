import { executeQuery } from "@/utils/clickhouseClient";

export async function fetchServiceMetrics(startTime: string, endTime: string) {
  const query = `
    SELECT
      ServiceName,
      toStartOfInterval(Timestamp, INTERVAL 5 MINUTE) AS time_bucket,
      count() AS request_count,
      avg(Duration) / 1000000 AS avg_latency_ms,
      (countIf(StatusCode != 'OK') / count()) * 100 AS error_rate
    FROM otel_traces
    WHERE Timestamp BETWEEN {startTime:String} AND {endTime:String}
    GROUP BY ServiceName, time_bucket
    ORDER BY ServiceName, time_bucket ASC
  `;

  return executeQuery(query, { startTime, endTime });
}

export async function fetchServiceHealth(timeWindow: string) {
  const query = `
    SELECT
      ServiceName,
      countIf(StatusCode = 'OK') / count() * 100 AS success_rate,
      avg(Duration) / 1000000 AS avg_latency_ms
    FROM otel_traces
    WHERE Timestamp >= now() - INTERVAL ${timeWindow}
    GROUP BY ServiceName
  `;

  return executeQuery(query);
}

export async function fetchRecentTraces(limit: number = 10) {
  const query = `
    SELECT
      TraceId,
      ServiceName,
      Name AS Operation,
      Duration / 1000000 AS duration_ms,
      StatusCode,
      Timestamp
    FROM otel_traces
    ORDER BY Timestamp DESC
    LIMIT ${limit}
  `;

  return executeQuery(query);
}
