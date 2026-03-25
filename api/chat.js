export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const API_BASE_URL = process.env.LLM_API_BASE_URL;
  const API_KEY = process.env.LLM_API_KEY;
  const MODEL = process.env.LLM_MODEL;

  if (!API_BASE_URL || !API_KEY || !MODEL) {
    console.error("Missing environment variables: LLM_API_BASE_URL, LLM_API_KEY, LLM_MODEL");
    return res.status(500).json({ error: "Server configuration error" });
  }

  try {
    const { messages, temperature = 0.7, max_tokens = 1024 } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid request: messages array required" });
    }

    const response = await fetch(`${API_BASE_URL}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
        "HTTP-Referer": "https://dinhhongphong-portfolio.vercel.app", // Website của bạn
        "X-Title": "Phong Portfolio Digital Twin",
      },
      body: JSON.stringify({
        model: MODEL,
        messages,
        temperature,
        max_tokens,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error");
      console.error(`Upstream API Error ${response.status}:`, errorText);
      return res.status(502).json({ error: "Upstream API error", status: response.status });
    }

    const data = await response.json();

    return res.status(200).json({
      content: data.choices?.[0]?.message?.content || "",
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
