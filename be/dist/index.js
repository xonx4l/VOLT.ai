"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const generative_ai_1 = require("@google/generative-ai");
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
const googleGenerativeAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = googleGenerativeAI.getGenerativeModel({ model: "gemini-1.5-flash" });
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const prompt = " generate a todo app in js ";
            const result = yield model.generateContent(prompt);
            console.log(result.response.text());
        }
        catch (error) {
            console.error('Error:', error);
        }
    });
}
main().catch(console.error);
