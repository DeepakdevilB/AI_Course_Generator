// File: app/api/generate-quiz/route.js

import { NextResponse } from "next/server";
// We can reuse the 'ai' instance you already configured
import { ai } from "../generate-course-layout/route"; 

const PROMPT = `
Based on the provided chapter notes, generate a short multiple-choice quiz with 10 questions to test the user's understanding.
Return the response ONLY in a valid JSON format.

The JSON schema should be an array of objects, where each object represents a question:
[
  {
    "question": "Your question text here?",
    "options": [
      "Option A",
      "Option B",
      "Option C",
      "Option D"
    ],
    "answer": "The correct option text here"
  }
]

Do not include any other text or markdown formatting like \`\`\`json. Only the raw JSON array.

USER INPUT (Chapter Notes):
`

export async function POST(req) {
    const { notes } = await req.json();

    try {
        const response = await ai.chat.completions.create({
            model: process.env.AZURE_OPENAI_DEPLOYMENT || 'gpt-4o-mini',
            messages: [
                {
                    role: 'user',
                    content: PROMPT + notes
                }
            ]
        });

        const rawResp = response.choices[0].message.content;
        
        // Clean up markdown in case the model returns it
        const cleanedJson = rawResp.replace(/```json/g, '').replace(/```/g, '').trim();
        const quizJson = JSON.parse(cleanedJson);
        
        return NextResponse.json(quizJson);

    } catch (error) {
        console.error("ERROR generating quiz:", error);
        return NextResponse.json({ error: "Failed to generate quiz." }, { status: 500 });
    }
}