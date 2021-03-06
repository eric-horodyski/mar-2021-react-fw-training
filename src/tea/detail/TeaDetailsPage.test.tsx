import React from 'react';
import { render, wait } from '@testing-library/react';
import TeaDetailsPage from './TeaDetailsPage';

jest.mock('react-router', () => ({
  useParams: () => ({
    id: 1,
  }),
}));

jest.mock('../useTea', () => ({
  useTea: () => ({
    getTeas: jest.fn(),
    getTeaById: jest.fn(() => Promise.resolve(mockTea)),
  }),
}));

const mockTea = {
  id: 1,
  name: 'Green',
  image: require('../../assets/images/green.jpg').default,
  description: 'My green tea description',
};

describe('<TeaDetailsPage />', () => {
  it('displays the header', async () => {
    const { container } = render(<TeaDetailsPage />);
    await wait(() => expect(container).toHaveTextContent(/Details/));
  });

  it('renders consistently', async () => {
    const { asFragment } = render(<TeaDetailsPage />);
    await wait(() => expect(asFragment()).toMatchSnapshot());
  });

  it('renders the tea name', async () => {
    const { container } = render(<TeaDetailsPage />);
    await wait(() => expect(container).toHaveTextContent(mockTea.name));
  });

  it('renders the tea description', async () => {
    const { container } = render(<TeaDetailsPage />);
    await wait(() => expect(container).toHaveTextContent(mockTea.description));
  });
});
