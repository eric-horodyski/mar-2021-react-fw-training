import React from 'react';
import { render } from '@testing-library/react';
import TastingNotesPage from './TastingNotesPage';

describe('<TasingNotesPage />', () => {
  it('renders consistently', () => {
    const { asFragment } = render(<TastingNotesPage />);
    expect(asFragment).toMatchSnapshot();
  });
});
