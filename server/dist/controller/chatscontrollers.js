import prisma from '../config/db.config.js';
class Chatscontroller {
    static async index(req, res) {
        try {
            const { groupId } = req.params;
            const chats = await prisma.chat.findMany({
                where: {
                    group_id: groupId
                }
            });
            return res.json({ data: chats });
        }
        catch (error) {
            return res.status(500).json({ message: "somethings went wrong" });
        }
    }
}
export default Chatscontroller;
//# sourceMappingURL=chatscontrollers.js.map