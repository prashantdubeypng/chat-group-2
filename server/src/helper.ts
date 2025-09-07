import { producer } from './config/kafka.config.js'

export const produceChatMessage = async (topic: string, message: any) => {
    try {
        await producer.send({
            topic,
            messages: [{ value: JSON.stringify(message) }]
        });
        console.log('Message sent to Kafka topic:', topic);
    } catch (error) {
        console.warn('Failed to send message to Kafka, continuing without Kafka:', (error as Error).message);
        // Continue without Kafka if it fails
    }
};