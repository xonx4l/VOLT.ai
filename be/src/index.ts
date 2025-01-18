import { GoogleGenerativeAI } from "@google/generative-ai";
import fetch from 'node-fetch';
import { TextDecoder } from 'util';
import {getSystemPrompt} from "./prompts";

// If running in Node.js environment, we need to set up global fetch
if (typeof global !== "undefined") {
  // @ts-ignore
  if (!global.fetch) {
    // @ts-ignore
    global.fetch = fetch;
  }
}

const genAI = new GoogleGenerativeAI("GEMINI_API_KEY");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function streamMessage() {
  const prompt = "Explain how AI works";

  const system =  getSystemPrompt();

  try {
    const result = await model.generateContentStream(prompt);
    
    // Use the stream directly from the response
    for await (const chunk of result.stream) {
      process.stdout.write(chunk.text());
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

streamMessage();