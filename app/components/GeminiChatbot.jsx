"use client";
import { useState } from "react";

export default function GeminiChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");

  const detectLocation = async () => {
    if (!navigator.geolocation) {
      setLocation("Location not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        // Use OpenWeather API or similar to get area name
        const res = await fetch(
          `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
        );
        const data = await res.json();
        setLocation(data[0]?.name || "Unknown");
      },
      () => setLocation("Unable to detect location")
    );
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setMessages([...messages, { role: "user", content: input }]);
    setInput("");
    try {
      const geminiApiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      const prompt = `
You are AgriConnect's AI assistant. Respond in markdown with double asterisks for headings and bold text. Limit your answer to 100-150 words.
User location: ${location || "Not provided"}.
If user asks about crops or soil, use relevant context.
User query: "${input}"
Always cite your sources (public datasets, government portals, etc.) and explain your reasoning for reliability.
      `;
      const res = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-goog-api-key": geminiApiKey
          },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
        }
      );
      const data = await res.json();
      const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
      setMessages((msgs) => [...msgs, { role: "bot", content: answer }]);
    } catch (err) {
      setMessages((msgs) => [...msgs, { role: "bot", content: "Error fetching response. Please check your internet connection or try again later." }]);
    }
    setLoading(false);
  };

  return (
    <>
      <button
        className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-green-700 text-white p-4 rounded-full shadow-xl z-50 hover:scale-105 transition-transform"
        onClick={() => setOpen(true)}
        title="Chat with Agri AI"
      >
        <span className="text-xl">💬</span>
      </button>
      {open && (
        <div className="fixed bottom-24 right-6 bg-white rounded-2xl shadow-2xl w-96 h-[32rem] flex flex-col z-50 border border-green-600">
          <div className="flex justify-between items-center p-4 border-b bg-gradient-to-r from-green-100 to-green-200 rounded-t-2xl">
            <span className="font-bold text-green-700 text-lg">AgriConnect AI Chatbot</span>
            <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-red-500 text-xl">✖️</button>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border-b">
            <button
              className="bg-green-600 text-white px-3 py-1 rounded shadow hover:bg-green-700"
              onClick={detectLocation}
              type="button"
            >
              {location ? `📍 ${location}` : "Detect Location"}
            </button>
            <span className="text-xs text-gray-500">Location helps with crop/weather queries</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[80%] px-4 py-2 rounded-lg shadow ${
                  msg.role === "user"
                    ? "ml-auto bg-green-200 text-green-900"
                    : "mr-auto bg-white border border-green-100 text-gray-800"
                }`}
              >
                {/* Render markdown for bot messages */}
                {msg.role === "bot" ? (
                  <div dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br/>") }} />
                ) : (
                  <span>{msg.content}</span>
                )}
              </div>
            ))}
            {loading && <div className="text-gray-400 text-xs">Typing...</div>}
          </div>
          <div className="p-4 border-t flex gap-2 bg-white">
            <input
              className="flex-1 border rounded-lg px-3 py-2 shadow focus:ring-2 focus:ring-green-500"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about crops, soil, weather, loans..."
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              disabled={loading}
            />
            <button
              className="bg-gradient-to-r from-green-500 to-green-700 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition-transform"
              onClick={sendMessage}
              disabled={loading}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}