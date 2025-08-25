import prisma from '../config/db.config.js';
import type{Request , Response} from 'express';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
    dotenv.config();
interface loginPayload{
    name:String;
    password:String;
    email:String;
    image:String;
}
class Usercontroller{
    static async login(req: Request, res: Response) {
        try{
            console.log("i am under login route")
            const {name , password} = req.body;
            let user = await prisma.user.findUnique
            ({
                where:{
                    name:name
                }
            })
            if(!user){
                console.log("error")
return res.status(404).json({message:"User not found"});
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(!isPasswordValid){
                return res.status(401).json({message:"Invalid password"});
            }
            const token = jwt.sign({ id: user.id , username: user.name }, process.env.JWT_SECRET!);
            return res.status(200).json({ token });
        }catch(error){
            console.log(error)
            return res.status(500).json({message:error})

        }
    }
    static async signup(req: Request, res: Response) {
        try {
            const { name, email, password} = req.body;
            const hashedPassword = await bcrypt.hash(password, 15);
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword
                }
            });
            const token = jwt.sign({ id: user.id, username: user.name }, process.env.JWT_SECRET!);
            return res.status(201).json({ token });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    static async getAllUsers(req: Request, res: Response) {
        try {
            const users = await prisma.user.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            });
            return res.status(200).json({ data: users });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "Internal server error" });
        }
    }

}
export default Usercontroller;