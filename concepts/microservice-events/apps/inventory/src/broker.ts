import * as amqp from "amqplib";

export class MessageBroker {
  private url: string;
  private connection: amqp.ChannelModel | null = null;
  private channel: amqp.Channel | null = null;

  constructor(url: string) {
    this.url = url;
  }

  async connect() {
    this.connection = await amqp.connect(this.url);
    this.channel = await this.connection.createChannel();
  }

  async publish<T>(queue: string, message: T) {
    if (!this.channel) throw new Error("Broker not connected");

    await this.channel.assertQueue(queue, { durable: true });

    this.channel?.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
      persistent: true,
    });
  }

  async subscribe<T>(
    queue: string,
    handler: (message: T) => Promise<void> | void,
  ) {
    if (!this.channel) throw new Error("Broker not connected");

    await this.channel.assertQueue(queue, { durable: true });

    await this.channel.consume(queue, async (msg) => {
      if (!msg) return;

      try {
        const message = JSON.parse(msg.content.toString()) as T;
        await handler(message);
        this.channel!.ack(msg);
      } catch (err) {
        console.error("Failed to process messsage:", err);
        // Requeue event
        this.channel!.nack(msg, false, false);
      }
    });
  }
}
