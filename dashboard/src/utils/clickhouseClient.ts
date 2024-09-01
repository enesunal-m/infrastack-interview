import { createClient } from "@clickhouse/client";

const client = createClient({
  host: process.env.CLICKHOUSE_ENDPOINT || "http://localhost:8123",
  username: process.env.CLICKHOUSE_USERNAME || "default",
  password: process.env.CLICKHOUSE_PASSWORD || "",
  database: process.env.CLICKHOUSE_DATABASE || "default",
});

export async function executeQuery(
  query: string,
  params?: Record<string, any>,
) {
  try {
    const resultSet = await client.query({
      query,
      format: "JSONEachRow",
      query_params: params,
    });

    const result = await resultSet.json();
    return result;
  } catch (error) {
    console.error("Error executing ClickHouse query:", error);
    throw error;
  }
}
