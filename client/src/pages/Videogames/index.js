import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVideoGames,getAllGenres } from '../../redux/action/actionRoot';

import Header from '../../components/Header/index';
import ButtonCreate from '../../components/ButtonCreate/index';
import VideogameList from '../../components/VideogameList/index';
import FilterAndOrder from '../../components/FilterAndOrder/index';
import { resetVideogame } from '../../redux/action/actionRoot';
import { getStateSelection } from '../../redux/action/actionFilterAndOrder';
import './styleResponsive.scss';

const Videogames = () => {
    const paginateInitial = useSelector(state => state.pagination.paginationData);
    const stateSelection = useSelector(state => state.filterAndOrder.stateSelection);
    const filterData= useSelector(state => state.filterAndOrder.filterData);
    const videoGames = useSelector(state => state.rootReducer.videoGames);
    const dispatch = useDispatch();

    const handleClick = () => {
        stateSelection.state && dispatch(getStateSelection({state:false ,name:''}));
    }

    useEffect(() => {
        if( !filterData.length){
            dispatch(resetVideogame());
            dispatch(getAllVideoGames());
            dispatch(getAllGenres());
        }
        
    }, [])
    return (
    <div className="videogames" onClick={handleClick} >
        <div className="videogames__header">
            <Header/>
        </div>
        <div className="videogames__body">
            <FilterAndOrder videoGames={videoGames}/>
            <VideogameList data={paginateInitial}/>
        </div>
        <div className="videogames__buttonCreate">
            <ButtonCreate/>
        </div>
    </div>
    )
}

export default Videogames
