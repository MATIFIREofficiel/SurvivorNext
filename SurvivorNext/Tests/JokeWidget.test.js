import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import JokeApp from '../Components/JokeWidget';
import { useAppContext } from '../AppContext';

jest.mock('../AppContext', () => ({
  useAppContext: () => ({
    appColor: 'blue',
  }),
}));

describe('JokeApp Tests', () => {
  it('affiche le texte du bouton', () => {
    const { getByText } = render(<JokeApp />);
    const buttonText = getByText('New joke');
    expect(buttonText).toBeTruthy();
  });

  it('affiche le texte du fait', async () => {
    const { getByText, getByTestId } = render(<JokeApp />);
    const fetchJokeButton = getByText('New joke');
    fireEvent.press(fetchJokeButton);

    await waitFor(() => {
      const jokeText = getByTestId('joke-text');
      expect(jokeText).toBeTruthy();
    });
  });

  it('ferme la modal', async () => {
    const { getByText, getByTestId, queryByTestId } = render(<JokeApp />);
    const fetchJokeButton = getByText('New joke');
    fireEvent.press(fetchJokeButton);

    await waitFor(() => {
      const jokeText = getByTestId('joke-text');
      expect(jokeText).toBeTruthy();
    });

    const closeButton = getByText('Close');
    fireEvent.press(closeButton);

    await waitFor(() => {
      const modal = queryByTestId('modal');
      expect(modal).toBeNull();
    });
  });
});
