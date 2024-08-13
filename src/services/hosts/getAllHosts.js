import { PrismaClient } from '@prisma/client';


const getAllHosts = async (username, name, email) =>
{
    const prisma = new PrismaClient();

    return prisma.host.findMany(
    {
        where: 
        { 
            username:   { contains: username    || undefined },
            name:       { contains: name        || undefined },
            email:      { contains: email       || undefined }
        }
    });
};

export default getAllHosts;