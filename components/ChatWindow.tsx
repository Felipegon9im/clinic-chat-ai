import React, { useRef, useEffect } from 'react';
import useChat from '../hooks/useChat';
import ChatMessage from './ChatMessage';

const ChatHeader: React.FC = () => (
    <div className="bg-[#8FA893] text-white p-3 flex items-center shadow-md flex-shrink-0">
        <div className="w-10 h-10 rounded-full mr-3 bg-white flex items-center justify-center text-[#8FA893] font-bold text-xl">
            CV
        </div>
        <div className="flex-grow">
            <div className="flex items-center">
              <h3 className="font-semibold">Clínica Vehe</h3>
              <img src="https://raw.githubusercontent.com/Felipegon9im/Cardapio-front/main/verified.png" alt="Verificado" className="w-4 h-4 ml-1.5" />
            </div>
            <p className="text-xs opacity-90">Online</p>
        </div>
    </div>
);

const ChatInput: React.FC<{ onSend: (text: string) => void; isWaiting: boolean; options?: string[] }> = ({ onSend, isWaiting, options }) => {
    const [input, setInput] = React.useState('');

    const handleSend = () => {
        if (input.trim() && !isWaiting) {
            onSend(input.trim());
            setInput('');
        }
    };
    
    const handleOptionClick = (option: string) => {
        if (!isWaiting) {
            onSend(option);
        }
    }

    if(options && options.length > 0) {
        return (
            <div className="p-4 bg-transparent flex flex-wrap gap-2 justify-center">
                {options.map(option => (
                    <button key={option} onClick={() => handleOptionClick(option)} disabled={isWaiting} className="bg-white text-[#9F656A] py-2 px-4 rounded-full shadow-md hover:bg-gray-100 disabled:opacity-50 transition-colors font-semibold border border-gray-200">
                        {option}
                    </button>
                ))}
            </div>
        )
    }

    return (
        <div className="p-4 bg-transparent flex items-center">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Digite sua mensagem..."
                disabled={isWaiting}
                className="flex-grow py-2 px-4 rounded-full bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-[#9F656A]/50"
            />
            <button onClick={handleSend} disabled={isWaiting} className="ml-3 bg-[#9F656A] text-white p-3 rounded-full shadow-md hover:bg-[#804247] disabled:bg-gray-400 transition-colors">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            </button>
        </div>
    );
};

const ChatWindow: React.FC = () => {
    const { messages, sendMessage, isWaiting } = useChat();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const lastMessage = messages[messages.length - 1];

    return (
        <div 
          className="w-full md:w-[90vw] max-w-4xl h-full md:h-[95vh] bg-[#F0F2F5] flex flex-col rounded-none md:rounded-lg shadow-2xl z-10" 
          style={{backgroundImage: 'url(https://www.transparenttextures.com/patterns/clean-gray-paper.png)'}}
        >
            <ChatHeader />
            <div className="flex-grow p-4 overflow-y-auto">
                {messages.map((msg) => (
                    <ChatMessage key={msg.id} message={msg} />
                ))}
                {isWaiting && <div className="text-center text-sm text-gray-500 italic py-2">Digitando...</div>}
                <div ref={messagesEndRef} />
            </div>
            <div className="bg-gray-200/50 flex-shrink-0 border-t border-gray-300/50">
              <ChatInput onSend={sendMessage} isWaiting={isWaiting} options={lastMessage?.sender === 'bot' ? lastMessage.options : undefined} />
            </div>
        </div>
    );
};

export default ChatWindow;