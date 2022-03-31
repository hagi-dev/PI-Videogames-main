const orderData = (data,alphabetOrRating,order) => {
    let orderData = [];
    if(!alphabetOrRating.length){
        return data;
    }
    if(!order){return data};
    if(alphabetOrRating === 'alphabet'){orderData = orderAlphabet(data,order)}
    else if(alphabetOrRating === 'rating'){orderData = orderRating(data,order)}
    else if(alphabetOrRating === 'rating count'){
        orderData = orderRatingCount(data,order)
    }
    return orderData;
}

export default orderData;



const orderAlphabet = (data,order) => {
    let orderData = [];
    if(order && order === "asc"){
        orderData = data.sort(
            (a,b)=>{
                if(a.name > b.name){
                    return 1;
                }
                else if(a.name < b.name){
                    return -1;
                }
                else{
                    return 0;
                }
            }
        );
    }
    else if(order && order === "desc"){
        orderData = data.sort(
            (a,b)=>{
                if(a.name < b.name){
                    return 1;
                }
                else if(a.name > b.name){
                    return -1;
                }
                else{
                    return 0;
                }
            }
        );
    }
    return orderData;
}

const orderRating = (data,order) =>{
    let orderData = []; 
    if(order && order === 'asc'){
        orderData = data.sort(
            (a,b)=>{
                return a.rating-b.rating;
            }
        )
    }
    else if(order && order === 'desc'){
        orderData = data.sort(
            (a,b)=>{
                return b.rating-a.rating;
            }
        )
    }
    return orderData;
}

const orderRatingCount = (data,order) =>{
    let orderData = []; 
    if(order && order === 'asc'){
        orderData = data.sort(
            (a,b)=>{
                return a.ratings_count-b.ratings_count;
            }
        )
    }
    else if(order && order === 'desc'){
        orderData = data.sort(
            (a,b)=>{
                return b.ratings_count-a.ratings_count;
            }
        )
    }
    return orderData;
}