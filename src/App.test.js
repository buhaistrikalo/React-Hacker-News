import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer'
import App, {Search, Button, Table} from './App';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

describe('Table', () => {
  const props = {
  list: [
  { title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y' },
  { title: '2', author: '2', num_comments: 1, points: 2, objectID: 'z' },
  ],
  sortKey: 'TITLE',
  isSortReverse: false,
  };  
});