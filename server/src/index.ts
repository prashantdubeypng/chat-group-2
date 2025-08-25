import express from 'express';
import type { Request, Response } from 'express';
import cors from "cors";
import {Server} from 'socket.io'
import {createServer} from 'http'
const PORT = process.env.PORT || 3001;
import router from './routes/index.js';
import {setupSocket} from './socket.js' 
import { createAdapter } from "@socket.io/redis-streams-adapter";
import redis from './config/redis.config.js'
import { connectkafkaproducer} from './config/kafka.config.js'
import { _consumer} from './helper.js'
const app = express();
app.use(cors({
  origin:'*',
  credentials:true
}))
app.use(express.json());
const server = createServer(app)
const io = new Server(server,{
  cors:{
    origin:'*',
    credentials:true
  },
  adapter:createAdapter(redis)
})
setupSocket(io)
export {io}
connectkafkaproducer().catch((error)=>{
  console.log("something went wrong")
  console.error(error)
})
 _consumer(process.env.KAFKA_TOPIC!).catch((err)=>{
  console.log('error')
  console.error(err)
 })
app.use('/api/chatroom/v1', router);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
