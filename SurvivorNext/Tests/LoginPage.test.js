import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import LoginPage from '../Pages/LoginPage';

describe('Test de chargement de la page de login', () => {
  it('affiche après chargement', async () => {
    const { getByText, getByPlaceholderText } = render(<LoginPage />);

    await waitFor(() => {
      const loginHeader = getByText('Login');
      expect(loginHeader).toBeTruthy();
    });

    await waitFor(() => {
      const emailInput = getByPlaceholderText('Email.');
      expect(emailInput).toBeTruthy();
    });

    await waitFor(() => {
      const passwordInput = getByPlaceholderText('Password.');
      expect(passwordInput).toBeTruthy();
    });

    await waitFor(() => {
      const forgotPasswordLink = getByText('Forgot password?');
      expect(forgotPasswordLink).toBeTruthy();
    });

    await waitFor(() => {
      const loginButton = getByText('LOGIN');
      expect(loginButton).toBeTruthy();
    });
  });
});
