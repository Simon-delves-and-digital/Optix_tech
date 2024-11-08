import { render, screen, } from '@testing-library/react';
import { ReviewField } from './ReviewField';
import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import * as api from '../../../API/api';


const user = userEvent.setup()

describe('ReviewField tests', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })


  it('renders no data text when no movies are supplied', async () => {
    const spy = vi.spyOn(api, 'submitReview').mockReturnValue(Promise.resolve("mock response"));

    render(<ReviewField id={'1'} />);

    const input = screen.getByTestId('inputField').querySelector('input') as HTMLInputElement


    await user.click(input)
    await user.keyboard('test')
    await user.keyboard('{Enter}')

    expect(spy).toHaveBeenCalled()

    expect(screen.getByTestId('returnMessage')).toHaveTextContent('mock response');
  });
});