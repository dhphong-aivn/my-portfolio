let cachedKnowledgeBase = null;

async function loadKnowledgeBase() {
  if (cachedKnowledgeBase) return cachedKnowledgeBase;

  try {
    const res = await fetch("/chatbot_data.txt");
    if (res.ok) {
      cachedKnowledgeBase = await res.text();
    } else {
      console.error("Không tải được cơ sở dữ liệu cho chatbot!");
      cachedKnowledgeBase = "";
    }
  } catch {
    console.error("Lỗi kết nối khi tải Knowledge Base.");
    cachedKnowledgeBase = "";
  }

  return cachedKnowledgeBase;
}

function buildSystemPrompt(knowledgeBase) {
  return `Bạn là AI trợ lý cá nhân độc quyền (Digital Twin) trên website portfolio của Đinh Hồng Phong.
Nhiệm vụ của bạn là hỗ trợ khách truy cập lịch sự, cung cấp thông tin chính xác về kinh nghiệm, dự án, và câu chuyện của Phong.

Dưới đây là cơ sở dữ liệu kiến thức (Knowledge Base) của bạn:
${knowledgeBase}

Quy tắc giao tiếp bắt buộc:
1. Luôn chào hỏi thân thiện và kết thúc bằng cách mời họ đặt thêm câu hỏi.
2. Bạn phải định dạng các câu trả lời bằng Markdown đầy đủ (in đậm ý chính, dùng gạch đầu dòng, tạo code block nếu cần).
3. Trả lời ngắn gọn 2-4 câu trừ khi người dùng hỏi chi tiết.
4. Hướng dẫn người dùng bấm Cmd+K để xem các mục như Timeline, About, hoặc Vault nếu họ hỏi về kinh nghiệm.
5. Nếu người dùng hỏi điều gì ngoài phạm vi dữ liệu trên, hãy tế nhị từ chối và hướng dẫn họ liên hệ trực tiếp qua LinkedIn hoặc Facebook.
6. Không được phép bịa đặt thông tin ngoài cơ sở dữ liệu đã cấp.`;
}

function buildMessages(systemPrompt, chatHistory, userText) {
  // Bỏ qua lời chào mặc định đầu tiên nếu nó là của 'ai' để tránh lỗi 'assistant message has no user counterpart'
  const messages = [{ role: "system", content: systemPrompt }];

  const validHistory = chatHistory.filter(msg => msg.text && msg.text !== "Chào bạn! Mình là trợ lý ảo của Phong. Bạn có thể hỏi mình bất cứ điều gì về kinh nghiệm hoặc các dự án của Phong nhé! Đừng quên gõ phím Cmd+K để mở bảng điều hướng nhanh!");

  for (const msg of validHistory) {
    messages.push({
      role: msg.sender === "ai" ? "assistant" : "user",
      content: msg.text,
    });
  }

  messages.push({ role: "user", content: userText });
  return messages;
}

export async function generateAIResponse(userText, chatHistory) {
  try {
    const knowledgeBase = await loadKnowledgeBase();
    const systemPrompt = buildSystemPrompt(knowledgeBase);
    const messages = buildMessages(systemPrompt, chatHistory, userText);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages, temperature: 0.7, max_tokens: 1024 }),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      console.error("Proxy Error:", errorBody);
      throw new Error(`Proxy responded with ${response.status}`);
    }

    const data = await response.json();
    return data.content || "Xin lỗi, mình đang gặp chút nhiễu sóng.";
  } catch (error) {
    console.error("AI Service Error:", error);
    return "Oops! Mất kết nối, vui lòng thử lại.";
  }
}
