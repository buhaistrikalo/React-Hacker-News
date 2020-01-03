import React, { Component } from 'react'
import Button from '../Button';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';
import classNames from 'classnames';

const Sort = ({
  sortKey,
  activeSortKey,
  onSort,
  children
  }) => {
    const sortClass = classNames(
      'button-inline',
      { 'button-active': sortKey === activeSortKey }
    );
  return (
    <Button
      onClick={() => onSort(sortKey)}
      className={sortClass}
      >
      {children}
    </Button>
  );
}
  

const SORTS = {
  NONE: list => list,
  TITLE: list => sortBy(list, 'title'),
  AUTHOR: list => sortBy(list, 'author'),
  POINTS: list => sortBy(list, 'points').reverse(),
};

const largeColumn = {
    width: '40%',
  };
  const midColumn = {
    width: '30%',
  };
  const smallColumn = {
    width: '10%',
  };
  


class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortKey: 'NONE',
      isSortReverse: false,
    };
    this.onSort = this.onSort.bind(this);
  }    
  onSort(sortKey) {
    const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
    this.setState({ sortKey, isSortReverse });
  }
  render() {
    const {
      list,
      onDismiss
    } = this.props;
    const {
      sortKey,
      isSortReverse,
    } = this.state;
      

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
          onSort={this.onSort}
          activeSortKey={sortKey}
        >
        Заголовок
        </Sort>
        </span>
        <span style={ midColumn }>
        <Sort
        sortKey={'AUTHOR'}
        onSort={this.onSort}
        activeSortKey={sortKey}
        >
        Автор
        </Sort>
        </span>
        <span style={ smallColumn }>
          <Sort
            sortKey={'POINTS'}
            onSort={this.onSort}
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
}

Table.propTypes = {
  list: PropTypes.array.isRequired,
  onDismiss: PropTypes.func.isRequired,
};
    
export default Table