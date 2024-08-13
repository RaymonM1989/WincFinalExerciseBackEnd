import { PrismaClient } from '@prisma/client';


const deleteAmenityByID = async (id) =>
{
    const prisma = new PrismaClient();

    const deletedAmenity = await prisma.amenity.deleteMany(
    {
        where: { id }
    });


    if (!deletedAmenity || deletedAmenity.count === 0)
    {
        return null;
    }

    return id;
};

export default deleteAmenityByID;