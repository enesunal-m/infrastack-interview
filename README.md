# InfraStack Observer

## Overview

InfraStack Observer is a microservices-based project that demonstrates the implementation of OpenTelemetry for observability. It consists of three microservices (User, Product, and Order) and includes a custom OpenTelemetry wrapper for easy instrumentation.

## Project Structure

```
infrastack-observer/
├── microservices/
│   ├── user-service/
│   ├── product-service/
│   └── order-service/
├── opentelemetry/
│   └── otel-collector-config.yaml
├── src/
│   └── index.ts (OpenTelemetry wrapper)
├── tests/
├── scripts/
└── dashboard/ (to be implemented)
```

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- Docker and Docker Compose (for running the OpenTelemetry Collector)

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/your-username/infrastack-observer.git
   cd infrastack-observer
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Fill in the required values in `.env`

4. Install dependencies for each microservice:
   ```
   cd microservices/user-service && npm install
   cd ../product-service && npm install
   cd ../order-service && npm install
   cd ../..
   ```

## Running the Project

1. Start the OpenTelemetry Collector:
   ```
   docker-compose up -d
   ```

2. Start all microservices:
   ```
   npm run start:all
   ```

   This will start the User Service on port 3001, Product Service on port 3002, and Order Service on port 3003.

## Testing

Run the test suite for the OpenTelemetry wrapper:

```
npm test
```

## OpenTelemetry Wrapper

The custom OpenTelemetry wrapper is located in `src/index.ts`. It provides an easy way to instrument your microservices with OpenTelemetry. Usage example:

```typescript
import { register, DiagLogLevel } from './path-to-wrapper';

register({
  endpoint: 'http://localhost:4317',
  instruments: ['http', 'express'],
  logLevel: DiagLogLevel.INFO,
});
```

## Microservices

- **User Service**: Manages user data and authentication
- **Product Service**: Handles product catalog and inventory
- **Order Service**: Processes and manages orders

Each microservice is instrumented with OpenTelemetry using the custom wrapper.

## Dashboard (To Be Implemented)

A dashboard for visualizing the telemetry data will be implemented in the `dashboard/` directory.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Contact

Your Name - your.email@example.com

Project Link: [https://github.com/your-username/infrastack-observer](https://github.com/your-username/infrastack-observer)
