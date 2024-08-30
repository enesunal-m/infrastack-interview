import { register } from "infrastack-interview-fs-meu-20240829";

// Register OpenTelemetry instrumentation
register({
  endpoint: "http://localhost:4317",
  instruments: ["http", "express"],
});

console.log("Telemetry data is being sent...");
