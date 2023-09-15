import axios from 'axios';
import React from 'react';

export default async function isAdmin(apiUser) {
    try {
        const url = process.env.REACT_APP_API_URL + '/me';
        const headers = {
            'accept': 'application/json',
            'X-Group-Authorization': process.env.REACT_APP_API_KEY,
            'Authorization': 'Bearer ' + apiUser.access_token
        };

    const response = await axios.get(url, { headers });
        if (response.data.work === 'Administrative Intern') {
            return true;
        } else {
            console.log(response.data.work);
            return false;
        }
    } catch (error) {
        console.log(error);
        return (false);
    }
}