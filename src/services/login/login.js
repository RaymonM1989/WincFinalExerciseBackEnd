import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';


const login = async (username, password) =>
{
    const prisma = new PrismaClient();
    const secretKey = process.env.AUTH_SECRET_KEY || 'my-secret-key';

    const user = await prisma.user.findFirst(
    {
        where:
        {
            username,
            password
        }
    });

    if (!user)
    {
        return null;
    }

    const token = jwt.sign({ userId: user.id }, secretKey);

    return token;
}

export default login;