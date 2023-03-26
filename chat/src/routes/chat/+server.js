import { json } from '@sveltejs/kit';

import { Configuration, OpenAIApi } from 'openai';

// Authenticate to OpenAI with key from environment variable OPENAI_API_KEY
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

export const POST = (async ({ request }) => {
    const { messages } = await request.json();

    const chatGPT = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages,
    });

    const chatGPTMessage = chatGPT.data.choices[0].message;
    console.log(chatGPTMessage);

    // For logging usage
    const gptUsage = chatGPT.data.usage;
    console.log(gptUsage);

    return json(chatGPTMessage);
}); // satisfies RequestHandler


// example
/*
export interface ChatMessage {
    role: string;
    content: string;
}

let messages: ChatMessage[] = [
    { role: 'squidward', content: 'You are squidward. Respond appropriately' },
    { role: 'assistant', content: 'ChatGPT response here...},
];

*/