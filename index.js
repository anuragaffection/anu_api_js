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
    try {
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful assistant. Your name is ANU, which stands for Assistant & Nurturing Unit." },
                { role: "user", content: req.query.question || "Who are you " },
            ],
            max_tokens: 300,
        });

        console.log(chatCompletion);
        const responseMessage = chatCompletion.choices?.[0]?.message?.content || "No response from server.";
        res.json({ success: true, response: responseMessage });
    } catch (error) {
        console.error("Error communicating with OpenAI:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(port, () => {
    console.log("server is listening on port = ", port)
})