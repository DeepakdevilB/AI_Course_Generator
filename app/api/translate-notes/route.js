import { NextResponse } from "next/server";
// Re-use the exact same AI instance you already configured!
import { ai } from "../generate-course-layout/route"; 

export async function POST(req) {
  try {
    const { notes, language } = await req.json();

    const prompt = `
      Translate the following educational course notes into ${language}.
      Strictly maintain all original HTML formatting, structural elements, and CSS classes (like Tailwind classes).
      Ensure the tone remains educational and easy to understand.
      
      Notes to translate:
      ${notes}
    `;

    const response = await ai.chat.completions.create({
        model: process.env.AZURE_OPENAI_DEPLOYMENT || 'gpt-4o-mini',
        messages: [
            {
                role: 'user',
                content: prompt
            }
        ]
    });

    const translatedText = response.choices[0].message.content;

    return NextResponse.json({ translatedText: translatedText });
    
  } catch (error) {
    console.error("Azure OpenAI API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate translation." }, 
      { status: 500 }
    );
  }
}