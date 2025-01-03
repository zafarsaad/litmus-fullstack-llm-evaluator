import Groq from 'groq-sdk'
// import { StructuredOutputParser } from 'langchain/output_parsers'
// import z from 'zod'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function queryGroqAlpha(query: string) {
    const chatCompletion = await getGroqChatCompletionAlpha(query);
    console.log(chatCompletion.choices[0]?.message?.content || "Error, no Groq response"); //
    return chatCompletion.choices[0]?.message?.content || "Error: missing, or JSON structure changed";
}

export async function getGroqChatCompletionAlpha(query: string) {
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

export async function queryGroqBeta(query: string) {
    const chatCompletion = await getGroqChatCompletionBeta(query);
    console.log(chatCompletion.choices[0]?.message?.content || "Error, no Groq response"); //
    return chatCompletion.choices[0]?.message?.content || "Error: missing, or JSON structure changed";
}

export async function getGroqChatCompletionBeta(query: string) {
    return groq.chat.completions.create({
        messages: [
            {
                role: 'user',
                content: query
            },
        ],
        model: "mixtral-8x7b-32768"
    });
}

export async function queryGroqGamma(query: string) {
    const chatCompletion = await getGroqChatCompletionGamma(query);
    console.log(chatCompletion.choices[0]?.message?.content || "Error, no Groq response"); //
    return chatCompletion.choices[0]?.message?.content || "Error: missing, or JSON structure changed";
}

export async function getGroqChatCompletionGamma(query: string) {
    return groq.chat.completions.create({
        messages: [
            {
                role: 'user',
                content: query
            },
        ],
        model: 'llama3-8b-8192'
    });
}