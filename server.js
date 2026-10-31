import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

// 1. Load the secret API key from your local .env file
dotenv.config();

const app = express();

// 2. Allow your browser frontend to talk to this backend
app.use(cors());
app.use(express.json());

// 3. Initialize the Google GenAI wrapper with your key
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post('/api/generate-schedule', async (req, res) => {
  try {
    const { rawText } = req.body;

    if (!rawText) {
      return res.status(400).json({ error: 'Raw text parameter is missing.' });
    }

    const today = new Date().toISOString().split('T')[0];

    // Build the highly restrictive, atomic system prompt for extraction
    const systemPrompt = `
      Today's date is ${today}.
      
      You are an expert academic planning assistant. Your job is to extract EVERY distinct assignment, exam, quiz, essay, project, or deliverable mentioned in the provided syllabus text.
      
      CRITICAL INSTRUCTIONS:
      1. ATOMIC TASKS: Never bundle multiple deliverables together. If there are multiple items mentioned, output them as separate objects in the JSON array.
      2. SUBTASKS: For EACH deliverable, generate 2-4 concrete, chronological sub-milestones (e.g., "Outline draft", "Implement core algorithm", "Review test cases").
      3. CALCULATE DATES: Use ${today} to compute absolute YYYY-MM-DD due dates based on relative days mentioned (e.g., "in 5 days").
      
      Respond with ONLY a raw JSON array matching this exact schema:
      [
        {
          "course": "String (e.g. 'CS101')",
          "title": "String (Specific name of the deliverable, e.g. 'Problem Set 1')",
          "type": "Essay" | "Coding" | "Exam" | "Presentation" | "Problem Set",
          "dueDate": "YYYY-MM-DD",
          "weight": number (1 to 100),
          "difficultyOverride": number (1 to 10),
          "subtasks": [
            "String (Step 1)",
            "String (Step 2)",
            "String (Step 3)"
          ]
        }
      ]

      Syllabus / Text to parse:
      """
      ${rawText}
      """
    `;

    // Securely query Gemini 2.5 Flash on the backend
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash-lite',
      contents: systemPrompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.1
      }
    });

    const parsedTasks = JSON.parse(response.text);
    
    // Send the extracted array back to your HTML frontend
    res.json({ parsedTasks });

  } catch (error) {
    console.error('Secure Processing Node Error:', error);
    res.status(500).json({ error: 'Server was unable to process parsing requests.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Secure UniFlow backend sandbox active on http://localhost:${PORT}`);
});
