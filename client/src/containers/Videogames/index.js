import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVideoGames } from '../../redux/action/actionRoot';

import Header from '../../components/Header/index';
import ButtonCreate from '../../components/ButtonCreate/index';
import Background from '../../assets/img/background.png';
import VideogameList from '../../components/VideogameList/index';
import FilterAndOrder from '../../components/FilterAndOrder/index';
import { InitialPaginationData } from '../../redux/action/actionPagination';
import { getStateSelection, initialFilterData } from '../../redux/action/actionFilterAndOrder';
import './style.scss';

const Videogames = () => {
    const paginateInitial = useSelector(state => state.pagination.paginationData);
    const stateSelection = useSelector(state => state.filterAndOrder.stateSelection);
    const dispatch = useDispatch();

    const handleClick = () => {
        stateSelection.state && dispatch(getStateSelection({state:false ,name:''}));
    }

    useEffect(() => {
        dispatch(getAllVideoGames());
        dispatch(initialFilterData());
        dispatch(InitialPaginationData());
        
    }, [])
    return (
    <div className="videogames" onClick={handleClick} style={{backgroundImage: {Background}}}>
        <img className="background" src={Background} alt="background"/>
        <div className="videogames__header">
            <Header/>
        </div>
        <div className="videogames__body">
            <FilterAndOrder/>
            <VideogameList data={paginateInitial}/>
        </div>
        <div className="videogames__buttonCreate">
            <ButtonCreate/>
        </div>
    </div>
    )
}

export default Videogames
