import express          from 'express';
import getAllHosts      from '../services/hosts/getAllHosts.js';
import getHostByID      from '../services/hosts/getHostByID.js';
import createHost       from '../services/hosts/createHost.js';
import updateHostByID   from '../services/hosts/updateHostByID.js';
import deleteHostByID   from '../services/hosts/deleteHostByID.js';
import auth             from '../middleware/auth.js';


const router = express.Router();

router.get('/', async (req, res) =>
{
    try
    {
        const { username, name, email } = req.query;
        const hosts = await getAllHosts(username, name, email);
        return res.status(200).json(hosts);
    }
    catch (error)
    {
        console.error(error);
        return res.status(500).send('Something went wrong while getting list of hosts!');
    }
});

router.post('/', auth, async (req, res) =>
{
    try
    {
        const { username, password, name, email, phoneNumber, profilePicture, aboutMe } = req.body;
        const newHost = await createHost(username, password, name, email, phoneNumber, profilePicture, aboutMe);
        return res.status(201).json(newHost);
    }
    catch (error)
    {
        console.error(error);
        return res.status(400).send("Can't create a new Host with the given data, please double-check your request!");
    }
});

router.get('/:id', async (req, res) =>
{
    try
    {
        const { id } = req.params;
        const host = await getHostByID(id);

        if (!host)
        {
            return res.status(404).send(`Host with ID "${id}" was not found!`);
        }
        else
        {
            return res.status(200).json(host);
        }
    }
    catch (error)
    {
        console.error(error);
        return res.status(500).send(`Something went wrong while getting the Host with ID "${id}"!`);
    }
});

router.put('/:id', auth, async (req, res) =>
{
    try
    {
        const { id } = req.params;
        const { username, password, name, email, phoneNumber, profilePicture, aboutMe } = req.body;
        const updatedHost = await updateHostByID(id, username, password, name, email, phoneNumber, profilePicture, aboutMe);

        if (updatedHost === null)
        {
            return res.status(404).send(`Host with ID "${id}" was not found!`);
        }
        else
        {
            return res.status(200).json({ message: `Host with ID "${id}" was succesfully updated!` });
        }
    }
    catch (error)
    {
        console.error(error);
        return res.status(500).send(`Something went wrong while updating the Host with ID "${id}"!`);
    }
});

router.delete('/:id', auth, async (req, res) =>
{
    try
    {
        const { id } = req.params;
        const deletedHost = await deleteHostByID(id);

        if (deletedHost === null)
        {
            return res.status(404).send(`Host with ID "${id}" was not found!`);
        }
        else
        {
            return res.status(200).json({ message: `Host with ID "${id}" was succesfully deleted!` });
        }
    }
    catch (error)
    {
        console.error(error);
        return res.status(500).send(`Something went wrong while deleting the Host with ID "${id}"!`);
    }
});

export default router;