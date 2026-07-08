# FinanceGPT Frontend
 
> AI-powered financial assistant frontend built with React, Vite, Tailwind CSS, and DaisyUI.
 
![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-6-purple)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-cyan)
![DaisyUI](https://img.shields.io/badge/DaisyUI-5-green)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black)
 
## 🔗 Live Demo
 
- **Frontend:** https://financegpt-frontend.vercel.app
- **Backend API:** https://financegpt-backend-h10j.onrender.com
---
 
## 📌 Project Overview
 
FinanceGPT Frontend is a clean, responsive chat interface that allows users to interact with an AI-powered financial assistant through natural language. Users can query real-time stock prices, analyze performance, compare stocks, and manage a virtual portfolio — all through conversational prompts.
 
---
 
## 🛠️ Tech Stack
 
| Technology | Purpose |
|---|---|
| React 18 | UI library |
| Vite | Build tool and dev server |
| Tailwind CSS | Utility-first styling |
| DaisyUI | Component library (dark theme) |
| react-markdown | Render AI responses as markdown |
| react-icons | Icon library |
| Vercel | Deployment platform |
 
---
 
## ✨ Features
 
- 💬 **Chat Interface** — Clean conversational UI with user and AI message bubbles
- 📋 **Template Cards** — Quick-start prompts for common queries
- 🌙 **Dark Theme** — Professional dark UI using DaisyUI
- ⌨️ **Keyboard Shortcuts** — Enter to send, Shift+Enter for new line
- ⏳ **Loading Indicator** — Animated dots while waiting for AI response
- 📝 **Markdown Rendering** — AI responses rendered with proper formatting
- 🕐 **Timestamps** — Each message shows time sent
- 🗑️ **Clear Chat** — Reset conversation from sidebar
---
 
## 📁 Project Structure
 
```
src/
├── components/
│   ├── Sidebar.jsx        # Left panel with branding and clear chat
│   ├── ChatView.jsx       # Main chat area with input
│   ├── Message.jsx        # Individual chat bubble component
│   └── TemplateCards.jsx  # Quick-start prompt cards
├── utils/
│   └── api.js             # API calls to Spring Boot backend
├── App.jsx                # Root component, state management
└── main.jsx               # Entry point
```
 
---
 
## 🧠 React Concepts Used
 
### State Lifting
Messages state lives in `App.jsx` because both `Sidebar` (clear chat) and `ChatView` (add messages) need access to it.
 
```jsx
const App = () => {
  const [messages, setMessages] = useState([])
  // passed down as props to both components
}
```
 
### Props
Data and functions passed between components:
```jsx
<ChatView messages={messages} addMessage={addMessage} />
<Sidebar clearChat={clearChat} />
```
 
### useRef
Used for auto-scroll and auto-focus without causing re-renders:
```jsx
const messagesEndRef = useRef(null)
messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
```
 
### Conditional Rendering
Shows template cards when no messages, chat when conversation starts:
```jsx
{messages.length === 0 ? <TemplateCards /> : messages.map(...)}
```
 
### async/await
Handles API calls with loading state:
```jsx
const handleSend = async () => {
  setLoading(true)
  const response = await sendMessage(input)
  addMessage({ text: response, ai: true })
  setLoading(false)
}
```
 
---
 
## 🔌 API Integration
 
All backend communication happens in `src/utils/api.js`:
 
```javascript
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'
 
export const sendMessage = async (message) => {
  const response = await fetch(`${BASE_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  })
  const data = await response.json()
  return data.response
}
```
 
---
 
## ⚙️ Setup & Installation
 
### Prerequisites
- Node.js 18+
- npm
### Steps
 
1. **Clone the repository**
```bash
git clone https://github.com/pratiktidke10/financegpt-frontend.git
cd financegpt-frontend
```
 
2. **Install dependencies**
```bash
npm install
```
 
3. **Create `.env` file**
```env
VITE_API_URL=http://localhost:8080
```
 
4. **Run the development server**
```bash
npm run dev
```
 
5. **Open browser**
```
http://localhost:5173
```
 
---
 
## 🔐 Environment Variables
 
| Variable | Description | Default |
|---|---|---|
| `VITE_API_URL` | Spring Boot backend URL | `http://localhost:8080` |
 
> In production (Vercel), set `VITE_API_URL` to your Render backend URL.
 
---
 
## 🚀 Deployment
 
Deployed on **Vercel**:
 
1. Push code to GitHub
2. Import repo in Vercel
3. Add `VITE_API_URL` environment variable
4. Vercel auto-detects Vite and deploys
> **Note:** Backend (Render free tier) spins down after inactivity. First message may take ~30 seconds while backend wakes up.
 
---
 
## 📱 Template Prompts
 
The welcome screen shows 6 quick-start cards:
 
| Card | Prompt |
|---|---|
| 📈 Current Stock Price | "What is the current price of Apple?" |
| 📊 Stock Performance | "How has Tesla performed recently?" |
| 🔀 Compare Stocks | "Compare Apple and Google stocks" |
| 🛒 Buy Stocks | "Buy 5 shares of Apple" |
| 💰 Sell Stocks | "Sell 2 shares of Apple" |
| 💼 View Portfolio | "Show my portfolio" |
 
---
 
## 🔗 Related Repository
 
- **Backend:** [financegpt-backend](https://github.com/pratiktidke10/financegpt-backend)
---
 
## 👨‍💻 Author
 
**Pratik Tidke**
- GitHub: [@pratiktidke10](https://github.com/pratiktidke10)
- LinkedIn: [Pratik Tidke](https://linkedin.com/in/pratiktidke10)
