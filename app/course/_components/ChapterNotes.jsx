"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button"; 
import { Loader2Icon, Languages } from "lucide-react";

export default function NotesViewer({ originalNotes }) {
  const [translatedNotes, setTranslatedNotes] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState("Hindi");

  // Add any languages you want your students to have access to
  const availableLanguages = [
    "Hindi", "Spanish", "French", "German", "Chinese", "Arabic", "Russian", "Japanese"
  ];

  async function handleTranslate() {
    if (!originalNotes) return;
    
    setIsTranslating(true);
    setTranslatedNotes(""); // Clear previous translation while loading
    
    try {
      const response = await fetch("/api/translate-notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes: originalNotes, language: targetLanguage }),
      });

      const data = await response.json();
      
      if (data.translatedText) {
        setTranslatedNotes(data.translatedText);
      }
    } catch (error) {
      console.error("Translation failed:", error);
    } finally {
      setIsTranslating(false);
    }
  }

  return (
    <div className="mt-7">
      <div className="flex flex-wrap justify-between items-center mb-6 p-4 bg-primary/5 rounded-xl border border-primary/10">
        <div className="flex items-center gap-2">
            <Languages className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-bold text-primary">Chapter Notes</h2>
        </div>
        
        {/* Multilingual Selector & Action Button */}
        <div className="flex gap-3 items-center mt-4 sm:mt-0">
          <select 
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            disabled={isTranslating}
            className="border-gray-300 rounded-md shadow-sm p-2 text-sm outline-none focus:ring-primary focus:border-primary"
          >
            {availableLanguages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
          
          <Button onClick={handleTranslate} disabled={isTranslating}>
            {isTranslating ? (
                <><Loader2Icon className="w-4 h-4 mr-2 animate-spin" /> Translating...</>
            ) : (
                `Translate`
            )}
          </Button>

          {translatedNotes && (
             <Button variant="outline" onClick={() => setTranslatedNotes("")} disabled={isTranslating}>
                 Show Original
             </Button>
          )}
        </div>
      </div>

      {/* Render the Notes (Translated or Original) */}
      <div 
        dangerouslySetInnerHTML={{ __html: translatedNotes || originalNotes }} 
        className="transition-all duration-300 ease-in-out"
      />
    </div>
  );
}