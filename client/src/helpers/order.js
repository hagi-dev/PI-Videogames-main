const orderData = (data,alphabetOrRating,order) => {
    console.log("orderByAlphabet data: ",data,' sentido',order);
    let orderData = [];
    if(!order){return data};
    if(alphabetOrRating === 'alphabet'){orderData = orderAlphabet(data,order)}
    else if(alphabetOrRating === 'rating'){orderData = orderRating(data,order)}
    console.log("detro de order alpha",orderData);
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