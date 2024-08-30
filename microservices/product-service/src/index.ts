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
const port = process.env.PRODUCT_SERVICE_PORT
  ? parseInt(process.env.PRODUCT_SERVICE_PORT)
  : 3001;

app.use(express.json());

const products = [
  { id: 1, name: "Laptop", price: 999.99 },
  { id: 2, name: "Smartphone", price: 499.99 },
];

app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

setTimeout(() => {
  app.listen(port, () => {
    console.log(`Service listening at http://localhost:${port}`);
  });
}, 1000);
