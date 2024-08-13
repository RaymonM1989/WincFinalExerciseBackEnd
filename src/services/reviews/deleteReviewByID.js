import { PrismaClient } from '@prisma/client';


const deleteReviewByID = async (id) =>
{
    const prisma = new PrismaClient();

    const deletedReview = await prisma.review.deleteMany(
    {
        where: { id }
    });


    if (!deletedReview || deletedReview.count === 0)
    {
        return null;
    }

    return id;
};

export default deleteReviewByID;