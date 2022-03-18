import React,{ useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { useSelector,useDispatch } from 'react-redux';

import VideogameCard from '../VideogameCard/index';
import Pagination from '../Pagination/index';
import { getPaginationCurrent,getPageCurrent } from '../../redux/action/actionPagination';
import { partPaginationDate, paginationData } from '../../helpers/pagination';
import './style.scss';


const VideogameList = () => {  
  const filterData = useSelector(state => state.filterAndOrder.filterData);
  const paginationData2 = useSelector(state => state.pagination.paginationData);
  const dispatch = useDispatch();
  const requireCountPage = 15;
  const countButton = partPaginationDate(filterData,requireCountPage);

  const handleClickPagination = (e) => {
    let currentPage = parseInt(e.target.innerHTML);
    let dataCurrentPage = paginationData(filterData,requireCountPage,currentPage)
    dispatch(getPaginationCurrent(dataCurrentPage));
    dispatch(getPageCurrent(currentPage));

  }

  useEffect(()=>{
    console.log('useEffect filterData: ',filterData);
    dispatch(getPaginationCurrent(paginationData(filterData,15,1)));
  },[filterData]);

  return (
    <div className="videogameList">
        {
            paginationData2 && paginationData2.map((element,index) => {
              if(element.message){return <p key={index} style={{color:"white"}} >{element.message}</p>}
              if(!element.message){return <VideogameCard key={element.id} videoGame={element}/>}
            }) 
        }
        <Pagination countButton={countButton} handleClickPagination={handleClickPagination}/>
    </div>
  )
}

VideogameList.propTypes = {
  data: PropTypes.array
}

export default VideogameList