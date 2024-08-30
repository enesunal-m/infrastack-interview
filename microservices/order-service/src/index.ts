import { register, DiagLogLevel } from "infrastack-interview-fs-meu-20240829";

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

import express from "express";
import axios from "axios";

const app = express();
const port = process.env.ORDER_SERVICE_PORT
  ? parseInt(process.env.ORDER_SERVICE_PORT)
  : 3001;

app.use(express.json());

const orders: any[] = [];

app.post("/orders", async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const userResponse = await axios.get(
      `http://localhost:3001/users/${userId}`,
    );
    const productResponse = await axios.get(
      `http://localhost:3002/products/${productId}`,
    );

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
  } catch (error) {
    res.status(500).json({ error: "Failed to create order" });
  }
});

app.get("/orders", (req, res) => {
  res.json(orders);
});

setTimeout(() => {
  app.listen(port, () => {
    console.log(`Service listening at http://localhost:${port}`);
  });
}, 1000);
