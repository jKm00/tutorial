import { Hono } from "hono";
import { MessageBroker } from "./broker";
import { OrderDTO } from "./dtos";

const BROKER_URL = process.env.MESSAGE_BROKER_URL || "";

const app = new Hono();

const broker = new MessageBroker(BROKER_URL);
await broker.connect();

app.post("/api/orders", async (c) => {
  const userId = "user1"; // Get from auth method
  const body = (await c.req.json()) as OrderDTO;

  // Do something with order...
  console.log("Created order:", JSON.stringify(body));

  // When order succeeds, publish event
  console.log("Publishing event...");
  await broker.publish("orders.events", {
    type: "order.placed",
    data: {
      userId,
      items: body.items,
    },
  });

  return c.json({ success: true }, 200);
});

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

export default {
  port: 3000,
  fetch: app.fetch,
};
