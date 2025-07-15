import { Activity, Heart, Eye, Stethoscope, Brain, ClipboardCheck, Dumbbell, Users, HelpCircle, Palette } from 'lucide-react';

export const STATIONS = [
  { 
    id: 'inbody', 
    name: 'Inbody állomás', 
    icon: Activity, 
    color: 'bg-blue-500' 
  },
  { 
    id: 'red', 
    name: 'Piros állomás', 
    icon: Heart, 
    color: 'bg-red-500' 
  },
  { 
    id: 'white', 
    name: 'Fehér állomás', 
    icon: ClipboardCheck, 
    color: 'bg-gray-400' 
  },
  { 
    id: 'green', 
    name: 'Zöld állomás', 
    icon: Palette, 
    color: 'bg-green-500' 
  },
  { 
    id: 'dietetics', 
    name: 'Dietetika', 
    icon: ClipboardCheck, 
    color: 'bg-orange-500' 
  },
  { 
    id: 'assessment', 
    name: 'Állapotfelmérés', 
    icon: Brain, 
    color: 'bg-purple-500' 
  },
  { 
    id: 'movement', 
    name: 'Mozgás tanácsadás', 
    icon: Dumbbell, 
    color: 'bg-indigo-500' 
  },
  { 
    id: 'physiotherapy', 
    name: 'Gyógytorna', 
    icon: Users, 
    color: 'bg-teal-500' 
  },
  { 
    id: 'dentistry', 
    name: 'Fogászat', 
    icon: HelpCircle, 
    color: 'bg-cyan-500' 
  },
  { 
    id: 'dermatology', 
    name: 'Bőrgyógyászat', 
    icon: Stethoscope, 
    color: 'bg-pink-500' 
  }
];

export const PATIENT_STATUS = {
  WAITING: 'waiting',
  CALLED: 'called',
  COMPLETED: 'completed'
};

export const VIEW_TYPES = {
  PATIENT: 'patient',
  ADMIN: 'admin',
  DISPLAY: 'display'
};