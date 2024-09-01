import * as dotenv from "dotenv";
import * as path from "path";
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
import { register, DiagLogLevel } from "infrastack-interview-fs-meu-20240829";

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

import { axiosRetry } from "../utils/axiosRetry";

import express from "express";

const app = express();
const port = process.env.ORDER_SERVICE_PORT
  ? parseInt(process.env.ORDER_SERVICE_PORT)
  : 3003;

app.use(express.json());

const orders: any[] = [];

app.post("/orders", async (req, res) => {
  const { userId, productId } = req.body;
  const parentContext = propagation.extract(context.active(), req.headers);
  const tracer = trace.getTracer("order-service");

  const span = tracer.startSpan("create_order", undefined, parentContext);

  try {
    context.with(trace.setSpan(context.active(), span), async () => {
      const headers = {};
      propagation.inject(context.active(), headers);

      const [userResponse, productResponse] = await Promise.all([
        axiosRetry({
          url: `http://localhost:3001/users/${userId}`,
          method: "get",
          headers,
          timeout: 5000,
          retry: 3,
          retryDelay: 1000,
        }),
        axiosRetry({
          url: `http://localhost:3002/products/${productId}`,
          method: "get",
          headers,
          timeout: 5000,
          retry: 3,
          retryDelay: 1000,
        }),
      ]);

      const order = {
        id: orders.length + 1,
        userId: userResponse.data.id,
        productId: productResponse.data.id,
        productName: productResponse.data.name,
        totalPrice: productResponse.data.price,
        status: "created",
      };

      orders.push(order);
      res.status(201).json(order);
    });
  } catch (error) {
    if (error instanceof Error) span.recordException(error);
    res.status(500).json({ error: "Failed to create order" });
  } finally {
    span.end();
  }
});

app.get("/orders", (req, res) => {
  res.json(orders);
});

app.listen(port, () => {
  console.log(`Order service listening at http://localhost:${port}`);
});
