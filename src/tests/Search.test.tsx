import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from '../components/Search';

describe('Form component with the search input', () => {
  const onSubmit= jest.fn();

  beforeEach(() => {
    onSubmit.mockClear();
  })

  test('test submit the form with value', async () => {
    render(<Search onSubmit={onSubmit} />);
    const loginInput = screen.getByRole('textbox');
    const submitBtn = screen.getByRole('button', {
      name: /submit/i
    });
    
    fireEvent.change(loginInput, {'target': {'value': 'foo'}});
    fireEvent.click(submitBtn);

    expect(onSubmit).toHaveBeenCalled();
  });
})
