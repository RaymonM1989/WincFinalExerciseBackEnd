import { PrismaClient } from '@prisma/client';


const getAllUsers = async (username, name, email) =>
{
    const prisma = new PrismaClient();

    return prisma.user.findMany(
    {
        where: 
        { 
            username:   { contains: username    || undefined },
            name:       { contains: name        || undefined },
            email:      { contains: email       || undefined }
        }
    });
};

export default getAllUsers;