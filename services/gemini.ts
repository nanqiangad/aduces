import { GoogleGenAI } from "@google/genai";
import { MODEL_NAME } from "../constants";

// Helper to convert File to Base64
export const fileToGenerativePart = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64Data = base64String.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const generatePhoto = async (
  base64Image: string, 
  prompt: string, 
  mimeType: string = 'image/jpeg',
  age?: string
): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API Key not found in environment variables");
    }

    const ai = new GoogleGenAI({ apiKey });

    let finalPrompt = prompt;
    if (age && age.trim() !== '') {
      finalPrompt += ` The subject MUST appear to be ${age} years old. Adjust facial age markers (skin texture, wrinkles, or youthfulness) to match exactly ${age} years old while keeping the core identity recognizable.`;
    }
    finalPrompt += ` Maintain facial resemblance to the reference image provided. Generate a high-quality image.`;

    // Per system instruction for "Edit Images" or Generating based on image:
    // We use generateContent with the model 'gemini-2.5-flash-image'.
    // We pass the image and the text prompt.
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Image,
              mimeType: mimeType,
            },
          },
          {
            text: finalPrompt,
          },
        ],
      },
      config: {
        // Nano banana (gemini-2.5-flash-image) supports aspect ratio configuration
        imageConfig: {
            aspectRatio: "3:4", // Portrait aspect ratio suitable for photo studio results
        }
      }
    });

    // Parse response for image data
    // The output response may contain both image and text parts; iterate to find image.
    if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const base64EncodeString = part.inlineData.data;
                return `data:image/png;base64,${base64EncodeString}`;
            }
        }
    }
    
    throw new Error("No image data found in response");

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};