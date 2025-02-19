import readline from 'readline';
import querySERPapi from './querySERPapi.js';
import queryLLMaapi from './queryLLMapi.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
  }

async function main(){
 const searchKeyword = await askQuestion('Enter the searchKeyword: ');
 const country = await askQuestion('Enter the country code (e.g., US, IN): ');
 const userQuery = await askQuestion('Enter your query: ');

  try {
    const serpData = await querySERPapi(searchKeyword, country);
    const res = await queryLLMaapi(serpData, userQuery);
    
    console.log('Answer:', res);
  } catch (error) {
    console.error(error);
  }
}

main();
