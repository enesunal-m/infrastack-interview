import axios from "axios";

const clickhouseClient = axios.create({
  baseURL: process.env.CLICKHOUSE_ENDPOINT,
  auth: {
    username: process.env.CLICKHOUSE_USERNAME || "",
    password: process.env.CLICKHOUSE_PASSWORD || "",
  },
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
    WHERE ServiceName = '${serviceName}'
      AND Timestamp BETWEEN parseDateTimeBestEffort('${formattedStartTime}') AND parseDateTimeBestEffort('${formattedEndTime}')
    GROUP BY time_bucket
    ORDER BY time_bucket ASC
  `;

  try {
    const response = await clickhouseClient.post("", query, {
      headers: { "Content-Type": "text/plain" },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error querying ClickHouse:",
      error.response?.data || error.message,
    );
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
    WHERE ServiceName = '${serviceName}'
    ORDER BY Timestamp DESC
    LIMIT 10
  `;

  try {
    const response = await clickhouseClient.post("", query, {
      headers: { "Content-Type": "text/plain" },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error querying ClickHouse:",
      error.response?.data || error.message,
    );
    throw new Error("Failed to fetch recent traces");
  }
}
