import { PrismaClient } from '@prisma/client';


const getAllAmenities = async (name) =>
{
    const prisma = new PrismaClient();

    return prisma.amenity.findMany(
    {
        where: 
        {
            name: { contains: name || undefined }
        }
        
    });
};

export default getAllAmenities;