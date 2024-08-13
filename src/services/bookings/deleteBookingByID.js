import { PrismaClient } from '@prisma/client';


const deleteBookingByID = async (id) =>
{
    const prisma = new PrismaClient();

    const deletedBooking = await prisma.booking.deleteMany(
    {
        where: { id }
    });


    if (!deletedBooking || deletedBooking.count === 0)
    {
        return null;
    }

    return id;
};

export default deleteBookingByID;