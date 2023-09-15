import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AdminPanel from '../Pages/AdminPanel';
import { useAppContext } from '../AppContext';

jest.mock('../AppContext', () => ({
    useAppContext: () => ({
        appColor: 'blue',
        setAppColor: jest.fn(),
        companyName: 'Test Company',
        setCompanyName: jest.fn(),
    }),
}));

describe('AdminPanel Tests display company name', () => {
    it('affiche le bouton "Company name"', () => {
        const { getByText } = render(<AdminPanel />);
        const companyNameButton = getByText('Company name');
        expect(companyNameButton).toBeTruthy();
    });
});

describe('AdminPanel Tests display company name modal', () => {
    it('affiche la modal pour "Company name"', async () => {
        const { getByText, getByPlaceholderText } = render(<AdminPanel />);
        const companyNameButton = getByText('Company name');
        fireEvent.press(companyNameButton);

        await waitFor(() => {
            const modalInput = getByPlaceholderText('Undefined');
            expect(modalInput).toBeTruthy();
        });
    });
});
