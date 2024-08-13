import { PrismaClient } from '@prisma/client';


const deletePropertyByID = async (id) =>
{
    const prisma = new PrismaClient();

    const deletedProperty = await prisma.property.deleteMany(
    {
        where: { id }
    });


    if (!deletedProperty || deletedProperty.count === 0)
    {
        return null;
    }

    return id;
};

export default deletePropertyByID;