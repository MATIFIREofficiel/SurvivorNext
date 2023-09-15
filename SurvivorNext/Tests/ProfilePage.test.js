import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import ProfilePage from '../Pages/ProfilePage';

describe('Test ProfilePage', () => {
    it('affiche les informations de l\'utilisateur', async () => {
        const access_token = 'your_valid_access_token';

        const { getByText } = render(
            <ProfilePage
                route={{ params: [{ access_token }] }}
            />
        );

        await waitFor(() => {
            const nameElement = getByText(`Name : `);

            expect(nameElement).toBeTruthy();
        });
    });
});

describe('Test ProfilePage', () => {
    it('affiche les informations de l\'utilisateur', async () => {
        const access_token = 'your_valid_access_token';

        const { getByText } = render(
            <ProfilePage
                route={{ params: [{ access_token }] }}
            />
        );

        await waitFor(() => {
            const surnameElement = getByText(`Surname : `);

            expect(surnameElement).toBeTruthy();
        });
    });
});


describe('Test ProfilePage', () => {
    it('affiche les informations de l\'utilisateur', async () => {
        const access_token = 'your_valid_access_token';

        const { getByText } = render(
            <ProfilePage
                route={{ params: [{ access_token }] }}
            />
        );

        await waitFor(() => {
            const birthdateElement = getByText(`Birthdate : `);

            expect(birthdateElement).toBeTruthy();
        });
    });
});


describe('Test ProfilePage', () => {
    it('affiche les informations de l\'utilisateur', async () => {
        const access_token = 'your_valid_access_token';

        const { getByText } = render(
            <ProfilePage
                route={{ params: [{ access_token }] }}
            />
        );

        await waitFor(() => {
            const emailElement = getByText(`Email : `);

            expect(emailElement).toBeTruthy();
        });
    });
});


describe('Test ProfilePage', () => {
    it('affiche les informations de l\'utilisateur', async () => {
        const access_token = 'your_valid_access_token';

        const { getByText } = render(
            <ProfilePage
                route={{ params: [{ access_token }] }}
            />
        );

        await waitFor(() => {
            const workElement = getByText(`Work : `);

            expect(workElement).toBeTruthy();
        });
    });
});


describe('Test ProfilePage', () => {
    it('affiche les informations de l\'utilisateur', async () => {
        const access_token = 'your_valid_access_token';

        const { getByText } = render(
            <ProfilePage
                route={{ params: [{ access_token }] }}
            />
        );

        await waitFor(() => {
            const genderElement = getByText(`Gender : `);

            expect(genderElement).toBeTruthy();
        });
    });
});
