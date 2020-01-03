import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import Search from './Search';
import Table from './Table';
import {sortBy} from 'lodash';
import Button from './Button';
import classNames from 'classnames';


import {
  DEFAULT_QUERY,
  DEFAULT_HPP,
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE,
  PARAM_HPP,
} from './constants'

var hello = 'Добро пожаловать, снова';

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
export { SORTS, Sort };
//const withFoo = (Component) => (props) => <Component {...props}/>
const withLoading = (Component) => ({ isLoading, ...rest }) => 
  isLoading
    ? <Loading />
    : <Component { ...rest } />
  
const ButtonWithLoading = withLoading(Button);

const Loading = () => 
  <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>

class App extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);

    this.state={
      result: null,
      searchKey: '', //Сохранение результата
      searchTerm: DEFAULT_QUERY,
      error: null,
      isLoading: false,
      sortKey: 'NONE',
      isSortReverse: false,

    };
    this.needsToSearchTopStories = this.needsToSearchTopStories.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
    this.onSort = this.onSort.bind(this);
  }

  onSort(sortKey) {
    const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse;
    this.setState({ sortKey, isSortReverse });
  }

  needsToSearchTopStories(searchTerm) {
    return !this.state.results[searchTerm];
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    this.setState({ isLoading: true });
    axios(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(result => this._isMounted && this.setSearchTopStories(result.data))
      .catch(error => this._isMounted && this.setState({ error }));
  }
    
  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }
    event.preventDefault();
  }
    
  setSearchTopStories(result) {
    const { hits, page } = result;
    const { searchKey, results } = this.state;

    const oldHits = results && results[searchKey]
    ? results[searchKey].hits
    : [];
    
    const updatedHits = [
      ...oldHits,
      ...hits
    ];
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
        },
        isLoading: false,
    });
  }
  componentDidMount() {
    this._isMounted = true;
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }    
    
  onDismiss(id) {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);
    this.setState({
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page }
      }
    });
  }
    
  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }
  

  render() {
    const {
      searchTerm,
      results,
      searchKey,
      error,
      isLoading,
      sortKey,
      isSortReverse,
    } = this.state;
    if (error) {
      return <h1>Что-то не то. Секундочку...</h1>
    }
    const page = (
      results &&
      results[searchKey] &&
      results[searchKey].page
    ) || 0;

    const list = (
      results &&
      results[searchKey] &&
      results[searchKey].hits
    ) || [];

    return (
      <div className="page">
        <h2> { hello }</h2>
        <div className='interactions'>
          <Search 
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            Поиск
          </Search>
        </div>
          <Table 
            list={list}
            sortKey = {sortKey}
            onSort = {this.onSort}
            isSortReverse={isSortReverse}
            onDismiss={this.onDismiss}
          />
        <div className='interactions'>
          <ButtonWithLoading
            isLoading={isLoading}
            onClick= {() => this.fetchSearchTopStories(searchKey, page + 1)}
          >
          Показать больше историй
          </ButtonWithLoading>
        </div>
      </div>
    );
  }
}

export default App;

export { Button, Search, Table };