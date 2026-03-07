import { Hono } from "hono";
import { MessageBroker } from "./broker";
import { OrderEvents } from "./dtos";

const BROKER_URL = process.env.MESSAGE_BROKER_URL || "";

const app = new Hono();

const broker = new MessageBroker(BROKER_URL);
await broker.connect();

await broker.subscribe<OrderEvents>("orders.events", handleOrderEvents);

function handleOrderEvents(event: OrderEvents) {
  const type = event.type;
  console.log("New event:", type);

  switch (type) {
    case "order.placed":
      handleOrderPlaced(event.data);
      break;
    default:
      console.error("Unhandled order event:", type);
  }
}

function handleOrderPlaced(data: OrderEvents["data"]) {
  console.log("Handling order placed event:", JSON.stringify(data));
  // Reserve items...
}

export default {
  port: 3001,
  fetch: app.fetch,
};
