require("dotenv").config();
import { GoogleGenerativeAI } from "@google/generative-ai";
const fetch = require('node-fetch');
const { Headers, Request, Response } = fetch;

if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not defined in environment variables');
}

// Set all required globals
global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;

const googleGenerativeAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = googleGenerativeAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function main() {
    try {
        const prompt = " generate a todo app in js ";
        const result = await model.generateContent(prompt);
        console.log(result.response.text());
    } catch (error) {
        console.error('Error:', error);
    }
}

main().catch(console.error);
