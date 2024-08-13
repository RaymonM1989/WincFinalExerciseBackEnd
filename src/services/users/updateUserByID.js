import { PrismaClient } from '@prisma/client';


const updateUserByID = async (id, username, password, name, email, phoneNumber, profilePicture) =>
{
    const prisma = new PrismaClient();

    const updatedUser = await prisma.user.updateMany(
    {
        where: { id },
        data:
        { 
            username, 
            password, 
            name, 
            email, 
            phoneNumber, 
            profilePicture
        }
    });

    if (!updatedUser || updatedUser.count === 0)
    {
        return null;
    }

    return id;
};

export default updateUserByID;