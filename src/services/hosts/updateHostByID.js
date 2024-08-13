import { PrismaClient } from '@prisma/client';


const updateHostByID = async (id, username, password, name, email, phoneNumber, profilePicture, aboutMe) =>
{
    const prisma = new PrismaClient();

    const updatedHost = await prisma.host.updateMany(
    {
        where: { id },
        data:
        { 
            username, 
            password, 
            name, 
            email, 
            phoneNumber, 
            profilePicture,
            aboutMe
        }
    });

    if (!updatedHost || updatedHost.count === 0)
    {
        return null;
    }

    return id;
};

export default updateHostByID;