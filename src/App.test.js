import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

// example jest test
// use 'describe' to group together similar tests
describe('Example Addition Test', () => {
  // use 'it' to test a single attribute of a target
  it('knows that 2 and 2 make 4', () => {
    // use 'expect' to make an 'assertion' about a target
    expect(2 + 2).toBe(4);
  });
});
