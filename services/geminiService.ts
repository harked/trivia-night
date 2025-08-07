
import { GoogleGenAI, Type } from "@google/genai";
import { TriviaQuestion } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const questionSchema = {
  type: Type.OBJECT,
  properties: {
    question: {
      type: Type.STRING,
      description: "The trivia question text.",
    },
    options: {
      type: Type.ARRAY,
      description: "An array of 4 multiple-choice options.",
      items: { type: Type.STRING },
    },
    answer: {
      type: Type.STRING,
      description: "The correct answer, which must exactly match one of the items in the 'options' array.",
    },
  },
  required: ["question", "options", "answer"],
};

export const generateTriviaQuestions = async (category: string, count: number): Promise<TriviaQuestion[]> => {
  try {
    const prompt = `Generate ${count} unique, multiple-choice trivia questions about ${category}. Each question should have 4 options and one clear, correct answer. The difficulty should be medium.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: questionSchema,
        },
      },
    });

    const responseText = response.text.trim();
    if (!responseText) {
        console.error("Gemini API returned an empty response.");
        return [];
    }
    
    const questions = JSON.parse(responseText);

    // Basic validation
    if (!Array.isArray(questions) || questions.length === 0) {
      console.error("Parsed JSON is not a valid array of questions:", questions);
      return [];
    }

    return questions.filter(q => q.question && q.options && q.answer && q.options.length === 4);

  } catch (error) {
    console.error("Error generating trivia questions:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to communicate with Gemini API: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating questions.");
  }
};
