# 🧩 Dinh Hong Phong - Personal Portfolio

[![Made with React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Styled with Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Deployed on Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![AI Powered](https://img.shields.io/badge/AI_Assistant-Digital_Twin-f39c12?style=for-the-badge&logo=openai&logoColor=white)](./api/chat.js)

A highly personalized, modern, and interactive portfolio designed with a unique **"Tactile Papercraft & Neo-Geometric"** aesthetic. Features a built-in AI "Digital Twin" to answer questions about my work and experiences.

## ✨ Key Features

- **Unique Aesthetics**: A handcrafted look inspired by papercraft (Origami), focusing on solid shadows, sharp geometric borders, and a mustard-charcoal palette.
- **AI Digital Twin**: A chatbot integrated with an OpenAI-compatible LLM (GPT-5.4) that acts as my virtual assistant, powered by a custom-built Knowledge Base.
- **Secure Backend**: Implements an **API Proxy via Vercel Serverless Functions** to keep API keys secure while communicating with LLM endpoints.
- **Command Palette**: Quick navigation anywhere using a macOS-style `Cmd+K` (or `Ctrl+K`) interface.
- **Responsive Views**: Includes Career Timeline, Personal Vault (Blog), Case Studies, and a Life Gallery.

## 🛠️ Tech Stack

- **Frontend**: [Vite](https://vitejs.dev/) + [React](https://reactjs.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **State Management**: React Hooks (State, Effects, Refs)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend API**: Node.js (Vercel Serverless Functions)
- **Deployment**: [Vercel](https://vercel.com/)

## 🚀 Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- `npm` or `yarn`

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dinhhongphong/my-portfolio.git
   cd my-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env.local` file in the root directory:
   ```env
   LLM_API_BASE_URL=https://9router.vuhai.io.vn/v1
   LLM_API_KEY=your-api-key-here
   LLM_MODEL=ces-chatbot-gpt-5.4
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## 🔒 Security & Architecture

This project follows best practices for building secure AI-powered frontend applications:

- **Strict .gitignore**: Environment files (`.local`) are never committed.
- **Reverse Proxy**: Instead of calling LLM APIs directly from the browser, we use an edge function (`/api/chat`) to inject credentials on the server side.
- **Modular Data**: Knowledge bases are kept in `public/chatbot_data.txt` for easy updates without redeploying code.

## 📄 License

This project is open-source under the [MIT License](LICENSE). 

Built with 🧡 by [Dinh Hong Phong](https://linkedin.com/in/dinhhongphong).
