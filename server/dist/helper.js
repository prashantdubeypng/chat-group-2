import { producer } from './config/kafka.config.js';
export const produceChatMessage = async (topic, message) => {
    try {
        await producer.send({
            topic,
            messages: [{ value: JSON.stringify(message) }]
        });
        console.log('Message sent to Kafka topic:', topic);
    }
    catch (error) {
        console.warn('Failed to send message to Kafka, continuing without Kafka:', error.message);
        // Continue without Kafka if it fails
    }
};
//# sourceMappingURL=helper.js.map