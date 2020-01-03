import React from 'react'
import Button from '../Button';
import PropTypes from 'prop-types';
import { SORTS, Sort } from '../App';

const largeColumn = {
    width: '40%',
  };
  const midColumn = {
    width: '30%',
  };
  const smallColumn = {
    width: '10%',
  };
  


export const Table = ({
  list,
  sortKey,
  isSortReverse,
  onSort,
  onDismiss
  }) => {
  const sortedList = SORTS[sortKey](list);
  const reverseSortedList = isSortReverse
  ? sortedList.reverse()
  : sortedList;
  return(  
  <div className='table'>
    <div className="table-header">
      <span style={ largeColumn }>
      <Sort
        sortKey={'TITLE'}
        onSort={onSort}
        activeSortKey={sortKey}
      >
      Заголовок
      </Sort>
      </span>
      <span style={ midColumn }>
      <Sort
      sortKey={'AUTHOR'}
      onSort={onSort}
      activeSortKey={sortKey}
      >
      Автор
      </Sort>
      </span>
      <span style={ smallColumn }>
        <Sort
          sortKey={'POINTS'}
          onSort={onSort}
          activeSortKey={sortKey}
        >
        Очки
        </Sort>
      </span>
      <span style={{ width: '15%' }}></span>
      </div>
      {reverseSortedList.map(item => 
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
  );
}

Table.propTypes = {
  list: PropTypes.array.isRequired,
  onDismiss: PropTypes.func.isRequired,
};
    
export default Table