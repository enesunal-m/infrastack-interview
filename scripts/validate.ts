import { register } from "infrastack-interview-fs-meu-20240829";
import { trace, context, SpanStatusCode } from "@opentelemetry/api";

// Register OpenTelemetry instrumentation
register({
  endpoint: "http://localhost:4317",
  instruments: ["http", "express"],
});

const tracer = trace.getTracer("example-tracer");

// Function to generate random spans
function generateRandomSpan() {
  const span = tracer.startSpan("random-operation");

  // Simulate some work
  const workDuration = Math.floor(Math.random() * 1000);
  setTimeout(() => {
    if (Math.random() < 0.9) {
      span.setStatus({ code: SpanStatusCode.OK });
    } else {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: "Random error occurred",
      });
    }
    span.end();
  }, workDuration);
}

// Generate spans every second
setInterval(generateRandomSpan, 1000);

console.log("Telemetry data is being sent...");
