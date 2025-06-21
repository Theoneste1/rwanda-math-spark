
import { useState } from "react";
import { MessageCircle, X, ExternalLink } from "lucide-react";

interface ChatMessage {
  type: 'user' | 'bot';
  message: string;
  links?: { text: string; url: string }[];
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { type: 'bot', message: 'Hi! I\'m here to help you learn about the Rwanda Mathematics Olympiad. Ask me anything!' }
  ]);
  const [input, setInput] = useState('');

  const cannedResponses: { [key: string]: { message: string; links?: { text: string; url: string }[] } } = {
    'what is rwmo': {
      message: 'The Rwanda Mathematics Olympiad is a national program that identifies and nurtures talented math students through competitions and training camps.',
    },
    'how do i join': {
      message: 'Students register through their schools. Check our Get Involved page for more information.',
      links: [{ text: 'Get Involved', url: '/get-involved' }]
    },
    'when is the next camp': {
      message: 'Next camp will take place in July. Follow us on WhatsApp for updates.',
      links: [
        { text: 'Join WhatsApp', url: 'https://wa.me/250788123456' },
        { text: 'LinkedIn', url: 'https://www.linkedin.com/company/103636241/admin/dashboard/' }
      ]
    },
    'contact': {
      message: 'You can reach us at invest@rwandaolympiad.rw or visit our Contact page.',
      links: [{ text: 'Contact Page', url: '/contact' }]
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = input.toLowerCase();
    setMessages(prev => [...prev, { type: 'user', message: input }]);

    // Find matching response
    let response = cannedResponses['contact']; // default response
    for (const key in cannedResponses) {
      if (userMessage.includes(key)) {
        response = cannedResponses[key];
        break;
      }
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: 'bot', 
        message: response.message,
        links: response.links 
      }]);
    }, 500);

    setInput('');
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 bg-white rounded-lg shadow-xl border z-50">
      <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
        <h3 className="font-semibold">RwMO Assistant</h3>
        <button onClick={() => setIsOpen(false)}>
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="h-64 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs p-3 rounded-lg ${
              msg.type === 'user' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              <p className="text-sm">{msg.message}</p>
              {msg.links && (
                <div className="mt-2 space-y-1">
                  {msg.links.map((link, linkIdx) => (
                    <a
                      key={linkIdx}
                      href={link.url}
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm underline"
                      target={link.url.startsWith('http') ? '_blank' : undefined}
                      rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {link.text}
                      {link.url.startsWith('http') && <ExternalLink className="w-3 h-3" />}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask me about RwMO..."
            className="flex-1 p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
