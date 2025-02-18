import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function queryLLMWithData(data, query) {
  const prompt = `
    Here is the search result data from Google for a domain and country:
    ${JSON.stringify(data)}

    Answer the following question based on the above data:
    ${query}
  `;

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
  });

  return completion.choices[0].message.content;
}

export default queryLLMWithData;
