import jwt from 'jsonwebtoken';

export const generateToken = (userId: string, userRole:string, myClass?: string): string => {
    return jwt.sign({userId, userRole, myClass}, process.env.JWT_SECRET as string, {expiresIn: '1h'})
}