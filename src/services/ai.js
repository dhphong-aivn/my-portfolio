const API_KEY = ""; // Mọi người tự tự điền Key nhé!

export const generateAIResponse = async (userText, chatHistory) => {
  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.1-flash-preview:generateContent?key=${API_KEY}`;
    const systemPrompt = `Bạn là Digital Twin của Dinh Hong Phong. Trả lời ngắn gọn 2-3 câu, thân thiện. Hướng dẫn người dùng bấm Cmd+K để xem các mục như Timeline hoặc Vault nếu họ hỏi về kinh nghiệm.`;
    const contents = chatHistory.map(msg => ({ role: msg.sender === 'ai' ? 'model' : 'user', parts: [{ text: msg.text }] }));
    contents.push({ role: 'user', parts: [{ text: userText }] });

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ systemInstruction: { parts: [{ text: systemPrompt }] }, contents, generationConfig: { temperature: 0.7 } })
    });
    if (!response.ok) throw new Error("Network error");
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "Xin lỗi, mình đang gặp chút nhiễu sóng.";
  } catch (error) { 
    return "Oops! Mất kết nối, vui lòng thử lại."; 
  }
};
