import { ReviewType } from "@/types/Product";

export const averageReviews = (reviews:ReviewType[]):number => {
    if(!reviews || reviews.length == 0) return  0;
    if(reviews.length == 1) return  reviews[0].rating;
    let sum = 0;
    for(let i = 0; i < reviews.length; i++ ){
        const currentRating = reviews[i].rating;
        sum += currentRating;
    }
    return  sum / reviews.length;
}