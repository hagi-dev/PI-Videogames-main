import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';

import {
    getFilterData,
    getFilterCreatedOrExisted,
    getStateSelection,
    getFilterGenre,
    getOrderAlphabetOrRating,
    getOrderAscendingOrDescending,
    getOrderData
} from '../../redux/action/actionFilterAndOrder';
import {paginationData} from '../../helpers/pagination';
import { getPaginationCurrent,getPageCurrent } from '../../redux/action/actionPagination';
import { getAllVideoGames} from '../../redux/action/actionRoot';
import './style.scss';

const Selection = props => {
    const dispatch = useDispatch();
    const [see,setSee] = useState(false);
    const {options,version,functionActiva,name} = props;
    const videoGames = useSelector(state => state.rootReducer.videoGames);
    const stateFilter = useSelector(state => state.filterAndOrder.stateFilter);
    const stateOder = useSelector(state => state.filterAndOrder.stateOrder);
    const filterData = useSelector(state => state.filterAndOrder.filterData);
    const stateSelection = useSelector(state => state.filterAndOrder.stateSelection);
    const [textSelection,setTextSelection] = useState('');

    const handleClick = (e) => {
        dispatch(getStateSelection({state:!stateSelection.state ,name:name}));
    }
    const handleChange = async (e) => {
        let replaces = e.target.innerText.trim().replace(/\-/g, '');
        if(name === 'Genre'){
            functionActiva((etem)=>{
                return {...etem,state1:true}
            })
            dispatch(getFilterGenre(replaces));
            dispatch(getAllVideoGames());
            dispatch(getFilterData({videoGames:videoGames.resData,apiCount:videoGames.apiCount,genre:replaces,createdOrExisted:stateFilter.createdOrExisted}));
        }
        if(name === 'Created Or Existed'){
            functionActiva((etem)=>{
                return {...etem,state2:true}
            })
            dispatch(getFilterCreatedOrExisted(replaces));
            dispatch(getAllVideoGames());
            dispatch(getFilterData({videoGames:videoGames.resData,apiCount:videoGames.apiCount,genre:stateFilter.genre,createdOrExisted:replaces}));
            // dispatch(getPaginationCurrent(paginationData(filterData,15,1)));
            // dispatch(getPageCurrent(1));
        }
        if(name === 'Alphabet or Rating'){
            functionActiva((etem)=>{
                return {...etem,state3:true}
            })
            dispatch(getOrderAlphabetOrRating(replaces));
            dispatch(getOrderData({videoGames: filterData,order:stateOder.order,alphabetOrRating:replaces}));
            dispatch(getPaginationCurrent(paginationData(filterData,15,1)));
            dispatch(getPageCurrent(1));
        }
        if(name === 'Asc or Desc'){
            functionActiva((etem)=>{
                return {...etem,state4:true}
            })
            dispatch(getOrderAscendingOrDescending(replaces));
            dispatch(getOrderData({videoGames: filterData,order:replaces,alphabetOrRating:stateOder.alphabetOrRating}));
            dispatch(getPaginationCurrent(paginationData(filterData,15,1)));
            dispatch(getPageCurrent(1));
        }
        dispatch(getStateSelection({state: !stateSelection.state,name:name}));
        setTimeout(() => {
            setTextSelection(replaces);
            
        },200);        
    }

    useEffect(() => {
        dispatch(getOrderData({videoGames: filterData,order:stateOder.order,alphabetOrRating:stateOder.alphabetOrRating}));
    } ,[stateSelection.state])

    return (
        <div className={`select ${stateSelection.state && stateSelection.name === name ? 'clicked ':''} ${version} ${options.length<4 && 'short'} ${options. length<3 && 'small'}`}>
            <div className={`select__optionSelection ${stateSelection.state && stateSelection.name === name ? 'clicked ':''} ${version}`} onClick={handleClick} >
                <h2>{textSelection}</h2>
            </div>
            <div  className={`select__options ${stateSelection.state && stateSelection.name === name ? 'clicked ':''} ${version} ${options.length<4 && 'short'} ${options.length<3 && 'small'}`}>
                {
                    options  && options.map((elemet, index) => {
                        return <div  className="option" onClick={handleChange} key={index} value={elemet}>--{elemet}--</div>
                    }) 
                }
            </div>
        </div>
    )
}

Selection.propTypes = {
    name: PropTypes.string,
    options: PropTypes.array
}

export default Selection;