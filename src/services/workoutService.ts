import { GoogleGenAI, Type } from "@google/genai";
import { User, WorkoutPlanSheet } from "../types";

export async function generateWorkoutPlan(user: User): Promise<WorkoutPlanSheet> {
  const apiKey = process.env.GEMINI_API_KEY as string;
  
  // Se não houver chave de API, vamos usar o gerador offline (Fallback)
  if (!apiKey) {
    console.warn("GEMINI_API_KEY is missing! Using offline fallback generator.");
    return generateFallbackPlan(user);
  }

  const ai = new GoogleGenAI({ apiKey });
  const prompt = `
    Você é um personal trainer profissional especializado em musculação, hipertrofia e emagrecimento.
    Gerar uma ficha de treino de academia personalizada com base nos dados do usuário abaixo em formato JSON.

    DADOS DO USUÁRIO:
    - Nome: ${user.name}
    - Idade: ${user.age}
    - Peso: ${user.weight}kg
    - Altura: ${user.height}cm
    - Nível: ${user.level}
    - Objetivo: ${user.goal}
    - Dias de treino por semana: ${user.trainingDays}
    - Tempo disponível por treino: ${user.availableTime} minutos
    - Possui lesões? ${user.injuries || 'Não'}

    REGRAS PARA CRIAÇÃO:
    1. Escolha automaticamente a melhor divisão de treino (Full Body, ABC, ABCD, etc.)
    2. Monte treinos equilibrados por grupo muscular
    3. Priorize exercícios compostos no início
    4. Adapte intensidade ao nível do usuário
    5. Evite exercícios que possam agravar lesões
    6. Inclua progressão básica de carga
    7. Máximo de 6 a 8 exercícios por treino
    8. Descanso entre 45s e 120s
    9. Repetições baseadas no objetivo:
       - Hipertrofia: 8–12
       - Emagrecimento: 12–15
       - Força: 4–8
    10. O campo 'dia' DEVE ser preenchido com o nome por extenso do dia da semana (ex: 'Segunda-feira', 'Terça-feira', etc.), distribuindo os treinos exatamente nos ${user.trainingDays} dias informados.

    O formato da resposta DEVE ser estritamente JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            tipo_treino: { type: Type.STRING },
            objetivo: { type: Type.STRING },
            dias: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  dia: { type: Type.STRING },
                  foco: { type: Type.STRING },
                  exercicios: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        nome: { type: Type.STRING },
                        grupo_muscular: { type: Type.STRING },
                        series: { type: Type.STRING },
                        repeticoes: { type: Type.STRING },
                        descanso: { type: Type.STRING },
                        tipo: { 
                          type: Type.STRING,
                          enum: ["composto", "isolado"]
                        }
                      },
                      required: ["nome", "grupo_muscular", "series", "repeticoes", "descanso", "tipo"]
                    }
                  }
                },
                required: ["dia", "foco", "exercicios"]
              }
            },
            observacoes: { type: Type.STRING }
          },
          required: ["tipo_treino", "objetivo", "dias", "observacoes"]
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    return result as WorkoutPlanSheet;
  } catch (error) {
    console.error("Error generating workout plan:", error);
    // Em caso de erro na IA, retorna o plano offline
    return generateFallbackPlan(user);
  }
}

function generateFallbackPlan(user: User): WorkoutPlanSheet {
  const reps = user.goal === 'hipertrofia' ? '8 a 12' : user.goal === 'emagrecimento' ? '15 a 20' : '10 a 15';
  const rest = user.goal === 'hipertrofia' ? '90s' : user.goal === 'emagrecimento' ? '45s' : '60s';
  
  const objetivoFormatado = user.goal === 'hipertrofia' ? 'Ganho de Massa Muscular' : user.goal === 'emagrecimento' ? 'Perda de Gordura e Condicionamento' : 'Definição e Resistência';

  // Mapeamento de dias com base na quantidade escolhida
  const daysMap: Record<number, string[]> = {
    1: ["Segunda-feira"],
    2: ["Terça-feira", "Quinta-feira"],
    3: ["Segunda-feira", "Quarta-feira", "Sexta-feira"],
    4: ["Segunda-feira", "Terça-feira", "Quinta-feira", "Sexta-feira"],
    5: ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira"],
    6: ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"],
    7: ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"]
  };

  const selectedDays = daysMap[user.trainingDays] || daysMap[3];
  
  const workoutTemplates = [
    {
      foco: "Peito, Ombro e Tríceps",
      exercicios: [
        { nome: "Supino Reto com Barra", grupo_muscular: "Peito", series: "4", repeticoes: reps, descanso: rest, tipo: "composto" },
        { nome: "Supino Inclinado com Halteres", grupo_muscular: "Peito", series: "3", repeticoes: reps, descanso: rest, tipo: "composto" },
        { nome: "Crucifixo na Máquina", grupo_muscular: "Peito", series: "3", repeticoes: reps, descanso: rest, tipo: "isolado" },
        { nome: "Desenvolvimento com Halteres", grupo_muscular: "Ombro", series: "3", repeticoes: reps, descanso: rest, tipo: "composto" },
        { nome: "Elevação Lateral", grupo_muscular: "Ombro", series: "4", repeticoes: reps, descanso: rest, tipo: "isolado" },
        { nome: "Tríceps Corda na Polia", grupo_muscular: "Tríceps", series: "4", repeticoes: reps, descanso: rest, tipo: "isolado" }
      ]
    },
    {
      foco: "Costas, Bíceps e Abdômen",
      exercicios: [
        { nome: "Puxada Frontal Aberta", grupo_muscular: "Costas", series: "4", repeticoes: reps, descanso: rest, tipo: "composto" },
        { nome: "Remada Curvada com Barra", grupo_muscular: "Costas", series: "3", repeticoes: reps, descanso: rest, tipo: "composto" },
        { nome: "Remada Baixa Triângulo", grupo_muscular: "Costas", series: "3", repeticoes: reps, descanso: rest, tipo: "composto" },
        { nome: "Rosca Direta com Barra", grupo_muscular: "Bíceps", series: "4", repeticoes: reps, descanso: rest, tipo: "isolado" },
        { nome: "Rosca Martelo com Halteres", grupo_muscular: "Bíceps", series: "3", repeticoes: reps, descanso: rest, tipo: "isolado" },
        { nome: "Abdominal Supra no Solo", grupo_muscular: "Abdômen", series: "4", repeticoes: "20", descanso: "45s", tipo: "isolado" }
      ]
    },
    {
      foco: "Pernas Completas e Panturrilha",
      exercicios: [
        { nome: "Agachamento Livre", grupo_muscular: "Pernas", series: "4", repeticoes: reps, descanso: "120s", tipo: "composto" },
        { nome: "Leg Press 45º", grupo_muscular: "Pernas", series: "4", repeticoes: reps, descanso: "90s", tipo: "composto" },
        { nome: "Cadeira Extensora", grupo_muscular: "Pernas", series: "3", repeticoes: "15", descanso: rest, tipo: "isolado" },
        { nome: "Mesa Flexora", grupo_muscular: "Pernas", series: "3", repeticoes: "15", descanso: rest, tipo: "isolado" },
        { nome: "Cadeira Abdutora", grupo_muscular: "Pernas", series: "3", repeticoes: "15", descanso: rest, tipo: "isolado" },
        { nome: "Panturrilha no Leg Press", grupo_muscular: "Panturrilha", series: "4", repeticoes: "20", descanso: "45s", tipo: "isolado" }
      ]
    }
  ];

  const diasProcessados = selectedDays.map((diaNome, index) => {
    const template = workoutTemplates[index % workoutTemplates.length];
    return {
      dia: diaNome,
      foco: template.foco,
      exercicios: template.exercicios
    };
  });

  return {
    tipo_treino: user.trainingDays >= 5 ? 'Treino ABCDE' : user.trainingDays === 4 ? 'Treino ABCD' : 'Treino ABC',
    objetivo: objetivoFormatado,
    dias: diasProcessados,
    observacoes: `Treino offline gerado para ${user.name}. Distribuído em ${user.trainingDays} dias da semana.`
  };
}
