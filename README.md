# Test - Voltquant

## Getting Started

Create a file call .env with and insert the API KEY:
```bash
X_API_KEY= "INSERT THE API KEY"
```
Run the development server:
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How the task was made
- The app state is managed using React state, handling loading, messages, chat history, and conversation index.
- The design is inspired by ChatGPT's interface.
- Dark mode has been implemented to improve user experience in low-light environments.
- The chat interface is fully responsive, ensuring a smooth experience across different screen sizes.
- Headless UI has been added to manage the Popover component.
- A separate ChatMenu component has been created to manage the menu that contains the chat history, improving code organization and reusability.
  
### Technology stack:
1. React
2. Next JS
3. TailwindCSS
4. Lucide React for icons
5. Fetch API for data fetching
6. HeadlessUi for PopOver component
### Preview
  ![Captura de pantalla 2025-01-29 a las 15 15 21](https://github.com/user-attachments/assets/2169d18b-7897-4863-818d-682c1b2b5320)
  ![Captura de pantalla 2025-01-29 a las 15 13 55](https://github.com/user-attachments/assets/1f4124a9-d8d3-4ea1-90b6-1e98d0a38512)


## Assumptions
- The chat operates in-memory, meaning messages are lost when the page is refreshed.
- The chat history panel also resets upon page refresh.
- A dedicated API route has been created to handle requests and forward them directly to the external API.
