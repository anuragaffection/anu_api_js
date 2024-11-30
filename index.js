import express from "express"
import OpenAI from "openai"
import cors from "cors";
import { config } from "dotenv";

config()
const app = express();
const port = process.env.PORT || 8000;

const FRONTEND_URL = process.env.FRONTEND_URL
const OPENAI_API_KEY = process.env.OPENAI_API_KEY


if (FRONTEND_URL === "" || OPENAI_API_KEY === "") {
    console.log("env not found")
    
}

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
});


let corsOptions = {
    origin: [`${FRONTEND_URL}`],
    methods: ["GET", "POST", "PUT", "DELETE"],
}

app.use(cors(corsOptions))

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
            max_tokens: 500,
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