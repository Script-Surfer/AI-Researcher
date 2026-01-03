import { generateText, Output } from "ai";
import { google } from "@ai-sdk/google";

export async function POST(request: Request){
    const { topic } = await request.json()

    if(!topic){
        return Response.json({
            error: "Topic is empty."
        }, {status: 400})
    }

    const prompt = `You are a research asistant. Given topic is ${topic}. Provide the response in Markdown format:
    1. A concise overview of the topic.
    2. 5 key subtopics (bullet points).
    3. Important keywords.
    4. 5 research questions.`

    try {
        const result = await generateText({
            model: google("gemini-2.5-pro"),
            prompt
        })
    
        return Response.json({
            output: result.text
        })
    } catch (error) {
        return Response.json({ error: "failed to generate research"},{status: 500})
    }
}