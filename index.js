import readline from 'readline';
import dataForSeoLabsApi from './dataForSeoLabsApi.js';
import queryLLMaapi from './queryLLMapi.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
  }

async function main(){
 const domain = await askQuestion('Enter the domain: ');
 const country = await askQuestion('Enter the country code: ');
 const userQuery = await askQuestion('Enter your query: ');

  try {
    const serpData = await dataForSeoLabsApi(domain, country);
    const res = await queryLLMaapi(serpData, userQuery);
    
    console.log('Answer:', res);
  } catch (error) {
    console.error(error);
  }
}

main();
