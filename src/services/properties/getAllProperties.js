import { PrismaClient } from '@prisma/client';


const getAllProperties = async (title, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating, amenities) =>
{
    const prisma = new PrismaClient();

    return prisma.property.findMany(
    {
        where: 
        { 
            title:          { contains: title           || undefined },
            location:       { contains: location        || undefined },
            pricePerNight:  { contains: pricePerNight   || undefined },
            bedroomCount:   { contains: bedroomCount    || undefined },
            bathRoomCount:  { contains: bathRoomCount   || undefined },
            maxGuestCount:  { contains: maxGuestCount   || undefined },
            hostId:         { contains: hostId          || undefined },
            rating:         { contains: rating          || undefined },
            amenities:      { contains: amenities       || undefined }
        }
    });
};

export default getAllProperties;