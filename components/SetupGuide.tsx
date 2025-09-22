import React, { useState } from 'react';
import { APPS_SCRIPT_URL, PLACEHOLDER_URL } from '../services/googleSheetsService';

const SetupGuide: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);

    // Corrigido: Verifica a URL importada para determinar se o app está configurado.
    const isConfigured = !APPS_SCRIPT_URL.includes(PLACEHOLDER_URL);

    if (!isOpen || isConfigured) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-[#005E54]">Configuração: Conectar com Google Sheets</h2>
                    <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
                </div>
                <p className="mb-6 text-gray-700">
                    Este chatbot precisa se conectar a uma planilha Google para funcionar. Siga os passos abaixo para configurar a integração.
                    É um processo único que leva cerca de 5 minutos.
                </p>

                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Passo 1: Preparar sua Planilha Google</h3>
                        <ol className="list-decimal list-inside space-y-2 pl-4 text-gray-600">
                            <li>Crie uma nova Planilha em <a href="https://sheets.new" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">sheets.new</a>.</li>
                            <li>Renomeie a primeira página (aba) para <code className="bg-gray-200 px-1 rounded">Agendamentos</code>.</li>
                            <li>Crie uma segunda página clicando no '+' e renomeie-a para <code className="bg-gray-200 px-1 rounded">Config</code>.</li>
                            <li>Na página <strong>Agendamentos</strong>, defina os cabeçalhos: <code className="bg-gray-200 px-1 rounded">A1: Data</code>, <code className="bg-gray-200 px-1 rounded">B1: Hora</code>, <code className="bg-gray-200 px-1 rounded">C1: Nome</code>, <code className="bg-gray-200 px-1 rounded">D1: Serviço</code>, <code className="bg-gray-200 px-1 rounded">E1: Email</code>, e <code className="bg-red-100 px-1 rounded font-bold">F1: WhatsApp</code>.</li>
                            <li>Na página <strong>Config</strong>:
                                <ul className="list-disc list-inside pl-6 mt-1">
                                    <li>Em <code className="bg-gray-200 px-1 rounded">A1</code>, escreva <code className="bg-gray-200 px-1 rounded">Horários</code>. Abaixo (A2, A3...), liste os horários que você oferece (ex: 09:00, 10:00).</li>
                                    <li>Em <code className="bg-gray-200 px-1 rounded">B1</code>, escreva <code className="bg-gray-200 px-1 rounded">Email Proprietário</code>.</li>
                                    <li>Em <code className="bg-gray-200 px-1 rounded">B2</code>, insira o seu e-mail para receber as notificações de agendamento.</li>
                                </ul>
                            </li>
                        </ol>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Passo 2: Criar e Implantar o Script</h3>
                         <ol className="list-decimal list-inside space-y-2 pl-4 text-gray-600">
                            <li>Na sua planilha, vá em <code className="bg-gray-200 px-1 rounded">Extensões &gt; Apps Script</code>.</li>
                            <li>Apague o código de exemplo e cole o código do script fornecido (veja o arquivo <code className="bg-gray-200 px-1 rounded">google-apps-script.js.txt</code>).</li>
                            <li>Clique no ícone de <strong>Salvar</strong>.</li>
                            <li>Clique no botão azul <code className="bg-blue-100 px-1 rounded">Implantar</code> e selecione <code className="bg-gray-200 px-1 rounded">Nova implantação</code> (ou "Gerenciar implantações" se já houver uma).</li>
                            <li>Ao (re)implantar, o Google pedirá uma <strong className="text-red-600">nova autorização para "enviar e-mails como você"</strong> se for a primeira vez. É crucial que você aprove.</li>
                             <li>Após a implantação, copie a <strong>URL do app da Web</strong>.</li>
                        </ol>
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Passo 3: Conectar o Chatbot</h3>
                        <p className="text-gray-600">
                           Abra o arquivo <code className="bg-gray-200 px-1 rounded">services/googleSheetsService.ts</code> no editor de código e cole a URL na constante <code className="bg-gray-200 px-1 rounded">APPS_SCRIPT_URL</code>.
                        </p>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <button onClick={() => setIsOpen(false)} className="bg-[#005E54] text-white font-bold py-2 px-6 rounded-lg hover:bg-[#004A43] transition-colors">
                        Entendi, fechar instruções
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SetupGuide;