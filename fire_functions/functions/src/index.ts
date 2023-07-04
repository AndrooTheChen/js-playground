// import * as functions from "firebase-functions";

// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
// const admin = require('firebase-admin');
// admin.initializeApp();

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

import {Configuration, OpenAIApi} from "openai";

// Authenticate to OpenAI with key from environment variable OPENAI_API_KEY
const configuration = new Configuration({
    // apiKey: process.env.OPENAI_API_KEY
    apiKey: functions.config().openai.key
});

const openai = new OpenAIApi(configuration);

export const chatgpt = functions.https.onRequest( async (request, response) => {
    const messages = JSON.parse(request.body);
    console.log(`[DEBUG] incoming request ${messages}`);

    // Call OpenAI API to get chat completion
    const chatGPT = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
    });
    const chatGPTMessage = chatGPT.data.choices[0].message;
    console.log(`[DEBUG] response: ${chatGPTMessage}`);
  
    // Send JSON response
    response.json({ message: chatGPTMessage });
});
        