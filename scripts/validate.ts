import { register, DiagLogLevel } from "infrastack-interview-fs-meu-20240829";
import { trace, SpanStatusCode } from "@opentelemetry/api";

// Register OpenTelemetry instrumentation with DEBUG log level
register({
  endpoint: "http://localhost:4317",
  instruments: ["http", "express"],
  logLevel: DiagLogLevel.DEBUG, // Set to DEBUG for development, INFO or ERROR for production
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
    span.setAttribute("custom.attribute", "test-value");
    console.log(`Span generated: ${span.spanContext().traceId}`);
    span.end();
  }, workDuration);
}

console.log("Starting to send telemetry data...");

// Generate spans every second for 1 minute
const interval = setInterval(generateRandomSpan, 1000);

// Stop after 1 minute
setTimeout(() => {
  clearInterval(interval);
  console.log("Finished sending telemetry data. Exiting in 5 seconds...");

  // Wait for 5 seconds before exiting to allow any pending spans to be sent
  setTimeout(() => {
    console.log("Exiting.");
    process.exit(0);
  }, 5000);
}, 60000);

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});
