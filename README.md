# Homework Helper AI

A smart AI-powered homework assistant that helps students with their studies through interactive chat. Built with Next.js and AI SDK, this application allows users to ask questions, upload images of problems, and get AI-generated assistance.

![Homework Helper AI Screenshot](public/logo.png)

## ✨ Features

- 🎓 AI-powered homework assistance
- 📸 Image upload for problem solving
- 🎥 Camera integration for quick photo capture
- 📱 Mobile-responsive design
- ⏳ Daily message limit to prevent abuse
- 🔒 Local storage for message history

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/homework-helper-ai.git
   cd homework-helper-ai
   ```

2. Install dependencies:
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your AI provider API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠️ Built With

- [Next.js](https://nextjs.org/) - The React Framework
- [AI SDK](https://sdk.vercel.ai/) - For AI capabilities
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - Styling

## 📝 Usage

1. Type your question in the chat input
2. Upload images of problems using the attachment button
3. Use the camera to quickly capture problems
4. Get AI-powered assistance instantly

## 🔒 Daily Limit

To prevent abuse, the app limits users to 15 messages per day. The counter resets at midnight local time.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Vercel](https://vercel.com/) for the amazing Next.js framework
- [OpenAI](https://openai.com/) for the AI capabilities
- The open-source community for incredible tools and libraries
