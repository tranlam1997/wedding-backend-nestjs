import { UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import jwtDecode from 'jwt-decode';

export function decodeToken (req: Omit<Request, 'user'> & {user: {[k:string]: any}}, res: Response, next: NextFunction) {
    if(!req.headers || !req.headers.authorization) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = req.headers.authorization.split(' ')[1];
    try {
        const decodeValue: Record<string,any> = jwtDecode(token);
        console.log(decodeValue)
        if (decodeValue) {
            req.user = decodeValue;
            req.user.displayName = req.user.name;
            req.user.photoURL = decodeValue.picture
            req.user.id = decodeValue.userId;
            req.user.photoID = decodeValue.photoID;
            return next();
        }
        throw new UnauthorizedException('Unauthorized');
    } catch (error) {
        throw new UnauthorizedException('Unauthorized: ', error.message);
    }
}