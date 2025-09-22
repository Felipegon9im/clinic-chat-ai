export interface Message {
  id: number;
  text: string | React.ReactNode;
  sender: 'user' | 'bot';
  options?: string[];
}

export enum ChatState {
  GREETING,
  SELECTING_MAIN_SERVICE, // Odonto vs Estética
  SELECTING_ESTETICA_SUBCATEGORY, // Facial vs Corporal
  SELECTING_SPECIFIC_TREATMENT, // O tratamento final
  SELECTING_DATE,
  SELECTING_TIME,
  GETTING_NAME,
  GETTING_PHONE,
  GETTING_EMAIL,
  CONFIRMING_DETAILS,
  PROVIDING_INFO,
  FINALIZED,
  ERROR,
  
  // Cancellation States
  CANCELLING_GETTING_EMAIL,
  CANCELLING_GETTING_DATE,
  CANCELLING_CONFIRMING,
}

export interface Appointment {
  service: string | null;
  date: string | null;
  time: string | null;
  name: string | null;
  phone: string | null;
  email: string | null;
}