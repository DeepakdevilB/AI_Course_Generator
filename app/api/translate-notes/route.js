import { NextResponse } from "next/server";
// Re-use the exact same AI instance you already configured!
import { ai } from "../generate-course-layout/route"; 

export async function POST(req) {
  try {
    const { notes, language } = await req.json();

    const config = {
        responseMimeType: 'text/plain',
    };
    
    const model = 'gemini-2.5-flash'; 

    const prompt = `
      Translate the following educational course notes into ${language}.
      Strictly maintain all original HTML formatting, structural elements, and CSS classes (like Tailwind classes).
      Ensure the tone remains educational and easy to understand.
      
      Notes to translate:
      ${notes}
    `;

    const contents = [
        {
            role: 'user',
            parts: [{ text: prompt }],
        },
    ];

    const response = await ai.models.generateContent({
        model,
        config,
        contents,
    });

    const translatedText = response.candidates[0].content.parts[0].text;

    return NextResponse.json({ translatedText: translatedText });
    
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate translation." }, 
      { status: 500 }
    );
  }
}