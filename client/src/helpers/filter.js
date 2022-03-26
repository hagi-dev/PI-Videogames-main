export const filterDate = (data,createdOrExisted,genre,dataLength) => {
    if(dataLength===0 && createdOrExisted==='created'){ return [{message: 'No hay resultados'}]}
    let dataSeparation = createdOrExisted === 'created' ? data.slice(0,dataLength) : createdOrExisted === 'existed' ? data.slice(dataLength) : data;
    if(genre==='all' || genre===''){return dataSeparation}
    if(genre !== "all"){
        let dataFilter = dataSeparation && dataSeparation.filter((element)=>{
        for (const item of element.genres) {
            if(item.name===genre){
                return element
            }
        }
        })
        dataFilter = !dataFilter.length ? [{message: 'No hay resultados'}] :  dataFilter;
        return dataFilter;
    }
}
    

