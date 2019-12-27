import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const DEFAULT_QUERY = 'kirill';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;

var hello = 'Добро пожаловать, снова';

const User = [
  {
    fname: 'Kirill',
    lname: 'Podyachenko',
    age: 21,
    objectID: 0,
  },
  {
    fname: 'Alexandra',
    lname: 'Masyk',
    age: 19,
    objectID: 1,
  }
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state={
      result: null,
      searchTerm: DEFAULT_QUERY,
    };
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
  }
  fetchSearchTopStories(searchTerm) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
    .then(response => response.json())
    .then(result => this.setSearchTopStories(result))
    .catch(error => error);
  }
    
  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
    event.preventDefault();
  }
    
  setSearchTopStories(result) {
    this.setState({ result });
  }
  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }
    
  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId);
    this.setState({  
      result: { ...this.state.result, hits: updatedHits }
    });
  }
    
  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }
  

  render() {
    const { searchTerm, result } = this.state;
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
        { result &&
          <Table 
            list={result.hits}
            onDismiss={this.onDismiss}
          />
        }
      </div>
    );
  }
}

export default App;

const Search = ({ value, onChange, onSubmit, children }) =>
  <form onSubmit={onSubmit}>
    {children}: <input
      type="text"
      value={value}
      onChange={onChange}
    />
    <button type='submit'>
      {children}
    </button>
  </form>

const largeColumn = {
    width: '40%',
  };
  const midColumn = {
    width: '30%',
  };
  const smallColumn = {
    width: '10%',
  };
  

const Table = ({ list, onDismiss }) =>
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


const Button = ({ onClick, className = '', children }) =>
  <button
    onClick={onClick}
    className = {className}
    type = 'button'
  >
    {children}
  </button>