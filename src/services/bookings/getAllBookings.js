import { PrismaClient } from '@prisma/client';


const getAllBookings = async (userId, propertyId, bookingStatus) =>
{
    const prisma = new PrismaClient();

    return prisma.booking.findMany(
    {
        where: 
        { 
            userId:         { contains: userId          || undefined },
            propertyId:     { contains: propertyId      || undefined },
            bookingStatus:  { contains: bookingStatus   || undefined }
        }
    });
};

export default getAllBookings;