import { PrismaClient } from '@prisma/client';


const getAllReviews = async (userId, propertyId, rating) =>
{
    const prisma = new PrismaClient();

    return prisma.review.findMany(
    {
        where: 
        { 
            userId:     { contains: userId      || undefined },
            propertyId: { contains: propertyId  || undefined },
            rating:     rating
        }
    });
};

export default getAllReviews;