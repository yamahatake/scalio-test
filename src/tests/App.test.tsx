import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

it("renders App without crashing", () => {
  render(<App />)
  const title = screen.getByText('Search on github by login')

  expect(title).toBeInTheDocument();
});