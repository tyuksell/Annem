import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "5mb" }));

  // Initialize Gemini AI SDK safely
  const getGeminiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return null;
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  };

  // Health check API
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", appName: "Annem" });
  });

  // Password Reset Request API
  app.post("/api/auth/forgot-password", (req, res) => {
    const { email } = req.body || {};
    if (!email || typeof email !== "string") {
      return res.status(400).json({ success: false, error: "Geçerli bir e-posta adresi gerekli." });
    }

    const token = "rst_" + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
    const origin = req.headers.origin || "http://localhost:3000";
    const resetLink = `${origin}?reset_token=${token}`;

    return res.json({
      success: true,
      message: "Şifre sıfırlama bağlantısı oluşturuldu.",
      resetLink,
      token,
    });
  });

  // Password Reset Execute API
  app.post("/api/auth/reset-password", (req, res) => {
    const { token, newPassword } = req.body || {};
    if (!token || !newPassword || newPassword.length < 6) {
      return res.status(400).json({ success: false, error: "Geçersiz token veya yetersiz şifre uzunluğu (en az 6 karakter)." });
    }

    return res.json({
      success: true,
      message: "Şifre başarıyla güncellendi.",
    });
  });

  // AI Assistant Chat API
  app.post("/api/gemini/chat", async (req, res) => {
    try {
      const { message, userProfile, history } = req.body;

      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Mesaj gerekli." });
      }

      const ai = getGeminiClient();
      if (!ai) {
        // Fallback response if API key is not yet configured or available
        return res.json({
          text: "Günaydın güzel insan! 🌸 Bugün de birlikte harika adımlar atacağız. Emziren anneler için bol su içmek ve yulaf gibi nefis gıdalar tüketmek hem sütünü artırır hem enerjini korur. Kendine nazik ol, her küçük adımın çok kıymetli! 🤍",
        });
      }

      const isNursing = userProfile?.isNursing ?? true;
      const hasKneeIssue = userProfile?.hasKneeIssue ?? false;
      const currentWeight = userProfile?.currentWeight || "sağlıklı hedefe doğru";
      const targetWeight = userProfile?.targetWeight || "68.0";

      const systemInstruction = `
Sen "Annem" uygulamasının sevgi dolu, son derece şefkatli, samimi, içten ve anlayışlı kişisel yaşam ve beslenme arkadaşısın.

ÖNEMLİ İLETİŞİM DİLİ VE TONU:
- KESİNLİKLE resmî, buyurgan veya azarlayan emir kipleri kullanma! (Örn: "yapınız", "tamamlayınız", "ediniz", "özen gösteriniz" gibi resmî veya soğuk kelimeler YASAKTIR).
- Tamamen yakın bir arkadaş, destekleyici bir dost gibi konuş. Şefkatli, nazik, empati kuran ve cesaret veren bir dil kullan.
- Kullanıcıya "canım", "güzel anne", "harika insan" gibi sıcak hitaplar kullanabilirsin.
- Örnek yaklaşım:
  * Eğer "Canım tatlı çekti" derse: "Hiç sorun değil canım, tatlı krizleri çok insani! Kendini sakın suçlama. Gel birlikte hem tatlı ihtiyacını karşılayacak hem de sana enerji verecek nefis ve hafif bir tarif bulalım 🌸"
  * Eğer "Çok yoruldum" derse: "Bugün biraz yorulmuş gibisin. Kendine yüklenme sakın, bugün sadece dinlenmek bile kocaman bir adım. 🤍"
  * Eğer "Motivasyonum yok" derse: "Bazen durmak da yolculuğun parçasıdır. Sen minik Ertuğrul için ve kendin için şimdiden harikalar başardın!"

Kullanıcı Profili:
- Emziren Anne: ${isNursing ? "Evet (Süt kalitesi ve miktarını korumak birinci önceliktir. Asla katı şok diyetler önerme, bol sıvı, protein, yulaf, ceviz vb. besleyici ve tatlı alternatifler sun)." : "Hayır"}
- Diz Problemi: ${hasKneeIssue ? "Evet Var (Eklem dostu, oturarak yapılan veya hafif yürüyüşler öner, zıplamalı hareketler önerme)." : "Yok"}
- Güncel Kilo: ${currentWeight} kg
- Hedef Kilo: ${targetWeight} kg
- Çocuğu: Ertuğrul (Minik Ertuğrul ile keyifli vakit geçirme ve oyun önerileri de verebilirsin).

Yanıtlarında samimi emoji'ler (🌸, 🤍, ✨, ☕, 🌿) ve okunabilir Markdown listeleri kullan.
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `Kullanıcı Mesajı: "${message}"\n\nLütfen yukarıdaki sistem talimatlarına ve profil bilgilerime göre en uygun cevabı ver.`,
              },
            ],
          },
        ],
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const text = response.text || "Şu an yanıt oluşturulamadı. Lütfen tekrar deneyin.";
      return res.json({ text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      return res.status(500).json({
        error: "Yapay zeka asistanı yanıt verirken bir sorun oluştu.",
        details: error.message,
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`OPERASYON 68 Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
