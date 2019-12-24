import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

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

const isSearched = searchTerm => item => (
  item.fname.toLowerCase().includes(searchTerm.toLowerCase()) //Функция поиска
)

class App extends Component {
  constructor(props) {
    super(props);

    this.state={
      User,
      searchTerm: '',
    };

    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }
  onDismiss(id) {
    const isNotId = item => item.objectID !== id;
    const updateUser = this.state.User.filter(isNotId);    
    this.setState({ User: updateUser });
  };
  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  

  render() {
    const { searchTerm, User } = this.state;
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
          User={User}
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
  

const Table = ({ User, pattern, onDismiss }) =>
  <div className='table'>
    {User.filter(isSearched(pattern)).map(item => 
      <div key={item.objectID} className="table-row">
        <span style={ midColumn }>{item.fname} </span>
        <span style={ midColumn }>{item.lname} </span>
        <span style={ smallColumn }>{item.age}</span>
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