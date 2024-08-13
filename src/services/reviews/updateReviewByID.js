import { PrismaClient } from '@prisma/client';


const updateReviewByID = async (id, userId, propertyId, rating, comment) =>
{
    const prisma = new PrismaClient();

    const updatedReview = await prisma.review.updateMany(
    {
        where: { id },
        data:
        { 
            userId, 
            propertyId, 
            rating, 
            comment
        }
    });

    if (!updatedReview || updatedReview.count === 0)
    {
        return null;
    }

    return id;
};

export default updateReviewByID;