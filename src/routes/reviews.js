import express          from 'express';
import getAllReviews    from '../services/reviews/getAllReviews.js';
import getReviewByID    from '../services/reviews/getReviewByID.js';
import createReview     from '../services/reviews/createReview.js';
import updateReviewByID from '../services/reviews/updateReviewByID.js';
import deleteReviewByID from '../services/reviews/deleteReviewByID.js';
import auth             from '../middleware/auth.js';


const router = express.Router();

router.get('/', async (req, res) =>
{
    try
    {
        const { userId, propertyId, rating } = req.query;
        const reviews = await getAllReviews(userId, propertyId, rating );
        return res.status(200).json(reviews);
    }
    catch (error)
    {
        console.error(error);
        return res.status(500).send('Something went wrong while getting list of reviews!');
    }
});

router.post('/', auth, async (req, res) =>
{
    try
    {
        const { userId, propertyId, rating, comment } = req.body;
        const requiredFields = [ "userId", "propertyId", "rating", "comment" ];

        if (requiredFields.some( field => !req.body[field] ))
        {
            return res.status(400).send("Can't create a new Review with the given data, please double-check your request!");
        }

        const newReview = await createReview(userId, propertyId, rating, comment);
        return res.status(201).json(newReview);
    }
    catch (error)
    {
        console.error(error);
        return res.status(500).send('Something went wrong while creating a new Review!');
    }
});

router.get('/:id', async (req, res) =>
{
    try
    {
        const { id } = req.params;
        const review = await getReviewByID(id);

        if (!review)
        {
            return res.status(404).send(`Review with ID "${id}" was not found!`);
        }
        else
        {
            return res.status(200).json(review);
        }
    }
    catch (error)
    {
        console.error(error);
        return res.status(500).send(`Something went wrong while getting the Review with ID "${id}"!`);
    }
});

router.put('/:id', auth, async (req, res) =>
{
    try
    {
        const { id } = req.params;
        const { userId, propertyId, rating, comment } = req.body;
        const updatedReview = await updateReviewByID(id, userId, propertyId, rating, comment);

        if (updatedReview === null)
        {
            return res.status(404).send(`Review with ID "${id}" was not found!`);
        }
        else
        {
            return res.status(200).json({ message: `Review with ID "${id}" was succesfully updated!` });
        }
    }
    catch (error)
    {
        console.error(error);
        return res.status(500).send(`Something went wrong while updating the Review with ID "${id}"!`);
    }
});

router.delete('/:id', auth, async (req, res) =>
{
    try
    {
        const { id } = req.params;
        const deletedReview = await deleteReviewByID(id);

        if (deletedReview === null)
        {
            return res.status(404).send(`Review with ID "${id}" was not found!`);
        }
        else
        {
            return res.status(200).json({ message: `Review with ID "${id}" was succesfully deleted!` });
        }
    }
    catch (error)
    {
        console.error(error);
        return res.status(500).send(`Something went wrong while deleting the Review with ID "${id}"!`);
    }
});

export default router;