import { PROMPT } from '@/constants/prompt';
import OpenAI from 'openai';

export async function POST(request) {
    try {
        const { question } = await request.json();

        if (!question) {
            return new Response(JSON.stringify({ error: 'Query is required' }), { status: 400 });
        }

        const client = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const result = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { "role": "system", "content": PROMPT },
                { "role": "user", "content": `Answer to the following query: "${question}"` }
            ]
        })

        return new Response(
            JSON.stringify({ response: result?.choices?.[0]?.message?.content?.trim() }),
            { status: 200 }
        );
    } catch (error) {
        return new Response(JSON.stringify({
            error: "Something is going wrong, Please try again."
        }), { status: 500 });
    }
}
