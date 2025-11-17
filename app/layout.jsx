import './globals.css';
import GeminiChatbot from "./components/GeminiChatbot";


export const metadata = {
  title: 'AgriFinAI',
  description: 'Empowering Indian agriculture with AI-powered financial and crop advisory solutions.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800 antialiased">
        {children}
        <GeminiChatbot />
      </body>
    </html>
  );
}