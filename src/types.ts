/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface User {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
  description: string;
  weight: number;
  height: number;
  age: number;
  goal: 'emagrecimento' | 'definicao' | 'hipertrofia';
  level: 'iniciante' | 'intermediario' | 'avancado';
  trainingDays: number;
  availableTime: number; // in minutes
  injuries: string;
  onboardingComplete: boolean;
  isAtGym: boolean;
  completedDays: number[];
  completedNutritionDays: number[];
}

export interface WorkoutPlanSheet {
  tipo_treino: string;
  objetivo: string;
  dias: {
    dia: string;
    foco: string;
    exercicios: {
      nome: string;
      grupo_muscular: string;
      series: string;
      repeticoes: string;
      descanso: string;
      tipo: string;
    }[];
  }[];
  observacoes: string;
}

export interface Exercise {
  id: string;
  name: string;
  series: number;
  reps: string;
  rest: number; // seconds
  videoUrl: string;
  category: 'A' | 'B' | 'C';
  objective: 'emagrecimento' | 'definicao' | 'hipertrofia';
  dayOfWeek?: number; // 0 (Sunday) to 6 (Saturday)
}

export interface Meal {
  id: string;
  name: string;
  calories: number;
  description: string;
  recipe: string;
  imageUrl: string;
  time: string;
  objective: 'emagrecimento' | 'definicao' | 'hipertrofia';
  dayOfWeek?: number; // 0 (Sunday) to 6 (Saturday)
}

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  userPhoto: string;
  text: string;
  timestamp: number;
  likes: number;
  type: 'text' | 'image' | 'video';
  mediaUrl?: string;
}

export interface ChatGroup {
  id: string;
  name: string;
  messages: ChatMessage[];
  ranking: { userId: string; score: number }[];
}

export interface WeightEntry {
  data: string;
  valor: number;
}

export interface PhotoEntry {
  data: string;
  url: string;
  descricao: string;
}

export interface MeasurementsEntry {
  data: string;
  braco: number;
  peito: number;
  cintura: number;
  perna: number;
}

export interface EvolutionSheet {
  usuario: {
    nome: string;
    idade: number;
    altura: number;
    objetivo: string;
  };
  progresso: {
    peso: WeightEntry[];
    fotos: PhotoEntry[];
    medidas: MeasurementsEntry[];
  };
  metas: {
    peso_objetivo: number;
    prazo: string;
  };
  observacoes: string;
  sugestoes_automaticas: string;
}

export interface NutritionPlanSheet {
  tipo_dieta: string;
  objetivo: string;
  dias: {
    dia: string;
    refeicoes: {
      horario: string;
      nome: string;
      descricao: string;
      kcal: number;
      macros: {
        proteina: string;
        carboidrato: string;
        gordura: string;
      };
    }[];
  }[];
  observacoes: string;
}
