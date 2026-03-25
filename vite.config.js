import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/chat': {
          target: env.LLM_API_BASE_URL || 'https://9router.vuhai.io.vn/v1',
          changeOrigin: true,
          rewrite: () => '/chat/completions',
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              proxyReq.setHeader('Authorization', `Bearer ${env.LLM_API_KEY || ''}`)

              // Rewrite body to inject model
              const originalWrite = proxyReq.write.bind(proxyReq)
              let body = ''
              proxyReq.write = (chunk) => {
                body += chunk.toString()
                return true
              }

              const originalEnd = proxyReq.end.bind(proxyReq)
              proxyReq.end = (chunk) => {
                if (chunk) body += chunk.toString()
                try {
                  const parsed = JSON.parse(body)
                  parsed.model = env.LLM_MODEL || 'ces-chatbot-gpt-5.4'
                  const newBody = JSON.stringify(parsed)
                  proxyReq.setHeader('Content-Length', Buffer.byteLength(newBody))
                  originalWrite(newBody)
                } catch {
                  originalWrite(body)
                }
                originalEnd()
              }
            })

            proxy.on('proxyRes', (proxyRes, req, res) => {
              // Transform upstream OpenAI response to our simplified format
              let responseBody = ''
              proxyRes.on('data', (chunk) => { responseBody += chunk })
              proxyRes.on('end', () => {
                try {
                  const data = JSON.parse(responseBody)
                  const content = data.choices?.[0]?.message?.content || ''
                  res.end(JSON.stringify({ content }))
                } catch {
                  res.end(responseBody)
                }
              })
            })
          },
        },
      },
    },
  }
})
