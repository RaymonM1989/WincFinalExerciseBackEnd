import { PrismaClient } from '@prisma/client';


const deleteHostByID = async (id) =>
{
    const prisma = new PrismaClient();

    const deletedHost = await prisma.host.deleteMany(
    {
        where: { id }
    });


    if (!deletedHost || deletedHost.count === 0)
    {
        return null;
    }

    return id;
};

export default deleteHostByID;