import { Hono } from "hono";
import { MessageBroker } from "./broker";
import { OrderEvents } from "./dtos";
import pc from "picocolors";

const BROKER_URL = process.env.MESSAGE_BROKER_URL || "";

const app = new Hono();

const broker = new MessageBroker(BROKER_URL);
await broker.connect();

console.log(
  pc.magenta("📦 INVENTORY SERVICE") + pc.dim(" → Connected to RabbitMQ"),
);
await broker.subscribe<OrderEvents>("orders.events", handleOrderEvents);
console.log(pc.magenta("👂 Listening") + pc.dim(" → orders.events\n"));

function handleOrderEvents(event: OrderEvents) {
  const type = event.type;
  console.log("\n" + pc.magenta("📦 INVENTORY SERVICE"));
  console.log(pc.yellow("📥 Received event") + pc.dim(` → ${type}`));

  switch (type) {
    case "order.placed":
      handleOrderPlaced(event.data);
      break;
    default:
      console.error(pc.red("✗") + ` Unhandled order event: ${type}\n`);
  }
}

function handleOrderPlaced(data: OrderEvents["data"]) {
  console.log(pc.dim("  User:") + ` ${data.userId}`);
  console.log(
    pc.dim("  Items:") +
      ` ${data.items.map((i) => `${i.id} (${i.quantity}x)`).join(", ")}`,
  );
  console.log(pc.green("✓") + " Processing inventory reservation...");
  // Reserve items...
  console.log(pc.green("✓") + " Inventory reserved successfully\n");
}

export default {
  port: 3001,
  fetch: app.fetch,
};
