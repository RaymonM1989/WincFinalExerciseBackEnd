import { PrismaClient } from '@prisma/client';


const getAllProperties = async (title, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating, amenities) =>
{
    const prisma = new PrismaClient();

    return prisma.property.findMany(
    {
        where: 
        { 
            title:          { contains: title       || undefined },
            location:       { contains: location    || undefined },
            hostId:         { contains: hostId      || undefined },
            amenities:      { contains: amenities   || undefined },
            bedroomCount:   bedroomCount,
            bathRoomCount:  bathRoomCount,
            maxGuestCount:  maxGuestCount,
            pricePerNight:  pricePerNight,
            rating:         rating
            
        }
    });
};

export default getAllProperties;