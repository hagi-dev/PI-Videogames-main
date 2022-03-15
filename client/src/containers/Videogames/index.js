import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllVideoGames } from '../../redux/action/actionRoot';

import Header from '../../components/Header/index';
import Background from '../../assets/img/background.png';
import './style.scss';

const Videogames = () => {
    const videoGames = useSelector(state => state.rootReducer.videoGames);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllVideoGames());
    }, [])
    return (
    <div className="videogames" style={{backgroundImage: {Background}}}>
        <img className="background" src={Background} alt="background"/>
        <div className="videogames__header">
            <Header/>
        </div>
        <div className="videogames__body">
            <h1>hol</h1>
        </div>
    </div>
    )
}

export default Videogames
