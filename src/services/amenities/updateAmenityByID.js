import { PrismaClient } from '@prisma/client';


const updateAmenityByID = async (id, name) =>
{
    const prisma = new PrismaClient();

    const updatedAmenity = await prisma.amenity.updateMany(
    {
        where: { id },
        data: { name }
    });

    if (!updatedAmenity || updatedAmenity.count === 0)
    {
        return null;
    }

    return id;
};

export default updateAmenityByID;