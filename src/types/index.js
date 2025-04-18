// filepath: /buscador-vehiculos/buscador-vehiculos/src/types/index.js
export interface SearchFormData {
  keywords?: string;
  brand?: string;
  model?: string;
  body_type?: string;
  engine?: string;
  gearbox?: string;
  min_year?: number;
  max_year?: number;
  min_sale_price?: number;
  max_sale_price?: number;
  min_horse_power?: number;
  max_horse_power?: number;
  min_num_doors?: number;
  max_num_doors?: number;
  min_seats?: number;
  max_seats?: number;
  max_km?: number;
  professional?: boolean;
  longitude?: number;
  latitude?: number;
  filters_source?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
}