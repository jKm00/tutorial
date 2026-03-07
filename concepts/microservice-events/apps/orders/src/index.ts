import { Hono } from "hono";
import { MessageBroker } from "./broker";
import { OrderDTO } from "./dtos";
import pc from "picocolors";

const BROKER_URL = process.env.MESSAGE_BROKER_URL || "";

const app = new Hono();

const broker = new MessageBroker(BROKER_URL);
await broker.connect();
console.log(
  pc.cyan("📦 ORDERS SERVICE") + pc.dim(" → Connected to RabbitMQ\n"),
);

app.post("/api/orders", async (c) => {
  const userId = "user1"; // Get from auth method
  const body = (await c.req.json()) as OrderDTO;

  console.log("\n" + pc.cyan("📦 ORDERS SERVICE"));
  console.log(pc.green("✓") + " Received order request");
  console.log(pc.dim("  User:") + ` ${userId}`);
  console.log(
    pc.dim("  Items:") +
      ` ${body.items.map((i) => `${i.id} (${i.quantity}x)`).join(", ")}`,
  );

  console.log(pc.yellow("📤 Publishing event") + pc.dim(" → orders.events"));
  await broker.publish("orders.events", {
    type: "order.placed",
    data: {
      userId,
      items: body.items,
    },
  });
  console.log(pc.green("✓") + " Event published successfully\n");

  return c.json({ success: true }, 200);
});

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default {
  port: 3000,
  fetch: app.fetch,
};
