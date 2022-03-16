import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';

import {getFilterCreatedOrExisted,getStateSelection} from '../../redux/action/actionFilterAndOrder';
import './style.scss';

const Selection = props => {
    const dispatch = useDispatch();
    const {options,version,functionActiva,name} = props;
    const stateSelection = useSelector(state => state.filter.stateSelection);
    const [textSelection,setTextSelection] = useState('');

    const handleClick = (e) => {
        dispatch(getStateSelection({state:!stateSelection.state ,name:name}));
    }
    const handleChange = (e) => {
        let replaces = e.target.innerText.trim().replace(/\-/g, '');
        name === 'Genre' && functionActiva((etem)=>{
            return {...etem,state1:true}
        });
        name === 'Created Or Existed' && functionActiva((etem)=>{
            return {...etem,state2:true}
        });;
        name === 'Alphabet or Existed' && functionActiva((etem)=>{
            return {...etem,state3:true}
        });
        name === 'Asc or Desc' && functionActiva((etem)=>{
            return {...etem,state4:true}
        }); 
        dispatch(getStateSelection({state: !stateSelection.state,name:name}));
        setTimeout(() => {
            setTextSelection(replaces);
            
        },200);
    }

    useEffect(() => {
        dispatch(getFilterCreatedOrExisted(textSelection));
    },[])

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

export default Selection