import OpenAI from "openai";
import { config } from "dotenv";

config()
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


async function main() {
    const chatCompletion = await openai.chat.completions.create({
        // model: "gpt-4o-mini",
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "You are a helpful assistant. Your name is ANU, which stands for Assitant & Nurturing Unit" },
            {
                role: "user",
                content: "What is Prime Number.",
            },
        ],
        max_tokens: 300,
    });
    console.log(chatCompletion.choices[0].message)
}





main();