import type{Request , Response} from 'express'
import prisma from '../config/db.config.js';
interface GroupUserTypes{
    name :string ,
    group_id:string
}
class ChatGroupUserController{
static async index(req:Request,res:Response){
try{
  const {group_id} = req.query;
  console.log('Fetching users for group_id:', group_id);
  
  const users = await prisma.chatGroupMember.findMany({
    where:{
      group_id: group_id as string
    },
    include: {
      user: true
    }
  });
  
  console.log('Found users:', users);
  return res.status(200).json({message:'data get fetched', data:users});
}catch(error){
  console.error('Error in ChatGroupUserController.index:', error);
  return res.status(500).json({message:'something went wrong'});
}
}
static async store(req:Request,res:Response){
try{
  const {name, group_id} = req.body;
  console.log('ChatGroupUserController.store - Received data:', {name, group_id});
  
  // First, find the user by name
  const user = await prisma.user.findUnique({
    where: { name }
  });
  
  console.log('Found user:', user);
  
  if (!user) {
    console.log('User not found with name:', name);
    return res.status(404).json({message: `User with name '${name}' not found`});
  }
  
  // Check if user is already a member of this group
  const existingMember = await prisma.chatGroupMember.findFirst({
    where: {
      user_id: user.id,
      group_id: group_id
    }
  });
  
  console.log('Existing member check:', existingMember);
  
  if (existingMember) {
    return res.status(400).json({message: 'User is already a member of this group'});
  }
  
  // Create the membership
  const newMember = await prisma.chatGroupMember.create({
    data: {
      user_id: user.id,
      group_id: group_id
    },
    include: {
      user: true
    }
  });
  
  console.log('New member created:', newMember);
  return res.json({message:'user added', data: newMember})
}catch(error){
    console.error('Error in ChatGroupUserController.store:', error)
    return res.status(500).json({message:'something went wrong', error: error instanceof Error ? error.message : 'Unknown error'})
}
}

}
export default ChatGroupUserController;