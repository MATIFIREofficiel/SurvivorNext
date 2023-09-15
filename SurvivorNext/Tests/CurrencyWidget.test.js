import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import CurrencyConverter from '../Components/DeviseConvertWidget';

jest.mock('../AppContext', () => ({
    useAppContext: () => ({
      appColor: 'blue',
      setAppColor: jest.fn(),
    }),
  }));

describe('CurrencyConverter Tests', () => {
  it('Wait loading of elements in page', async () => {
    const { getAllByText, getByPlaceholderText, getByText, getByTestId } = render(
      <CurrencyConverter />
    );

    const titleElements = getAllByText('Currency converter');
    expect(titleElements).toHaveLength(1);

    const priceInput = getByPlaceholderText('Price');
    expect(priceInput).toBeTruthy();

    const fromCurrencyButton = getByTestId('fromCurrencyButton');
    expect(fromCurrencyButton).toBeTruthy();

    const toCurrencyButton = getByTestId('toCurrencyButton');
    expect(toCurrencyButton).toBeTruthy();

    const euroOption = getByText('EUR');
    expect(euroOption).toBeTruthy();

  });

  it('peut saisir une valeur', async () => {
    const { getByPlaceholderText } = render(<CurrencyConverter />);
    const inputElement = getByPlaceholderText('Price');
    fireEvent.changeText(inputElement, '100');
    expect(inputElement.props.value).toBe('100');
  });

  it('peut sélectionner la devise de départ', async () => {
    const { getByText, getByTestId } = render(<CurrencyConverter />);
    const fromCurrencyButton = getByTestId('fromCurrencyButton');
    fireEvent.press(fromCurrencyButton);
    const euroOption = getByText('EUR');
    expect(euroOption).toBeTruthy();
  });
});
