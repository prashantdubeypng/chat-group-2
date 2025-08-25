import { Router } from 'express';
import Usercontroller from '../controller/usercontroller.js';
import chatroomcontroller from '../controller/chatroomcontroller.js';
import ChatGroupUserController from '../controller/chatgroupusercontroller.js';
import usermiddleware from '../middleware/usermiddleware.js';
import Chatscontroller from '../controller/chatscontrollers.js';
const router = Router();
router.post('/auth/login', Usercontroller.login);
router.post('/auth/signup', Usercontroller.signup);
router.post('/create/chat-group', usermiddleware, chatroomcontroller.store);
router.get('/all/chat-groups', usermiddleware, chatroomcontroller.all_chatroom);
router.get('/show/chat-group/:id', chatroomcontroller.show);
router.patch('/update/chat-group/:id', usermiddleware, chatroomcontroller.update);
router.delete('/delete/chat-group/:id', usermiddleware, chatroomcontroller.destroy);
// chats group users
router.get('/chat-group-users', usermiddleware, ChatGroupUserController.index);
router.put('/chat-group-add-users', usermiddleware, ChatGroupUserController.store);
// users
router.get('/users', usermiddleware, Usercontroller.getAllUsers);
// chats messages
router.get('/chat-group-get-message/:groupId', usermiddleware, Chatscontroller.index);
export default router;
//# sourceMappingURL=index.js.map