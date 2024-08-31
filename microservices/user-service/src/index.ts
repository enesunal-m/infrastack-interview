import * as dotenv from "dotenv";
import * as path from "path";
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
import { register, DiagLogLevel } from "infrastack-interview-fs-meu-20240829";
import express from "express";
import axios from "axios";
import { trace, context, propagation } from "@opentelemetry/api";

register({
  endpoint: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || "http://localhost:4317",
  instruments: ["http", "express"],
  logLevel: DiagLogLevel.INFO,
  compression: process.env.OTEL_EXPORTER_OTLP_COMPRESSION as
    | "gzip"
    | "none"
    | undefined,
  exporter: process.env.OTEL_LOGS_EXPORTER as "otlp" | undefined,
});

const app = express();
const port = process.env.USER_SERVICE_PORT
  ? parseInt(process.env.USER_SERVICE_PORT)
  : 3001;

app.use(express.json());

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

app.post("/users/:id/order", async (req, res) => {
  const userId = parseInt(req.params.id);
  const productId = req.body.productId;

  const tracer = trace.getTracer("user-service");
  const span = tracer.startSpan("create_order");

  try {
    context.with(trace.setSpan(context.active(), span), async () => {
      const headers = {};
      propagation.inject(context.active(), headers);

      const orderResponse = await axios.post(
        "http://localhost:3003/orders",
        {
          userId,
          productId,
        },
        { headers },
      );

      res.json(orderResponse.data);
    });
  } catch (error) {
    if (error instanceof Error) span.recordException(error);
    res.status(500).json({ error: "Failed to create order" });
  } finally {
    span.end();
  }
});

// Simulate user activity
setInterval(() => {
  const userId = Math.floor(Math.random() * users.length) + 1;
  const productId = Math.floor(Math.random() * 2) + 1;

  axios
    .post(`http://localhost:${port}/users/${userId}/order`, { productId })
    .then(() => console.log(`User ${userId} placed an order`))
    .catch((error) =>
      console.error(`Error placing order for user ${userId}:`, error.message),
    );
}, 5000);

app.listen(port, () => {
  console.log(`User service listening at http://localhost:${port}`);
});
