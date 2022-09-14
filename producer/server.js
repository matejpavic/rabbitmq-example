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

  const msg = {
    name: "Msg Name testing",
    title: "random title",
  };

  try {
    const conn = await amqp.connect(rabbitSettings);
    console.log("connection created");

    const channel = await conn.createChannel();
    console.log("channel created");

    const res = await channel.assertQueue(queue);
    console.log("queue created...");

    channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
    console.log("message sent");
  } catch (err) {
    console.log(`Error: ${err}`);
  }
}
