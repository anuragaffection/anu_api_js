import express from "express"
import { config } from "dotenv";
import OpenAI from "openai"

config()
const app = express();
const port = process.env.PORT || 8000;


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});



app.get("/", async (req, res) => {
    res.send({
        message: "i am Anu, Assistant & Nurturing Unit"
    })
})

app.get('/talk_anu', async (req, res) => {
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
    console.log(chatCompletion)
    res.send(chatCompletion.choices[0].message || "failed to response from server");
});

app.listen(port, () => {
    console.log("server is listening on port = ", port)
})