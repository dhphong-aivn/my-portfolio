export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages, temperature, max_tokens } = req.body;
  const apiKey = process.env.LL_API_KEY;
  // Nebius Base URL: https://api.tokenfactory.us-central1.nebius.com/v1
  const baseUrl = process.env.LL_API_BASE_URL || "https://api.tokenfactory.us-central1.nebius.com/v1";
  // Nebius Model: deepseek-ai/DeepSeek-V3.2-fast
  const model = process.env.LL_MODEL || "deepseek-ai/DeepSeek-V3.2-fast";

  if (!apiKey) {
    return res.status(500).json({ error: "Server missing API Key (LLM_API_KEY)" });
  }

  // Tối ưu tin nhắn cho DeepSeek (DeepSeek thích format text sạch sẽ)
  const optimizedMessages = (messages || []).map(msg => ({
    role: msg.role,
    content: msg.content
  }));

  try {
    const fullUrl = `${baseUrl.replace(/\/$/, '')}/chat/completions`;
    
    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model,
        messages: optimizedMessages,
        temperature: temperature || 0.6, // DeepSeek chạy rất tốt ở 0.6
        max_tokens: 1024, // DeepSeek cho phép tokens cao hơn bản free của OpenRouter
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Nebius Upstream Error:", JSON.stringify(data));
      return res.status(response.status).json({ 
        error: "Upstream API Error", 
        details: data.error?.message || "Unknown error from Nebius" 
      });
    }

    return res.status(200).json({
      content: data.choices?.[0]?.message?.content || "Không có phản hồi từ AI."
    });
  } catch (error) {
    console.error("Proxy Logic Error:", error.message);
    return res.status(502).json({ 
      error: "Lỗi kết nối Nebius AI", 
      details: error.message 
    });
  }
}
