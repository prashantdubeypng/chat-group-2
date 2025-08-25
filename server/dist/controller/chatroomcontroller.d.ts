import type { Request, Response } from 'express';
declare class chatroomcontroller {
    static all_chatroom(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static show(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static store(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static destroy(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    static update(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
}
export default chatroomcontroller;
//# sourceMappingURL=chatroomcontroller.d.ts.map