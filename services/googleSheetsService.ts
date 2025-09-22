import type { Appointment } from '../types';

// !!! IMPORTANTE !!!
// A URL abaixo foi atualizada com a nova versão de produção (/exec) do seu script.
// FIX: Export APPS_SCRIPT_URL to make it accessible to other modules.
export const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxBCIVLObCGArjO-5r19ac90VuOz9BnP0tcB-U-nhQEiQrI9QF5ki8XP8lxT9cCYfZtEw/exec';

// Placeholder para verificar se a URL foi alterada.
// FIX: Export PLACEHOLDER_URL to make it accessible to other modules.
export const PLACEHOLDER_URL = 'COLE_A_URL_DO_SEU_APP_DA_WEB_AQUI';


async function handleApiResponse(response: Response) {
  if (!response.ok) {
    throw new Error(`Erro de rede: ${response.statusText}`);
  }
  const result = await response.json();
  if (!result.success) {
    throw new Error(result.error || 'Ocorreu um erro na API do Google Sheets.');
  }
  return result.data;
}

async function handleActionResponse(response: Response): Promise<boolean> {
    if (!response.ok) {
        throw new Error(`Erro de rede: ${response.statusText}`);
    }
    const resultText = await response.text();
    const result = JSON.parse(resultText);

    if (!result.success) {
        throw new Error(result.error || 'A operação falhou no script.');
    }
    return result.success;
}

export const getAvailableDates = async (): Promise<string[]> => {
  if (APPS_SCRIPT_URL.includes(PLACEHOLDER_URL)) {
      console.warn("URL do Google Apps Script não configurada.");
      return Promise.resolve([]); // Retorna array vazio se não configurado
  }
  const response = await fetch(`${APPS_SCRIPT_URL}?action=getAvailableDates`);
  return handleApiResponse(response);
};

export const getAvailableSlots = async (date: string): Promise<string[]> => {
    if (APPS_SCRIPT_URL.includes(PLACEHOLDER_URL)) {
      console.warn("URL do Google Apps Script não configurada.");
      return Promise.resolve([]);
  }
  const response = await fetch(`${APPS_SCRIPT_URL}?action=getAvailableSlots&date=${encodeURIComponent(date)}`);
  return handleApiResponse(response);
};

export const bookAppointment = async (appointmentDetails: Appointment): Promise<boolean> => {
    if (APPS_SCRIPT_URL.includes(PLACEHOLDER_URL)) {
      console.warn("URL do Google Apps Script não configurada.");
      return Promise.resolve(false);
  }
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8', 
      },
      body: JSON.stringify({
        action: 'bookAppointment',
        appointment: appointmentDetails,
      }),
    });
    return handleActionResponse(response);
};

export const cancelAppointment = async (details: { email: string; date: string }): Promise<boolean> => {
    if (APPS_SCRIPT_URL.includes(PLACEHOLDER_URL)) {
      console.warn("URL do Google Apps Script não configurada.");
      return Promise.resolve(false);
    }
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({
        action: 'cancelAppointment',
        details: details,
      }),
    });
    return handleActionResponse(response);
};