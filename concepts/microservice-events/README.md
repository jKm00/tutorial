# Microservice Events

Educational project demonstrating event-based communication between microservices using RabbitMQ.

## Architecture

- **Orders Service** (port 3000): Receives order requests and publishes events
- **Inventory Service** (port 3001): Subscribes to order events and processes inventory updates
- **RabbitMQ**: Message broker enabling asynchronous communication

## Setup

1. **Start RabbitMQ**
   ```bash
   docker compose up -d
   ```

2. **Configure Environment**
   ```bash
   cp apps/orders/.env.example apps/orders/.env
   cp apps/inventory/.env.example apps/inventory/.env
   ```

3. **Run Services**
   ```bash
   # Terminal 1
   bun run --filter orders dev
   
   # Terminal 2
   bun run --filter inventory dev
   ```

4. **Test with Bruno**
   - Import the `bruno/` collection into [Bruno](https://www.usebruno.com/)
   - Run the "Create order" request
   - Watch the inventory service logs for event processing

## How It Works

When a POST request is sent to `/api/orders`, the orders service publishes an `order.placed` event to RabbitMQ. The inventory service subscribes to this queue and processes the event asynchronously.
