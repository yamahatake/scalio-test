import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Results from '../components/Results';

describe('Should render a table with the returned content from Github API after search with login term', () => {
  it('renders a table list', async () => {
    render(<Results searchTerm="foo" />)
    await waitFor(() => expect(screen.getAllByRole('row').length).toBe(10))
  });
})
