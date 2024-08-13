import express              from 'express';
import getAllProperties     from '../services/properties/getAllProperties.js';
import getPropertyByID      from '../services/properties/getPropertyByID.js';
import createProperty       from '../services/properties/createProperty.js';
import updatePropertyByID   from '../services/properties/updatePropertyByID.js';
import deletePropertyByID   from '../services/properties/deletePropertyByID.js';
import getPropertyAmenities from '../services/properties/getPropertyAmenities.js';
import auth                 from '../middleware/auth.js';


const router = express.Router();

router.get('/', async (req, res) =>
{
    try
    {
        const { title, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating, amenities } = req.query;
        const properties = await getAllProperties(title, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating, amenities);
        return res.status(200).json(properties);
    }
    catch (error)
    {
        console.error(error);
        return res.status(500).send('Something went wrong while getting list of properties!');
    }
});

router.post('/', auth, async (req, res) =>
{
    try
    {
        const { title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating } = req.body;
        const newProperty = await createProperty(title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating);
        return res.status(201).json(newProperty);
    }
    catch (error)
    {
        console.error(error);
        return res.status(400).send("Can't create a new Property with the given data, please double-check your request!");
    }
});

router.get('/:id', async (req, res) =>
{
    try
    {
        const { id } = req.params;
        const property = await getPropertyByID(id);

        if (!property)
        {
            return res.status(404).send(`Property with ID "${id}" was not found!`);
        }
        else
        {
            return res.status(200).json(property);
        }
    }
    catch (error)
    {
        console.error(error);
        return res.status(500).send(`Something went wrong while getting the Property with ID "${id}"!`);
    }
});

router.get('/:id/amenities', async (req, res) =>
    {
        try
        {
            const { id } = req.params;
            const propertyAmenities = await getPropertyAmenities(id);
    
            if (!propertyAmenities)
            {
                return res.status(404).send(`No Amenities were found on Property with ID "${id}"!`);
            }
            else
            {
                return res.status(200).json(propertyAmenities);
            }
        }
        catch (error)
        {
            console.error(error);
            return res.status(500).send(`Something went wrong while getting the Amenities on Property with ID "${id}"!`);
        }
    });

router.put('/:id', auth, async (req, res) =>
{
    try
    {
        const { id } = req.params;
        const { title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating } = req.body;
        const updatedProperty = await updatePropertyByID(id, title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating);

        if (updatedProperty === null)
        {
            return res.status(404).send(`Property with ID "${id}" was not found!`);
        }
        else
        {
            return res.status(200).json({ message: `Property with ID "${id}" was succesfully updated!` });
        }
    }
    catch (error)
    {
        console.error(error);
        return res.status(500).send(`Something went wrong while updating the Property with ID "${id}"!`);
    }
});

router.delete('/:id', auth, async (req, res) =>
{
    try
    {
        const { id } = req.params;
        const deletedProperty = await deletePropertyByID(id);

        if (deletedProperty === null)
        {
            return res.status(404).send(`Property with ID "${id}" was not found!`);
        }
        else
        {
            return res.status(200).json({ message: `Property with ID "${id}" was succesfully deleted!` });
        }
    }
    catch (error)
    {
        console.error(error);
        return res.status(500).send(`Something went wrong while deleting the Property with ID "${id}"!`);
    }
});

export default router;