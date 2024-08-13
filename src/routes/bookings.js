import express              from 'express';
import getAllBookings       from '../services/bookings/getAllBookings.js';
import getBookingByID       from '../services/bookings/getBookingByID.js';
import createBooking        from '../services/bookings/createBooking.js';
import updateBookingByID    from '../services/bookings/updateBookingByID.js';
import deleteBookingByID    from '../services/bookings/deleteBookingByID.js';
import auth                 from '../middleware/auth.js';


const router = express.Router();

router.get('/', async (req, res) =>
{
    try
    {
        const { userId, propertyId, bookingStatus } = req.query;
        const bookings = await getAllBookings(userId, propertyId, bookingStatus);
        return res.status(200).json(bookings);
    }
    catch (error)
    {
        console.error(error);
        return res.status(500).send('Something went wrong while getting list of bookings!');
    }
});

router.post('/', auth, async (req, res) =>
{
    try
    {
        const { userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus } = req.body;
        const newBooking = await createBooking(userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus);
        return res.status(201).json(newBooking);
    }
    catch (error)
    {
        console.error(error);
        return res.status(400).send("Can't create a new Booking with the given data, please double-check your request!");
    }
});

router.get('/:id', async (req, res) =>
{
    try
    {
        const { id } = req.params;
        const booking = await getBookingByID(id);

        if (!booking)
        {
            return res.status(404).send(`Booking with ID "${id}" was not found!`);
        }
        else
        {
            return res.status(200).json(booking);
        }
    }
    catch (error)
    {
        console.error(error);
        return res.status(500).send(`Something went wrong while getting the Booking with ID "${id}"!`);
    }
});

router.put('/:id', auth, async (req, res) =>
{
    try
    {
        const { id } = req.params;
        const { userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus } = req.body;
        const updatedBooking = await updateBookingByID(id, userId, propertyId, checkinDate, checkoutDate, numberOfGuests, totalPrice, bookingStatus);

        if (updatedBooking === null)
        {
            return res.status(404).send(`Booking with ID "${id}" was not found!`);
        }
        else
        {
            return res.status(200).json({ message: `Booking with ID "${id}" was succesfully updated!` });
        }
    }
    catch (error)
    {
        console.error(error);
        return res.status(500).send(`Something went wrong while updating the Booking with ID "${id}"!`);
    }
});

router.delete('/:id', auth, async (req, res) =>
{
    try
    {
        const { id } = req.params;
        const deletedBooking = await deleteBookingByID(id);

        if (deletedBooking === null)
        {
            return res.status(404).send(`Booking with ID "${id}" was not found!`);
        }
        else
        {
            return res.status(200).json({ message: `Booking with ID "${id}" was succesfully deleted!` });
        }
    }
    catch (error)
    {
        console.error(error);
        return res.status(500).send(`Something went wrong while deleting the Booking with ID "${id}"!`);
    }
});

export default router;