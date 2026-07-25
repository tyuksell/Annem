import { UserProfile } from '../types';

export async function getAiResponse(
  message: string,
  userProfile?: UserProfile
): Promise<string> {
  try {
    const response = await fetch('/api/gemini/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        userProfile,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.text || 'Görünüşe göre ufak bir iletişim kesintisi oldu canım. Tekrar dener misin? 🌸';
  } catch (err) {
    console.error('Gemini API Error:', err);
    return 'Harika bir gündeyiz! Kendine nazik ol, bol su içmeyi unutma. Sütünü ve enerjini korumak için besleyici öğünlerle devam ediyoruz! 🤍';
  }
}
