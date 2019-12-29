import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer'
import App, {Search, Button, Table} from './App';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

describe('Search', () => {

  it('отрисовывает без ошибки', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Search>Поиск</Search>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
    test('есть корректный снимок', () => {
    const component = renderer.create(
      <Search>Поиск</Search>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
    
});