import type { Request, Response, NextFunction } from 'express';
declare const usermiddleware: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export default usermiddleware;
//# sourceMappingURL=usermiddleware.d.ts.map