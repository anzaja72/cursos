import { Lead } from '../types';

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-1',
    ticketNumber: 'BECA-IA-9401',
    fullName: 'Carlos Mendoza',
    email: 'carlos.mendoza@agenciamedia.co',
    whatsapp: '+52 55 1234 5678',
    businessType: 'Dueño de Agencia de Marketing',
    commitmentLevel: '100%',
    createdAt: '2026-07-24T10:15:00Z',
    status: 'pending',
    score: 98
  },
  {
    id: 'lead-2',
    ticketNumber: 'BECA-IA-9402',
    fullName: 'Sofía Ramirez',
    email: 'sofia.growth@gmail.com',
    whatsapp: '+57 300 987 6543',
    businessType: 'Emprendedor Digital / E-commerce',
    commitmentLevel: '100%',
    createdAt: '2026-07-24T11:20:00Z',
    status: 'pending',
    score: 95
  },
  {
    id: 'lead-3',
    ticketNumber: 'BECA-IA-9403',
    fullName: 'Mateo Fernández',
    email: 'mateo@creativestudio.es',
    whatsapp: '+34 612 345 678',
    businessType: 'Creador de Contenido / CapCut Specialist',
    commitmentLevel: 'Alto',
    createdAt: '2026-07-24T12:05:00Z',
    status: 'pending',
    score: 89
  },
  {
    id: 'lead-4',
    ticketNumber: 'BECA-IA-9404',
    fullName: 'Valeria Gómez',
    email: 'valeria.consulting@outlook.com',
    whatsapp: '+54 9 11 4433 2211',
    businessType: 'Consultora de Infoproductos',
    commitmentLevel: '100%',
    createdAt: '2026-07-24T13:40:00Z',
    status: 'pending',
    score: 92
  },
  {
    id: 'lead-5',
    ticketNumber: 'BECA-IA-9405',
    fullName: 'Diego Herrera',
    email: 'diego@funnelmasters.io',
    whatsapp: '+51 987 654 321',
    businessType: 'Trafficker & Media Buyer',
    commitmentLevel: '100%',
    createdAt: '2026-07-24T14:10:00Z',
    status: 'pending',
    score: 96
  }
];
