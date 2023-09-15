import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import LoginPage from '../Pages/LoginPage';

describe('Test LOGIN text appearition 2', () => {
  it('Wait loading of elements in page', async () => {
    const { getAllByText } = render(<LoginPage />);
    const loginButtonTextElements = getAllByText('LOGIN');

    expect(loginButtonTextElements).toHaveLength(2);
  });
});



describe('Test placeholder email', () => {
  it('Wait loading of elements in page', async () => {
    const { getByPlaceholderText } = render(<LoginPage />);

    await waitFor(() => {
      const emailInput = getByPlaceholderText('Email');
      expect(emailInput).toBeTruthy();
    });

  });
});


describe('Test placeholder password', () => {
  it('Wait loading of elements in page', async () => {
    const { getByPlaceholderText } = render(<LoginPage />);

    await waitFor(() => {
      const passwordInput = getByPlaceholderText('Password');
      expect(passwordInput).toBeTruthy();
    });

  });
});

jest.mock('../AppContext', () => ({
  useAppContext: () => ({
    appColor: 'blue',
    setAppColor: jest.fn(),
  }),
}));

describe('Test to display error message', () => {
  it('push the login button', async () => {
    const { getByText, getByTestId, queryByText } = render(<LoginPage isError={true} />);

    const errorMessage = queryByText('Incorrect username or password');
    expect(errorMessage).toBeNull();

    const loginButton = getByTestId('login-button');
    fireEvent.press(loginButton);

    await waitFor(() => {
      const errorMessage = getByText('Incorrect username or password');
      expect(errorMessage).toBeTruthy();
    });
  });
});

describe('FactApp Tests', () => {
  it('check if error is not print instantly', async () => {
    const { queryByText } = render(<LoginPage isError={false} />);

    await waitFor(() => {
      const errorMessage = queryByText('Incorrect username or password');
      expect(errorMessage).toBeNull();
    });
  });
});