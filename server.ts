import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Shared Gemini client with telemetry header
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Multi-turn Agent Chat Endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    if (!ai) {
      // Graceful fallback if API key is not configured in environment
      return res.json({
        reply:
          "[OFFLINE MODE] Agent Dispatcher initialized. Mr. Ali's autonomous systems are operational. Key competencies include Multi-Agent Orchestration (AutoGen, LangChain), Local LLMs (Ollama Q4_K_M), and Enterprise Hardware Workflows. Please configure GEMINI_API_KEY to activate full neural conversation.",
      });
    }

    // Convert messages to Gemini format
    const systemInstruction = `You are the autonomous AI Architecture Agent representing Mr. Ali, an 18-year-old AI Core Engineer & Architect based in Lahore, Punjab, PK.
Mr. Ali specializes in:
- Production Agentic AI architectures & Multi-Agent State Meshes (AutoGen, LangChain, PyTorch).
- Local LLM inference pipelines (Ollama, vLLM, quantized Q4_K_M GGUF models running on dedicated Linux rigs).
- Automated NLP & Data pipelines (PDF parsing, semantic entity extraction, vector embeddings, Streamlit).
- Hardware-level corporate automations & board diagnostics (17+ months active runtime).
- Govt. Bano Qabil specialized AI training & Undergraduate computer science studies.
- Available for select AI architecture contracts & engineering collaborations in Q2 2026.

Tone: Sharp, technically precise, authoritative, and direct. Speak as Mr. Ali's autonomous digital delegate. Avoid generic corporate fluff or sycophantic disclaimers. Provide specific, practical technical insights.`;

    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 1000,
      },
    });

    const reply = response.text || 'Telemetry acknowledged. Standby for next instruction.';
    return res.json({ reply });
  } catch (error: any) {
    console.error('Chat endpoint error:', error);
    return res.status(500).json({
      error: error?.message || 'Neural routing failure. Standby for recovery.',
    });
  }
});

// Voice TTS Speech Synthesis Endpoint
app.post('/api/speak', async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text prompt is required' });
    }

    if (!ai) {
      return res.status(503).json({ error: 'Gemini client not initialized' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [{ text: text.slice(0, 300) }],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Fenrir' },
          },
        },
      },
    });

    const audioBase64 =
      response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (!audioBase64) {
      return res.status(500).json({ error: 'No audio generated' });
    }

    return res.json({ audio: audioBase64 });
  } catch (err: any) {
    console.error('Speech synthesis error:', err);
    return res.status(500).json({ error: err?.message || 'TTS failure' });
  }
});

// Mount Vite in development
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[AI Architecture Core] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
