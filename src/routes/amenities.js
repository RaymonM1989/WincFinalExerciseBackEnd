import express              from 'express';
import getAllAmenities      from '../services/amenities/getAllAmenities.js';
import getAmenityByID       from '../services/amenities/getAmenityByID.js';
import createAmenity        from '../services/amenities/createAmenity.js';
import updateAmenityByID    from '../services/amenities/updateAmenityByID.js';
import deleteAmenityByID    from '../services/amenities/deleteAmenityByID.js';
import auth                 from '../middleware/auth.js';


const router = express.Router();

router.get('/', async (req, res) =>
{
    try
    {
        const { name } = req.query;
        const amenities = await getAllAmenities(name);
        return res.status(200).json(amenities);
    }
    catch (error)
    {
        console.error(error);
        return res.status(500).send('Something went wrong while getting list of amenities!');
    }
});

router.post('/', auth, async (req, res) =>
{
    try
    {
        const { name } = req.body;
        const newAmenity = await createAmenity(name);
        return res.status(201).json(newAmenity);
    }
    catch (error)
    {
        console.error(error);
        return res.status(400).send("Can't create a new Amenity with the given data, please double-check your request!");
    }
});

router.get('/:id', async (req, res) =>
{
    try
    {
        const { id } = req.params;
        const amenity = await getAmenityByID(id);

        if (!amenity)
        {
            return res.status(404).send(`Amenity with ID "${id}" was not found!`);
        }
        else
        {
            return res.status(200).json(amenity);
        }
    }
    catch (error)
    {
        console.error(error);
        return res.status(500).send(`Something went wrong while getting the Amenity with ID "${id}"!`);
    }
});

router.put('/:id', auth, async (req, res) =>
{
    try
    {
        const { id } = req.params;
        const { name } = req.body;
        const updatedAmenity = await updateAmenityByID(id, name);

        if (updatedAmenity === null)
        {
            return res.status(404).send(`Amenity with ID "${id}" was not found!`);
        }
        else
        {
            return res.status(200).json({ message: `Amenity with ID "${id}" was succesfully updated!` });
        }
    }
    catch (error)
    {
        console.error(error);
        return res.status(500).send(`Something went wrong while updating the Amenity with ID "${id}"!`);
    }
});

router.delete('/:id', auth, async (req, res) =>
{
    try
    {
        const { id } = req.params;
        const deletedAmenity = await deleteAmenityByID(id);

        if (deletedAmenity === null)
        {
            return res.status(404).send(`Amenity with ID "${id}" was not found!`);
        }
        else
        {
            return res.status(200).json({ message: `Amenity with ID "${id}" was succesfully deleted!` });
        }
    }
    catch (error)
    {
        console.error(error);
        return res.status(500).send(`Something went wrong while deleting the Amenity with ID "${id}"!`);
    }
});

export default router;