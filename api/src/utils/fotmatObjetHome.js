exports.formatObjetHome = (data)=>{
    let result = {
        id: data.id,
        name: data.name,
        image: data.background_image ? data.background_image : null,
        genres: data.genres && data.genres.map(e => {
        return {
            id: e.id,
            name: e.name,
        };
        }),
    };
    return result;
}