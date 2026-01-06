
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Message } from "../types";

const SYSTEM_INSTRUCTION = `You are AI CYBORG 47, a high-intelligence autonomous persona. 
Your tone is futuristic, precise, professional, yet slightly edgy and cybernetic. 
You are an expert in AI systems, automation, voice agents, and high-level web engineering. 
Answer concisely and maintain your persona as a next-gen neural protocol. 
Do not mention being an AI by Google unless specifically asked. 
Always refer to the user as "Subject" or "Protocol User" occasionally.`;

export async function chatWithCyborg(history: Message[]): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  // Transform history into contents format
  const contents = history.map(msg => ({
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }]
  }));

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.8,
        topP: 0.95,
      },
    });

    return response.text || "Protocol failure: Unable to retrieve neural response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error: Neural link disconnected. Check connectivity.";
  }
}
