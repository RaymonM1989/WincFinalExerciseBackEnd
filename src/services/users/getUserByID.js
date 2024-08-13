import { PrismaClient } from '@prisma/client';


const getUserByID = async (id) =>
{
    const prisma = new PrismaClient();

    const user = prisma.user.findUnique(
    {
        where: { id }
    });

    return user;
};

export default getUserByID;