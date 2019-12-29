import React from 'react'
import Button from '../Button';
import PropTypes from 'prop-types';


const largeColumn = {
    width: '40%',
  };
  const midColumn = {
    width: '30%',
  };
  const smallColumn = {
    width: '10%',
  };
  

export const Table = ({ list, onDismiss }) =>
  <div className='table'>
    {list.filter(item => item.title > ' ').map(item => 
      
      <div key={item.objectID} className="table-row">
        <span style={ largeColumn }>{item.title} </span>
        <span style={ midColumn }>{item.author} </span>
        <span style={ smallColumn }>{item.points}</span>
        <span> 
          <Button onClick={() => onDismiss(item.objectID)} className="button-inline">
            Удалить
          </Button>
        </span>
      </div>
    )}
  </div>

Table.propTypes = {
  list: PropTypes.array.isRequired,
  onDismiss: PropTypes.func.isRequired,
};
  
  
export default Table