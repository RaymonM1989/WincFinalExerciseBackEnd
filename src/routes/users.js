import express          from 'express';
import getAllUsers      from '../services/users/getAllUsers.js';
import getUserByID      from '../services/users/getUserByID.js';
import createUser       from '../services/users/createUser.js';
import updateUserByID   from '../services/users/updateUserByID.js';
import deleteUserByID   from '../services/users/deleteUserByID.js';
import auth             from '../middleware/auth.js';


const router = express.Router();

router.get('/', async (req, res) =>
{
    try
    {
        const { username, name, email } = req.query;
        const users = await getAllUsers(username, name, email);
        return res.status(200).json(users);
    }
    catch (error)
    {
        console.error(error);
        return res.status(500).send('Something went wrong while getting list of users!');
    }
});

router.post('/', auth, async (req, res) =>
{
    try
    {
        const { username, password, name, email, phoneNumber, profilePicture } = req.body;
        const newUser = await createUser(username, password, name, email, phoneNumber, profilePicture);
        return res.status(201).json(newUser);
    }
    catch (error)
    {
        console.error(error);
        return res.status(400).send("Can't create a new User with the given data, please double-check your request!");
    }
});

router.get('/:id', async (req, res) =>
{
    try
    {
        const { id } = req.params;
        const user = await getUserByID(id);

        if (!user)
        {
            return res.status(404).send(`User with ID "${id}" was not found!`);
        }
        else
        {
            return res.status(200).json(user);
        }
    }
    catch (error)
    {
        console.error(error);
        return res.status(500).send(`Something went wrong while getting the User with ID "${id}"!`);
    }
});

router.put('/:id', auth, async (req, res) =>
{
    try
    {
        const { id } = req.params;
        const { username, password, name, email, phoneNumber, profilePicture } = req.body;
        const updatedUser = await updateUserByID(id, username, password, name, email, phoneNumber, profilePicture);

        if (updatedUser === null)
        {
            return res.status(404).send(`User with ID "${id}" was not found!`);
        }
        else
        {
            return res.status(200).json({ message: `User with ID "${id}" was succesfully updated!` });
        }
    }
    catch (error)
    {
        console.error(error);
        return res.status(500).send(`Something went wrong while updating the User with ID "${id}"!`);
    }
});

router.delete('/:id', auth, async (req, res) =>
{
    try
    {
        const { id } = req.params;
        const deletedUser = await deleteUserByID(id);

        if (deletedUser === null)
        {
            return res.status(404).send(`User with ID "${id}" was not found!`);
        }
        else
        {
            return res.status(200).json({ message: `User with ID "${id}" was succesfully deleted!` });
        }
    }
    catch (error)
    {
        console.error(error);
        return res.status(500).send(`Something went wrong while deleting the User with ID "${id}"!`);
    }
});

export default router;