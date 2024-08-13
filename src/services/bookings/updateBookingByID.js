import { PrismaClient } from '@prisma/client';


const updateBookingByID = async (id, userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus) =>
{
    const prisma = new PrismaClient();

    const updatedBooking = await prisma.booking.updateMany(
    {
        where: { id },
        data:
        { 
            userId, 
            propertyId, 
            checkinDate, 
            checkoutDate, 
            numberOfGuests, 
            totalPrice, 
            bookingStatus
        }
    });

    if (!updatedBooking || updatedBooking.count === 0)
    {
        return null;
    }

    return id;
};

export default updateBookingByID;