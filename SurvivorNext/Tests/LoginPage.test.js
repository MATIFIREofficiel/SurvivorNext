import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import LoginPage from '../Pages/LoginPage';

describe('Test text login title', () => {
  it('affiche après chargement', async () => {
    const { getByText } = render(<LoginPage />);

    await waitFor(() => {
      const loginHeader = getByText('Login');
      expect(loginHeader).toBeTruthy();
    });

  });
});


describe('Test placeholder email', () => {
    it('affiche après chargement', async () => {
      const { getByPlaceholderText } = render(<LoginPage />);

      await waitFor(() => {
        const emailInput = getByPlaceholderText('Email');
        expect(emailInput).toBeTruthy();
      });

    });
  });


  describe('Test placeholder password', () => {
    it('affiche après chargement', async () => {
      const { getByPlaceholderText } = render(<LoginPage />);

      await waitFor(() => {
        const passwordInput = getByPlaceholderText('Password');
        expect(passwordInput).toBeTruthy();
      });

    });
  });


  describe('Test text forget password?', () => {
    it('affiche après chargement', async () => {
      const { getByText } = render(<LoginPage />);

      await waitFor(() => {
        const forgotPasswordLink = getByText('Forgot password?');
        expect(forgotPasswordLink).toBeTruthy();
      });

    });
  });


  describe('Test text button login', () => {
    it('affiche après chargement', async () => {
      const { getByText } = render(<LoginPage />);

      await waitFor(() => {
        const loginButton = getByText('LOGIN');
        expect(loginButton).toBeTruthy();
      });
    });
  });