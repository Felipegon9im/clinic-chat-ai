import React from 'react';
import type { Message } from '../types';

const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {
  const isUser = message.sender === 'user';
  const bubbleClasses = isUser
    ? 'bg-[#9F656A] text-white self-end'
    : 'bg-[#8FA893] text-white self-start';
  const containerClasses = isUser ? 'justify-end' : 'justify-start';

  return (
    <div className={`flex ${containerClasses} mb-3`}>
      <div
        className={`max-w-xs md:max-w-lg p-3 rounded-xl shadow ${bubbleClasses}`}
      >
        <div className="text-sm">{message.text}</div>
      </div>
    </div>
  );
};

export default ChatMessage;