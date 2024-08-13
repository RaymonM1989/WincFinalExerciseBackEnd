import { PrismaClient } from '@prisma/client';


const getPropertyAmenities = async (id) => 
{
    const prisma = new PrismaClient();

    const propertyAmenities = await prisma.property.findUnique(
    {
        where:      { id: id },
        include:    { amenities: true }
    });
    
    if (!propertyAmenities || propertyAmenities.count === 0) 
    {
        return null;
    }

    return propertyAmenities;
};

export default getPropertyAmenities;
