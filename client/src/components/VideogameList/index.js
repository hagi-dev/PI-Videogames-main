import React,{ useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { useSelector,useDispatch } from 'react-redux';

import VideogameCard from '../VideogameCard/index';
import Pagination from '../Pagination/index';
import { getPaginationCurrent,getPageCurrent } from '../../redux/action/actionPagination';
import { partPaginationDate, paginationData } from '../../helpers/pagination';
import LoaderCard from '../LoaderCard/index';
import './style.scss';


const VideogameList = () => {  
  const numCardLoader= new Array(14).fill(0);
  const filterData = useSelector(state => state.filterAndOrder.filterData);
  const videoGames = useSelector(state => state.rootReducer.videoGames);
  const paginationData2 = useSelector(state => state.pagination.paginationData);
  const dispatch = useDispatch();
  const currentPage = useSelector(state => state.pagination.current);
  const requireCountPage = 15;
  const countButton = partPaginationDate(filterData,requireCountPage);

  const handleClickPagination = (e) => {
    let currentPage = parseInt(e.target.innerHTML);
    getPaginationCurrent(currentPage);
    let dataCurrentPage = paginationData(filterData,requireCountPage,currentPage)
    dispatch(getPaginationCurrent(dataCurrentPage));
    dispatch(getPageCurrent(currentPage));

  }

  useEffect(()=>{
    dispatch(getPaginationCurrent(paginationData(filterData,15,currentPage)));
  },[filterData]);

  return (
    <div className="videogameList">
      {
        paginationData2.length===0 && numCardLoader.map((element,index)=>{
          return <LoaderCard key={index}/>
        })
      }
      {
        videoGames.message&& <p style={{ fontFamily:"mulish,sans serif", margin:"0 auto",marginTop:"20%",color: "darkturquoise" , fontSize:"1.5rem"}}>{videoGames.message}</p>
      }
        {
            paginationData2 && paginationData2.map((element,index) => {
              if(element.message){return <p key={index} style={{color:"white"}} >{element.message}</p>}
              if(!element.message){return <VideogameCard key={element.id} videoGame={element}/>}
            }) 
        }
        {
          paginationData2.length < 15 ? 
            console.log('videoGames cacacacacacacacacacacacaca')
          : <Pagination currentPage={currentPage} countButton={countButton} handleClickPagination={handleClickPagination}/>
        }
        {
          console.log('paginationData2',paginationData2.length)
        }
    </div>
  )
}

VideogameList.propTypes = {
  data: PropTypes.array
}

export default VideogameList