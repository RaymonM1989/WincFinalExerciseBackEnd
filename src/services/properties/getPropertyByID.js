import { PrismaClient } from '@prisma/client';


const getPropertyByID = async (id) =>
{
    const prisma = new PrismaClient();

    const property = prisma.property.findUnique(
    {
        where: { id }
    });

    return property;
};

export default getPropertyByID;