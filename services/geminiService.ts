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
  try {
    // Initializing the GenAI client with the environment variable as per guidelines.
    // The instructions state we should assume this is pre-configured and valid.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
    
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
    const errorMsg = error.message?.toLowerCase() || "";
    
    if (errorMsg.includes("network") || errorMsg.includes("fetch")) {
      return "SYNC FAILURE: External connectivity lost. Check your network protocol.";
    }
    
    if (errorMsg.includes("403") || errorMsg.includes("401") || errorMsg.includes("api_key") || errorMsg.includes("api key")) {
      return "ACCESS DENIED: Neural key mismatch or missing credentials. Verify environment clearance in the Command Center.";
    }

    return "INTERFERENCE DETECTED: The neural link is unstable. Attempting to recalibrate sensors...";
  }
}