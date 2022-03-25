export function paginationData (data,subPart,page) {
    let paginationData = [];
    if( !data || data.length===0){
        return [];
    }
    if(data.length<=subPart){
        return data;
    }
    if (data.length > subPart){
        paginationData = data.slice(subPart*(page-1),subPart*(page));
    }
    return paginationData;
}

export function partPaginationDate (data,subPart) {
    let part = 1;
    let rest = 0;
    let pagination= [];
    if( !data || data.length===0){
        return [];
    }
    if(data.length < subPart){
        pagination.push(1);
        return pagination;
    }
    else if (data.length > subPart){
        part = Math.floor(data.length/subPart);
        rest = data.length%subPart;
    }
    let countChange = rest ? part+=1 : part;
    for (let i = 1; i <= countChange;i++){
        pagination.push(i);
    }
    return pagination;
}