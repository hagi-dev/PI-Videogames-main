import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVideoGames } from '../../redux/action/actionRoot';

import Header from '../../components/Header/index';
import Background from '../../assets/img/background.png';
import VideogameList from '../../components/VideogameList/index';
import FilterAndOrder from '../../components/FilterAndOrder/index';
import { getStateSelection } from '../../redux/action/actionFilterAndOrder';
import './style.scss';

const Videogames = () => {
    const videoGames = useSelector(state => state.rootReducer.videoGames);
    const stateSelection = useSelector(state => state.filter.stateSelection);
    const dispatch = useDispatch();

    const handleClick = () => {
        console.log('click base')
        stateSelection.state && dispatch(getStateSelection({state:false ,name:''}));
    }

    useEffect(() => {
        dispatch(getAllVideoGames());
    }, [])
    return (
    <div className="videogames" onClick={handleClick} style={{backgroundImage: {Background}}}>
        <img className="background" src={Background} alt="background"/>
        <div className="videogames__header">
            <Header/>
        </div>
        <div className="videogames__body">
            <FilterAndOrder/>
            <VideogameList/>
        </div>
    </div>
    )
}

export default Videogames
