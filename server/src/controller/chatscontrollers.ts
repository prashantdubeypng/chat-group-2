import type{Request , Response} from 'express'
import prisma from '../config/db.config.js';
class Chatscontroller{
    static async index(req:Request , res:Response){
        try{
            const {groupId} = req.params;
            const chats = await prisma.chat.findMany({
                where:{
                    group_id: groupId as string
                }
            });
            return res.json({data:chats});
        }catch(error){
            return res.status(500).json({message:"somethings went wrong"});
        }
    }
}
export default Chatscontroller;