import { PrismaClient } from '@prisma/client';


const updatePropertyByID = async (id, title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating) =>
{
    const prisma = new PrismaClient();

    const updatedProperty = await prisma.property.updateMany(
    {
        where: { id },
        data:
        { 
            title, 
            description, 
            location, 
            pricePerNight, 
            bedroomCount, 
            bathRoomCount,
            maxGuestCount,
            hostId, 
            rating,
        }
    });

    if (!updatedProperty || updatedProperty.count === 0)
    {
        return null;
    }

    return id;
};

export default updatePropertyByID;