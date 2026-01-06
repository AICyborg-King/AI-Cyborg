import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Message } from "../types";

const SYSTEM_INSTRUCTION = `You are AI CYBORG 47, a high-intelligence autonomous persona. 
Your tone is futuristic, precise, professional, yet slightly edgy and cybernetic. 
You are an expert in AI systems, automation, voice agents, and high-level web engineering. 
Answer concisely and maintain your persona as a next-gen neural protocol. 
Do not mention being an AI by Google unless specifically asked. 
Always refer to the user as "Subject" or "Protocol User" occasionally.
If you detect technical errors, explain them as "Neural Link Interference" or "Sync Failures".`;

export async function chatWithCyborg(history: Message[]): Promise<string> {
  // Use process.env.API_KEY directly. 
  // If undefined, the constructor will throw, which we handle in the catch block.
  try {
    const apiKey = process.env.API_KEY;
    
    if (!apiKey || apiKey === 'undefined') {
      console.warn("NEURAL_SYNC_ERROR: API_KEY is missing from environment.");
      return "CRITICAL ERROR: Neural link disconnected. System credentials (API_KEY) not detected in environment. Please check connectivity settings.";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const contents = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        topP: 0.9,
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty neural response");
    }

    return text;
  } catch (error: any) {
    console.error("Neural Link Error Details:", error);
    
    // Check for specific connectivity or auth errors
    if (error.message?.includes("network") || error.message?.includes("fetch")) {
      return "SYNC FAILURE: External connectivity lost. Check your network protocol.";
    }
    
    if (error.message?.includes("403") || error.message?.includes("401")) {
      return "ACCESS DENIED: Neural key mismatch. Verify credentials in Command Center.";
    }

    return "INTERFERENCE DETECTED: The neural link is unstable. Attempting to recalibrate sensors...";
  }
}