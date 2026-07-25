import { GoogleGenAI } from '@google/genai';

const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }

  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, userProfile } = req.body || {};

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Mesaj gerekli.' });
  }

  const ai = getGeminiClient();
  if (!ai) {
    return res.json({
      text: 'Günaydın güzel insan! 🌸 Bugün de birlikte harika adımlar atacağız. Emziren anneler için bol su içmek ve yulaf gibi nefis gıdalar tüketmek hem sütünü artırır hem enerjini korur. Kendine nazik ol, her küçük adımın çok kıymetli! 🤍',
    });
  }

  const isNursing = userProfile?.isNursing ?? true;
  const hasKneeIssue = userProfile?.hasKneeIssue ?? false;
  const currentWeight = userProfile?.currentWeight || 'sağlıklı hedefe doğru';
  const targetWeight = userProfile?.targetWeight || '68.0';

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
- Emziren Anne: ${isNursing ? 'Evet (Süt kalitesi ve miktarını korumak birinci önceliktir. Asla katı şok diyetler önerme, bol sıvı, protein, yulaf, ceviz vb. besleyici ve tatlı alternatifler sun).' : 'Hayır'}
- Diz Problemi: ${hasKneeIssue ? 'Evet Var (Eklem dostu, oturarak yapılan veya hafif yürüyüşler öner, zıplamalı hareketler önerme).' : 'Yok'}
- Güncel Kilo: ${currentWeight} kg
- Hedef Kilo: ${targetWeight} kg
- Çocuğu: Ertuğrul (Minik Ertuğrul ile keyifli vakit geçirme ve oyun önerileri de verebilirsin).

Yanıtlarında samimi emoji'ler (🌸, 🤍, ✨, ☕, 🌿) ve okunabilir Markdown listeleri kullan.
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: [
        {
          role: 'user',
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

    const text = response.text || 'Şu an yanıt oluşturulamadı. Lütfen tekrar deneyin.';
    return res.status(200).json({ text });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({
      error: 'Yapay zeka asistanı yanıt verirken bir sorun oluştu.',
      details: error?.message || 'Bilinmeyen hata',
    });
  }
}
