import { register } from "opentelemetry-wrapper";

// Register OpenTelemetry instrumentation
register({
  endpoint: "http://localhost:4317",
  instruments: ["http", "express"],
});

console.log("Telemetry data is being sent...");
