// This is a placeholder. We'll implement actual API calls later.
export async function fetchMetrics() {
  // Simulating an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalRequests: 1234,
        averageResponseTime: 250,
        errorRate: 2.5,
      });
    }, 1000);
  });
}

export async function fetchTraces() {
  // Simulating an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "1234",
          service: "User Service",
          operation: "Get User",
          duration: "100ms",
          status: "OK",
        },
        {
          id: "5678",
          service: "Product Service",
          operation: "List Products",
          duration: "150ms",
          status: "OK",
        },
        {
          id: "9012",
          service: "Order Service",
          operation: "Create Order",
          duration: "80ms",
          status: "Error",
        },
      ]);
    }, 1000);
  });
}

export async function fetchServiceHealth() {
  // Simulating an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { name: "User Service", status: "Healthy" },
        { name: "Product Service", status: "Healthy" },
        { name: "Order Service", status: "Degraded" },
      ]);
    }, 1000);
  });
}
