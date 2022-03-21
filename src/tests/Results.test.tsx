import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Results from '../components/Results';


describe("Should render a table with the returned content from Github API after search with login term", () => {
  test('renders a table list', () => {
    render(<Results />);
  });
})
