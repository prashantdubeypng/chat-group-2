declare global {
  interface AuthUser {
    id: string;
    name: string;
    email: string;
  }

  namespace Express {
    export interface Request {
      user?: AuthUser;
    }
  }
}

export {};
