import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const querySERPapi = async (domain, country) => {
    const url = `https://api.dataforseo.com/v3/serp/google/organic?domain=${domain}&country=${country}`;    

    const login = process.env.SERP_API_LOGIN;
    const password = process.env.SERP_API_PASSWORD;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': 'Basic ' + btoa(`${login}:${password}`)
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

export default querySERPapi;