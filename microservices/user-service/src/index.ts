import { register, DiagLogLevel } from "infrastack-interview-fs-meu-20240829";

// Register OpenTelemetry before importing Express
register({
  endpoint: "http://localhost:4317",
  instruments: ["http", "express"],
  logLevel: DiagLogLevel.INFO,
});

import express from "express";
import axios from "axios";

const app = express();
const port = 3001;

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

  try {
    const orderResponse = await axios.post("http://localhost:3003/orders", {
      userId,
      productId,
    });
    res.json(orderResponse.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to create order" });
  }
});

app.listen(port, () => {
  console.log(`User service listening at http://localhost:${port}`);
});
