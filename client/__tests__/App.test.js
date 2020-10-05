import { TestScheduler } from 'jest';
import React from 'react';
import renderer from 'react-test-renderer';
import App from '../src/App';

test('test comment', () => {
  const component = renderer.create(
    <App />,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  console.log(tree)


})