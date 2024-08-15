import express   from 'express';
import login from '../services/login/login.js';


const router = express.Router();

router.post('/', async (req, res) =>
{
    try
    {
        const { username, password } = req.body;
        const requiredFields = [ "username", "password" ];

        if (requiredFields.some( field => !req.body[field] ))
        {
            return res.status(400).send("Can't Login with the given data, please double-check your request!");
        }

        const token = await login(username, password);

        if (!token || token === null)
        {
            return res.status(401).json({ message: 'Invalid credentials!' });
        }
        else
        {
            return res.status(200).json({ message: 'Successfully logged in!', token });
        }
    }
    catch (error)
    {
        console.error(error);
        return res.status(500).send('Something went wrong while trying to login!');
    }
});

export default router;
