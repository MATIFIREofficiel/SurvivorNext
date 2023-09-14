import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import TrombinoscopePage from '../Pages/Trombinoscope';

describe('Test text subtitle', () => {
    it('affiche après chargement', async () => {
        const { getByText } = render(<TrombinoscopePage />);

        await waitFor(() => {
            const subtitle = getByText('All members');
            expect(subtitle).toBeTruthy();
        });

    });
});

// describe('Test text placeholder', () => {
//     it('affiche après chargement', async () => {
//         const { getByPlaceholderText } = render(<TrombinoscopePage />);

//         await waitFor(() => {
//             const searchbarplaceholder = getByPlaceholderText('Search by name or username');
//             expect(searchbarplaceholder).toBeTruthy();
//         });

//     });
// });
