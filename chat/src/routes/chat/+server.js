import { json } from '@sveltejs/kit';

// import { Configuration, OpenAIApi } from 'openai';
import { getFunctions, httpsCallable } from "firebase/functions";

/////////////////////// move to cloud function ///////////////////////
// Authenticate to OpenAI with key from environment variable OPENAI_API_KEY
// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY
// });

// const openai = new OpenAIApi(configuration);

// export const POST = (async ({ request }) => {
//     const { messages } = await request.json();

//     const chatGPT = await openai.createChatCompletion({
//         model: 'gpt-3.5-turbo',
//         messages,
//     });

//     const chatGPTMessage = chatGPT.data.choices[0].message;
//     console.log(chatGPTMessage);

//     // For logging usage
//     // const gptUsage = chatGPT.data.usage;
//     // console.log(gptUsage);

//     return json(chatGPTMessage);
// }); // satisfies RequestHandler
/////////////////////// move to cloud function ///////////////////////

const CLOUD_FUNCTION = 'http://localhost:5000/asami-e231b/us-central1/chatgpt';

export const POST = ( async ({ request }) => {
    const functions = getFunctions();
    const chatGPT = httpsCallable(functions, 'chatgpt');
    const { messages } = await request.json();
    const response = await chatGPT(messages);
    console.log(response);
    return json(response.data);
    
    // const { messages } = await request.json();

    // fetch(CLOUD_FUNCTION, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: messages
    // }).then(response => {
    //     console.log(response);
    //     return response.json();
    // }).catch(error => {
    //     console.log(`Error occured: ${error}`);
    //     // just return the original message back to user.
    //     return request.json();
    // });
});


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