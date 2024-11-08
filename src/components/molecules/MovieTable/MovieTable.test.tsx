import { render, screen, } from '@testing-library/react';
import { Movie } from '../../../types/types';
import { MovieTable } from './MovieTable';

describe('MovieTable tests', () => {
  const mockData = [
    {
      averageReview: '3.0',
      company: "Test Company",
      id: '1',
      title: "A test movie",
    },
    {
      averageReview: '3.0',
      company: "Test Company",
      id: '1',
      title: "A test movie",
    },
    {
      averageReview: '3.0',
      company: "Test Company",
      id: '1',
      title: "A test movie",
    }
  ] as Movie[];

  it('renders no data text when no movies are supplied', async () => {
    const mockData = [] as Movie[]

    render(<MovieTable movies={mockData} />);

    expect(screen.getByTestId('noDataText')).toHaveTextContent('No data to display');
  });


  it('renders correct elements when movies are supplied', async () => {


    render(<MovieTable movies={mockData} />);

    expect(screen.getByTestId('movieTable')).toBeDefined();
    expect(screen.getByTestId('movieTablePagination')).toBeDefined();
  });


  it('renders correct number of rows when movies are supplied', async () => {
    render(<MovieTable movies={mockData} />);

    expect(screen.getAllByTestId('MovieTableRow').length).toEqual(3)
  });
});