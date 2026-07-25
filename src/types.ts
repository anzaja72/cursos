export interface Lead {
  id: string;
  ticketNumber: string;
  fullName: string;
  email: string;
  whatsapp: string;
  businessType: string;
  commitmentLevel: '100%' | 'Alto' | 'Curioso';
  createdAt: string;
  status: 'pending' | 'winner_full' | 'offered_partial' | 'accepted_partial' | 'rejected';
  score?: number;
}

export interface GiveawayConfig {
  title: string;
  programValueUsd: number;
  totalSeats: number;
  registeredSeats: number;
  drawDate: string; // ISO date or formatted
  endDateMs: number;
  partialDiscountPercent: number;
  heroBgImage: string;
}

export interface ApplicationFormData {
  fullName: string;
  email: string;
  whatsapp: string;
  businessType: string;
  commitmentLevel: '100%' | 'Alto' | 'Curioso';
  acceptedTerms: boolean;
}
