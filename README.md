# 🤖Pixi the Chat Bot
Hi! I'm Pixie, your super smart chatbot powered by OpenAI! I'm here to chat, help, and sprinkle a little bit of magic into your conversations.

## 👋🏻 Getting Started

Create a file called .env and insert the API KEY:
```bash
OPENAI_API_KEY= "INSERT THE API KEY"
```
Run the development server:
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
### 👩🏼‍💻Technology stack:
1. React
2. Next JS
3. TailwindCSS
4. Lucide React for icons
5. HeadlessUi for the Popover component
6. OpenAI API

### 👁️ Preview
![Captura de pantalla 2025-02-13 a las 16 01 03](https://github.com/user-attachments/assets/3b659590-d42c-467f-b98c-e44b29394f1f)

## How Pixi was made
- All the app state is managed using React state, handling loading, messages, chat history, and conversation index.
- The design is inspired by ChatGPT's interface.
- Dark mode has been implemented to improve user experience in low-light environments.
- The chat interface is fully responsive, ensuring a smooth experience across different screen sizes.
- A separate ChatMenu component has been created to manage the menu that contains the chat history, improving code organization and reusability.
- A dedicated API route has been created to handle requests and forward them directly to the external API. 

