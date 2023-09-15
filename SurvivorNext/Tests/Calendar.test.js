import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CalendarPage from '../Pages/CalendarPage';
import { useAppContext } from '../AppContext';

jest.mock('../AppContext', () => ({
  useAppContext: () => ({
    appColor: 'blue',
  }),
}));

describe('CalendarPage Tests', () => {
  it('affiche le calendrier', () => {
    const { getByTestId } = render(<CalendarPage />);
    const calendar = getByTestId('calendar');
    expect(calendar).toBeTruthy();
  });
});
