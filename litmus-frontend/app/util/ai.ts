import Groq from 'groq-sdk'
// import { StructuredOutputParser } from 'langchain/output_parsers'
// import z from 'zod'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function queryGroq(query: string) {
    const chatCompletion = await getGroqChatCompletion(query);
    console.log(chatCompletion.choices[0]?.message?.content || "Error, no Groq response"); //
    return chatCompletion.choices[0]?.message?.content || "Error: missing, or JSON structure changed";
}

export async function getGroqChatCompletion(query: string) {
    return groq.chat.completions.create({
        messages: [
            {
                role: 'user',
                content: query
            },
        ],
        model: 'llama3-70b-8192'
    });
}