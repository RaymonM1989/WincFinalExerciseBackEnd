import { PrismaClient } from '@prisma/client';


const getReviewByID = async (id) =>
{
    const prisma = new PrismaClient();

    const review = prisma.review.findUnique(
    {
        where: { id }
    });

    return review;
};

export default getReviewByID;