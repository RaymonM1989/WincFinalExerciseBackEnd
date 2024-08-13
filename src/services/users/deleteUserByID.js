import { PrismaClient } from '@prisma/client';


const deleteUserByID = async (id) =>
{
    const prisma = new PrismaClient();

    const deletedUser = await prisma.user.deleteMany(
    {
        where: { id }
    });


    if (!deletedUser || deletedUser.count === 0)
    {
        return null;
    }

    return id;
};

export default deleteUserByID;