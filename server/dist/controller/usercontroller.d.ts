import type { Request, Response } from 'express';
declare class Usercontroller {
    static login(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static signup(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static getAllUsers(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
export default Usercontroller;
//# sourceMappingURL=usercontroller.d.ts.map