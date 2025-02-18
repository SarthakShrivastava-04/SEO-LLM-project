import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const querySERPapi = async (domain, country) => {
    const url = `https://api.dataforseo.com/v3/serp/google/organic?domain=${domain}&country=${country}`;    

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.DATAFORSEO_API_KEY}`,
      },
    });
  
    const data = await response.json();
    return data;
}

export default querySERPapi;