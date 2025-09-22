import React from 'react';
import ChatWindow from './components/ChatWindow';
import SetupGuide from './components/SetupGuide';

const App: React.FC = () => {
  return (
    <div className="bg-[#F0F2F5] w-screen h-screen flex items-center justify-center font-sans overflow-hidden">
      <SetupGuide />

      {/* Branded background header */}
      <div className="absolute top-0 left-0 w-full h-[127px] bg-[#8FA893] z-0"></div>
      
      <ChatWindow />
    </div>
  );
};

export default App;