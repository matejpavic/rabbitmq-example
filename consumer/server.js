const amqp = require("amqplib");

const rabbitSettings = {
  protocol: "amqp",
  hostname: "localhost",
  port: 5672,
  username: "guest",
  password: "guest",
  vhost: "/",
  authMechanism: ["PLAIN", "AMQPLAIN", "EXTERNAL"],
};

connect();

async function connect() {
  const queue = "test-queue";

  try {
    const conn = await amqp.connect(rabbitSettings);
    console.log("connection created");

    const channel = await conn.createChannel();
    console.log("channel created");

    const res = await channel.assertQueue(queue);
    console.log("queue created...");

    channel.consume(queue, (message) => {
      const msg = JSON.parse(message.content.toString());
      console.log(`received ${msg.name}`);
    });
  } catch (err) {
    console.log(`Error: ${err}`);
  }
}
