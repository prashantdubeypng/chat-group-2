import prisma from '../config/db.config.js';
class chatroomcontroller {
    static async all_chatroom(req, res) {
        try {
            const user = req.user;
            const data = await prisma.chatgroup.findMany({
                where: {
                    owner_id: user.id
                },
                orderBy: {
                    created_at: "desc"
                }
            });
            return res.status(200).json({ message: 'success', data });
        }
        catch (error) {
            return res.status(500).json('error');
        }
    }
    static async show(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: "id param is required" });
            }
            const chatgroup = await prisma.chatgroup.findUnique({
                where: { id }
            });
            if (!chatgroup) {
                return res.status(404).json({ message: "Chat group not found" });
            }
            return res.json({ message: "success", data: chatgroup });
        }
        catch (error) {
            return res.status(500).json("error");
        }
    }
    static async store(req, res) {
        try {
            const body = req.body;
            const user = req.user;
            await prisma.chatgroup.create({
                data: {
                    owner_id: user.id,
                    title: body.title,
                    passcode: body.passcode
                }
            });
            return res.json({ message: 'chat group created' });
        }
        catch (error) {
            return res.status(500).json('error');
        }
    }
    static async destroy(req, res) {
        try {
            const { id } = req.params;
            const user = req.user;
            if (!id) {
                return res.status(400).json({ message: "id param is required" });
            }
            const result = await prisma.chatgroup.deleteMany({
                where: {
                    id,
                    owner_id: user.id,
                },
            });
            if (result.count === 0) {
                return res.status(403).json({ message: "Not allowed or chat group not found" });
            }
            return res.json({ message: "Chat group deleted successfully" });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }
    static async update(req, res) {
        try {
            const { id } = req.params;
            const body = req.body;
            if (!id) {
                return res.status(400).json({ message: "id param is required" });
            }
            const chatgroup = await prisma.chatgroup.update({
                data: {
                    title: body.title,
                    passcode: body.passcode
                }, where: {
                    id: id
                }
            });
            if (!chatgroup) {
                return res.status(404).json({ message: "Chat group not found" });
            }
            return res.json({ message: "success chatroom get updated", data: chatgroup });
        }
        catch (error) {
            return res.status(500).json("error");
        }
    }
}
export default chatroomcontroller;
//# sourceMappingURL=chatroomcontroller.js.map