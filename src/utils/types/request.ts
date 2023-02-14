import { Request } from "express";

export type CustomRequest = Omit<Request, 'user'> & {user: {[k:string]: any}};