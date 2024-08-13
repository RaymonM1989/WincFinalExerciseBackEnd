import { PrismaClient } from '@prisma/client';


const getBookingByID = async (id) =>
{
    const prisma = new PrismaClient();

    const booking = prisma.booking.findUnique(
    {
        where: { id }
    });

    return booking;
};

export default getBookingByID;