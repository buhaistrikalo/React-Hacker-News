import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;
console.log(url);

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

/*const isSearched = searchTerm => item => (
  item.fname.toLowerCase().includes(searchTerm.toLowerCase()) //Функция поиска
)*/

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
  }
  setSearchTopStories(result) {
    this.setState({ result });
  }
  componentDidMount() {
    const { searchTerm } = this.state;
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
    .then(response => response.json())
    .then(result => this.setSearchTopStories(result))
    .catch(error => error);
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
    if (!result) { return null; }
    return (
      <div className="page">
        <h2> { hello }</h2>
        <div className='interactions'>
          <Search 
            value={searchTerm}
            onChange={this.onSearchChange}
          >
            Поиск
          </Search>
        </div>
        <Table 
          list={result.hits}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
      </div>
    );
  }
}

export default App;

const Search = ({ value, onChange, children }) =>
  <form>
    {children}: <input
      type="text"
      value={value}
      onChange={onChange}
    />
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
  

const Table = ({ list, pattern, onDismiss }) =>
  <div className='table'>
    {list.map(item => 
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