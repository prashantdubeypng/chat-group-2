import { producer, consumer } from './config/kafka.config.js';
import prisma from './config/db.config.js';
export const produceChatMessage = async (topic, message) => {
    await producer.send({
        topic,
        messages: [{ value: JSON.stringify(message) }]
    });
};
export const _consumer = async (topic) => {
    await consumer.connect();
    await consumer.subscribe({ topic: topic });
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            if (message.value == null) {
                return;
            }
            const data = JSON.parse(message.value.toString());
            await prisma.chat.create({
                data: data
            });
        },
    });
};
//# sourceMappingURL=helper.js.map