import React, { useState, useEffect, useCallback } from 'react';
import type { Message, Appointment } from '../types';
import { ChatState } from '../types';
import { getAvailableSlots, bookAppointment, getAvailableDates, cancelAppointment } from '../services/googleSheetsService';

// --- Listas de Serviços Centralizadas ---
const ODONTO_SERVICES = [
    "Profilaxia (limpeza dentária)", "Restaurações", "Extrações dentárias", "Clareamento",
    "Estética dental (facetas, etc.)", "Endodontia (tratamento de canal)", "Ortodontia(aparelhos)",
    "Implantes", "Próteses Dentárias", "Preenchimento com ácido hialurônico", "Aplicação de Botox"
];

const ESTETICA_FACIAL_SERVICES = [
    "Gerenciamento de pele", "Tratamento para acnes e melasmas", "Controle do envelhecimento facial",
    "Limpeza de pele", "Peeling", "Toxina botulínica", "Preenchimento com ácido hialurônico",
    "Fios de PDO", "Rinomodelação", "Bichectomia", "Bioestimuladores de colágeno", "Laserterapia",
    "Jato de plasma", "Microagulhamento", "Entre outros"
];

const ESTETICA_CORPORAL_SERVICES = [
    "Gerenciamento de flacidez", "Tratamentos para gordura localizada", "Tratamento para estrias",
    "Tratamento para cicatrizes", "Tratamento para secagem de vasos", "Depilação a laser",
    "Remoção de micropigmentação e tatuagem"
];

interface CancellationInfo {
    email: string | null;
    date: string | null;
}

const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: Date.now(),
      text: 'Olá! Bem-vindo(a) à Clínica Vehe. Como posso ajudar?',
      sender: 'bot',
      options: ['Agendar consulta', 'Cancelar consulta', 'Outras informações'],
    },
  ]);
  const [chatState, setChatState] = useState<ChatState>(ChatState.GREETING);
  const [appointment, setAppointment] = useState<Appointment>({ service: null, date: null, time: null, name: null, phone: null, email: null });
  const [cancellationInfo, setCancellationInfo] = useState<CancellationInfo>({ email: null, date: null });
  const [isWaiting, setIsWaiting] = useState(false);

  const addMessage = useCallback((text: string | React.ReactNode, sender: 'user' | 'bot', options?: string[]) => {
    setMessages((prev) => [...prev, { id: Date.now(), text, sender, options }]);
  }, []);

  const resetToGreeting = useCallback(() => {
    addMessage('Como posso ajudar agora?', 'bot', ['Agendar consulta', 'Cancelar consulta', 'Outras informações']);
    setChatState(ChatState.GREETING);
    setAppointment({ service: null, date: null, time: null, name: null, phone: null, email: null });
    setCancellationInfo({ email: null, date: null });
  }, [addMessage]);
  
  const handleUserInput = useCallback(async (userInput: string) => {
    setIsWaiting(true);
    await new Promise(res => setTimeout(res, 1000));

    switch (chatState) {
      case ChatState.GREETING:
        if (userInput.toLowerCase().includes('agendar')) {
          addMessage('Ótimo! Para qual categoria de serviço você gostaria de agendar?', 'bot', ['Odontologia', 'Estética']);
          setChatState(ChatState.SELECTING_MAIN_SERVICE);
        } else if (userInput.toLowerCase().includes('cancelar')) {
          addMessage('Entendido. Para cancelar sua consulta, por favor, informe o e-mail utilizado no agendamento.', 'bot');
          setChatState(ChatState.CANCELLING_GETTING_EMAIL);
        } else if (userInput.toLowerCase().includes('outras')) {
            addMessage('Sobre o que você gostaria de saber mais?', 'bot', ['Serviços de Odontologia', 'Serviços de Estética', 'Nossos Profissionais']);
            setChatState(ChatState.PROVIDING_INFO);
        } else {
          addMessage('Desculpe, não entendi. Por favor, escolha uma das opções.', 'bot', ['Agendar consulta', 'Cancelar consulta', 'Outras informações']);
        }
        break;

      // ... (casos de agendamento existentes) ...
      case ChatState.PROVIDING_INFO:
        if (userInput.toLowerCase().includes('odontologia')) {
            const serviceList = ODONTO_SERVICES.map(s => `• ${s}`).join('\n');
            const responseText = `Nossos serviços de Odontologia incluem:\n${serviceList}`;
            addMessage(React.createElement('div', {style: {whiteSpace: 'pre-line'}}, responseText), 'bot');
        } else if (userInput.toLowerCase().includes('estética')) {
             const facialList = ESTETICA_FACIAL_SERVICES.map(s => `• ${s}`).join('\n');
             const corporalList = ESTETICA_CORPORAL_SERVICES.map(s => `• ${s}`).join('\n');
             const responseText = `Nossos serviços de Estética se dividem em:\n\n**Estética Facial:**\n${facialList}\n\n**Estética Corporal:**\n${corporalList}`;
            addMessage(React.createElement('div', {style: {whiteSpace: 'pre-line'}}, responseText), 'bot');
        } else if (userInput.toLowerCase().includes('profissionais')) {
            const professionalsInfo = React.createElement(
                'div',
                null,
                React.createElement('p', { className: "mb-4 font-semibold" }, 'Contamos com um time de especialistas:'),
                React.createElement(
                    'div',
                    { className: "flex items-center mb-4" },
                    React.createElement('img', { 
                        src: 'https://raw.githubusercontent.com/Felipegon9im/img-repository/main/Barbara-1.jpeg', 
                        alt: 'Dra. Bárbara Veleda', 
                        className: "w-16 h-16 rounded-full mr-3 object-cover" 
                    }),
                    React.createElement(
                        'div',
                        null,
                        React.createElement('strong', { className: "block text-sm" }, 'Dra. Bárbara Veleda'),
                        React.createElement('p', { className: "text-xs" }, 'Doutora em Odontologia (com ênfase em Prótese Dentária), mestre em Odontologia (com ênfase em Dentística), especialista em Dentística (estética dental) e Ortodontia.')
                    )
                ),
                React.createElement(
                    'div',
                    { className: "flex items-center" },
                    React.createElement('img', { 
                        src: 'https://raw.githubusercontent.com/Felipegon9im/img-repository/main/Djuli-prof.jpg', 
                        alt: 'Dra. Djuli Hermes', 
                        className: "w-16 h-16 rounded-full mr-3 object-cover" 
                    }),
                    React.createElement(
                        'div',
                        null,
                        React.createElement('strong', { className: "block text-sm" }, 'Dra. Djuli Hermes'),
                        React.createElement('p', { className: "text-xs" }, 'Mestre em medicina, especialista em estética avançada e microbiologia clínica, biomédica habilitada em patologia clínica e em terapias integrativas à saúde.')
                    )
                )
            );
            addMessage(professionalsInfo, 'bot');
        }
        await new Promise(res => setTimeout(res, 1500));
        resetToGreeting();
        break;

      case ChatState.SELECTING_MAIN_SERVICE:
         if (userInput === 'Odontologia') {
            addMessage('Certo. Qual tratamento de odontologia você deseja agendar?', 'bot', ODONTO_SERVICES);
            setChatState(ChatState.SELECTING_SPECIFIC_TREATMENT);
        } else if (userInput === 'Estética') {
            addMessage('Entendido. A sua consulta é para estética facial ou corporal?', 'bot', ['Estética Facial', 'Estética Corporal']);
            setChatState(ChatState.SELECTING_ESTETICA_SUBCATEGORY);
        } else {
            addMessage('Opção inválida. Por favor, escolha entre Odontologia e Estética.', 'bot', ['Odontologia', 'Estética']);
        }
        break;
      
      case ChatState.SELECTING_ESTETICA_SUBCATEGORY:
         if (userInput === 'Estética Facial') {
            addMessage('Qual tratamento facial você gostaria de agendar?', 'bot', ESTETICA_FACIAL_SERVICES);
            setChatState(ChatState.SELECTING_SPECIFIC_TREATMENT);
        } else if (userInput === 'Estética Corporal') {
            addMessage('Qual tratamento corporal você gostaria de agendar?', 'bot', ESTETICA_CORPORAL_SERVICES);
            setChatState(ChatState.SELECTING_SPECIFIC_TREATMENT);
        } else {
             addMessage('Opção inválida. Por favor, escolha entre Estética Facial e Estética Corporal.', 'bot', ['Estética Facial', 'Estética Corporal']);
        }
        break;

      case ChatState.SELECTING_SPECIFIC_TREATMENT:
        setAppointment(prev => ({ ...prev, service: userInput }));
        try {
            addMessage(`Perfeito, agendando para "${userInput}". Buscando datas disponíveis...`, 'bot');
            await new Promise(res => setTimeout(res, 500));
            const dates = await getAvailableDates();
            if (dates.length > 0) {
                addMessage(`Estas são as próximas datas disponíveis. Qual você prefere?`, 'bot', dates);
                setChatState(ChatState.SELECTING_DATE);
            } else {
                addMessage('Desculpe, não há datas disponíveis no momento. Por favor, configure sua planilha ou tente novamente mais tarde.', 'bot');
                resetToGreeting();
            }
        } catch(error) {
            console.error("Error fetching dates:", error);
            addMessage('Ocorreu um erro ao buscar as datas. Verifique se a URL do script está configurada corretamente.', 'bot');
            resetToGreeting();
        }
        break;

      case ChatState.SELECTING_DATE:
        setAppointment(prev => ({ ...prev, date: userInput }));
        try {
            const slots = await getAvailableSlots(userInput);
            if (slots.length > 0) {
                addMessage('Ótimo! Agora escolha um dos horários disponíveis:', 'bot', slots);
                setChatState(ChatState.SELECTING_TIME);
            } else {
                addMessage('Ops! Parece que não há mais horários para esta data. Vamos tentar outra.', 'bot');
                 const newDates = await getAvailableDates();
                if (newDates.length > 0) {
                    addMessage('Estas são as datas ainda disponíveis:', 'bot', newDates);
                } else {
                    addMessage('Que pena, não temos mais nenhuma data disponível.', 'bot');
                    resetToGreeting();
                }
            }
        } catch(error) {
            addMessage('Ocorreu um erro ao buscar os horários. Vamos tentar de novo.', 'bot', ['Agendar consulta']);
            setChatState(ChatState.GREETING);
        }
        break;

      case ChatState.SELECTING_TIME:
        setAppointment(prev => ({ ...prev, time: userInput }));
        addMessage('Excelente! Para finalizar, por favor, informe seu nome completo.', 'bot');
        setChatState(ChatState.GETTING_NAME);
        break;

      case ChatState.GETTING_NAME:
        setAppointment(prev => ({ ...prev, name: userInput }));
        addMessage(`Obrigado, ${userInput}. Agora, por favor, digite seu WhatsApp com DDD (apenas números).`, 'bot');
        setChatState(ChatState.GETTING_PHONE);
        break;

      case ChatState.GETTING_PHONE:
        const phoneRegex = /^[0-9]{10,11}$/;
        if (!phoneRegex.test(userInput)) {
          addMessage('Número inválido. Por favor, insira seu WhatsApp com DDD, contendo 10 ou 11 números (ex: 48999998888).', 'bot');
          break;
        }
        setAppointment(prev => ({ ...prev, phone: userInput }));
        addMessage('Ótimo. Agora, por favor, digite seu melhor e-mail para enviarmos a confirmação.', 'bot');
        setChatState(ChatState.GETTING_EMAIL);
        break;
    
      case ChatState.GETTING_EMAIL:
         if (!userInput.includes('@') || !userInput.includes('.')) {
            addMessage('Parece que este e-mail não é válido. Por favor, tente novamente.', 'bot');
            break;
         }
        const currentAppointment = {...appointment, email: userInput };
        setAppointment(currentAppointment);
        addMessage(
            React.createElement('div', null,
                React.createElement('p', null, `Tudo certo! Por favor, confirme os detalhes do seu agendamento:`),
                React.createElement('ul', { className: "list-disc list-inside my-2" },
                    React.createElement('li', null, `Serviço: ${currentAppointment.service}`),
                    React.createElement('li', null, `Data: ${currentAppointment.date}`),
                    React.createElement('li', null, `Hora: ${currentAppointment.time}`),
                    React.createElement('li', null, `Nome: ${currentAppointment.name}`),
                    React.createElement('li', null, `WhatsApp: ${currentAppointment.phone}`),
                    React.createElement('li', null, `Email: ${currentAppointment.email}`)
                )
            ), 'bot', ['Confirmar', 'Cancelar']
        );
        setChatState(ChatState.CONFIRMING_DETAILS);
        break;

      case ChatState.CONFIRMING_DETAILS:
        if (userInput.toLowerCase() === 'confirmar' || userInput.toLowerCase() === 'tentar novamente') {
            addMessage('Confirmando seu agendamento, um momento...', 'bot');
            try {
              const success = await bookAppointment(appointment);
              if (success) {
                addMessage('Seu agendamento foi confirmado com sucesso! Enviamos um e-mail com os detalhes para você. Obrigado por escolher a Clínica Vehe.', 'bot');
                await new Promise(res => setTimeout(res, 2000));
                resetToGreeting();
              } else {
                 throw new Error("Falha ao agendar retornou 'false'.");
              }
            } catch (error) {
                 console.error("Booking error:", error);
                 addMessage('Desculpe, ocorreu um erro ao tentar confirmar seu agendamento. O que gostaria de fazer?', 'bot', ['Tentar novamente', 'Cancelar']);
            }
        } else {
            addMessage('Seu agendamento foi cancelado.', 'bot');
            resetToGreeting();
        }
        break;

      // --- Cancellation Flow ---
      case ChatState.CANCELLING_GETTING_EMAIL:
        if (!userInput.includes('@') || !userInput.includes('.')) {
          addMessage('Parece que este e-mail não é válido. Por favor, tente novamente.', 'bot');
          break;
        }
        setCancellationInfo(prev => ({ ...prev, email: userInput }));
        addMessage('Obrigado. Agora, por favor, informe a data da consulta que deseja cancelar (no formato DD/MM/AAAA).', 'bot');
        setChatState(ChatState.CANCELLING_GETTING_DATE);
        break;

      case ChatState.CANCELLING_GETTING_DATE:
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        if (!dateRegex.test(userInput)) {
          addMessage('Formato de data inválido. Por favor, use DD/MM/AAAA (ex: 25/12/2024).', 'bot');
          break;
        }
        const currentCancellation = { ...cancellationInfo, date: userInput };
        setCancellationInfo(currentCancellation);
        addMessage(
          `Você deseja cancelar a consulta agendada para ${currentCancellation.date} com o e-mail ${currentCancellation.email}?`,
          'bot',
          ['Sim, cancelar', 'Não']
        );
        setChatState(ChatState.CANCELLING_CONFIRMING);
        break;

      case ChatState.CANCELLING_CONFIRMING:
        if (userInput.toLowerCase().includes('sim')) {
          addMessage('Processando o cancelamento, por favor aguarde...', 'bot');
          try {
            const success = await cancelAppointment(cancellationInfo as {email: string, date: string});
            if (success) {
              addMessage('Sua consulta foi cancelada com sucesso. Enviamos uma confirmação para o seu e-mail.', 'bot');
            } else {
              throw new Error("API retornou 'false' para o cancelamento.");
            }
          } catch (error: any) {
            console.error("Cancellation error:", error);
            addMessage(error.message || 'Não foi possível encontrar uma consulta com os dados informados. Verifique se o e-mail e a data estão corretos.', 'bot');
          }
        } else {
          addMessage('O cancelamento foi abortado.', 'bot');
        }
        resetToGreeting();
        break;

      default:
        resetToGreeting();
        break;
    }

    setIsWaiting(false);
  }, [chatState, addMessage, appointment, cancellationInfo, resetToGreeting]);

  const sendMessage = (text: string) => {
    if (text.trim() === '' || isWaiting) return;
    addMessage(text, 'user');
  };

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.sender === 'user') {
      handleUserInput(lastMessage.text as string);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages, handleUserInput]);

  return { messages, sendMessage, isWaiting };
};

export default useChat;