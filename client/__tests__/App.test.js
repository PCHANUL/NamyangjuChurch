import { TestScheduler } from 'jest';
import { iteratee } from 'lodash';
import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom'
import {cleanup, fireEvent, render} from '@testing-library/react';
import App from '../src/App';

test('test comment', () => {
  const component = renderer.create(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  let tree = component.toJSON();

  console.log(tree)


})

afterEach(cleanup);

it('DOM testing', () => {
  const {a, b} = render(
    <MemoryRouter>
      <App />,
    </MemoryRouter>
  );

  console.log(a)
  console.log(b)

})