import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import FactApp from '../Components/FactWidget';
import { useAppContext } from '../AppContext';

jest.mock('../AppContext', () => ({
  useAppContext: () => ({
    appColor: 'blue',
  }),
}));

describe('FactApp Tests', () => {
  it('affiche le texte du bouton', () => {
    const { getByText } = render(<FactApp />);
    const buttonText = getByText('New fact');
    expect(buttonText).toBeTruthy();
  });

  it('affiche le texte du fait', async () => {
    const { getByText, getByTestId } = render(<FactApp />);
    const fetchFactButton = getByText('New fact');
    fireEvent.press(fetchFactButton);

    await waitFor(() => {
      const factText = getByTestId('fact-text');
      expect(factText).toBeTruthy();
    });
  });

  it('ferme la modal', async () => {
    const { getByText, getByTestId, queryByTestId } = render(<FactApp />);
    const fetchFactButton = getByText('New fact');
    fireEvent.press(fetchFactButton);

    await waitFor(() => {
      const factText = getByTestId('fact-text');
      expect(factText).toBeTruthy();
    });

    const closeButton = getByText('Close');
    fireEvent.press(closeButton);

    await waitFor(() => {
      const modal = queryByTestId('modal');
      expect(modal).toBeNull();
    });
  });
});
