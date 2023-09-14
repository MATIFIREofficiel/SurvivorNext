import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import ProfilePage from '../Pages/ProfilePage';

describe('Test de chargement de la page de profil', () => {
    it('devrait afficher les éléments de la page après le chargement', async () => {

        const navigation = {
            navigate: jest.fn(),
            goBack: jest.fn(),
        };

        const apiUser = 'AhSyHQjIpPhIvfI5OU8HHe9nyhPKwY-q';
        const id = 74;
        const { getByText } = render(
            <ProfilePage
                navigation={{ navigation }}
                route={{
                    params: [
                        {
                            access_token: apiUser,
                        },
                        id,
                    ],
                }}
            />
        );

        await waitFor(() => {
            const email = getByText('Email : ');
            expect(email).toBeTruthy();
        });

        await waitFor(() => {
            const birth_date = getByText('Birthdate : ');
            expect(birth_date).toBeTruthy();
        });

        await waitFor(() => {
            const work = getByText('Work : ');
            expect(work).toBeTruthy();
        });

        await waitFor(() => {
            const gender = getByText('Gender : ');
            expect(gender).toBeTruthy();
        });

    });
});