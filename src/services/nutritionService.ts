import { GoogleGenerativeAI } from "@google/generative-ai";
import { User, NutritionPlanSheet } from "../types";

export async function generateNutritionPlan(user: User): Promise<NutritionPlanSheet> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string;
  
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    console.warn("GEMINI_API_KEY is missing or not set! Using offline fallback nutrition generator.");
    return generateFallbackNutritionPlan(user);
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
    }
  });

  const prompt = `
    Você é um nutricionista esportivo profissional especializado em hipertrofia, emagrecimento e performance.
    Gere uma planilha alimentar personalizada com base nos dados do usuário abaixo em formato JSON.

    DADOS DO USUÁRIO:
    - Nome: ${user.name}
    - Idade: ${user.age}
    - Peso: ${user.weight}kg
    - Altura: ${user.height}cm
    - Nível de Atividade: ${user.level}
    - Objetivo: ${user.goal}
    - Frequência de Treino: ${user.trainingDays} dias/semana
    - Possui lesões/restrições? ${user.injuries || 'Não'}

    REGRAS PARA CRIAÇÃO:
    1. Calcule o gasto energético total aproximado e adapte as calorias ao objetivo (Déficit para emagrecimento, Superávit para hipertrofia).
    2. Monte refeições equilibradas (Proteínas, Carboidratos e Gorduras).
    3. Sugira alimentos acessíveis e saudáveis.
    4. Inclua 4 a 6 refeições por dia.
    5. O campo 'dia' DEVE ser preenchido com o nome por extenso do dia da semana (ex: 'Segunda-feira', etc.). Gere para os 7 dias da semana.
    6. Forneça macros (proteína, carboidrato, gordura) por refeição em gramas ou descrição clara.

    O formato da resposta DEVE ser estritamente JSON seguindo este esquema:
    {
      "tipo_dieta": string,
      "objetivo": string,
      "dias": [
        {
          "dia": string,
          "refeicoes": [
            {
              "horario": string,
              "nome": string,
              "descricao": string,
              "kcal": number,
              "macros": {
                "proteina": string,
                "carboidrato": string,
                "gordura": string
              }
            }
          ]
        }
      ],
      "observacoes": string
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const nutritionPlan = JSON.parse(text);
    return nutritionPlan as NutritionPlanSheet;
  } catch (error) {
    console.error("Error generating nutrition plan:", error);
    return generateFallbackNutritionPlan(user);
  }
}

function generateFallbackNutritionPlan(user: User): NutritionPlanSheet {
  const isHipertrofia = user.goal === 'hipertrofia';
  const goalText = isHipertrofia ? 'Bulking Limpo' : user.goal === 'emagrecimento' ? 'Déficit Calórico' : 'Manutenção e Definição';
  
  const diasSemana = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"];
  
  const refeicoesTemplate = [
    {
      horario: "08:00",
      nome: "Café da Manhã",
      descricao: isHipertrofia ? "4 ovos, 60g de aveia, 1 banana" : "2 ovos, 30g de aveia, 1 fruta",
      kcal: isHipertrofia ? 600 : 350,
      macros: { proteina: "30g", carboidrato: "60g", gordura: "20g" }
    },
    {
      horario: "12:00",
      nome: "Almoço",
      descricao: isHipertrofia ? "200g de frango, 250g de arroz, legumes" : "150g de frango, 100g de arroz, muita salada",
      kcal: isHipertrofia ? 800 : 450,
      macros: { proteina: "45g", carboidrato: "80g", gordura: "15g" }
    },
    {
      horario: "16:00",
      nome: "Lanche da Tarde",
      descricao: "Iogurte natural, 30g de castanhas, 1 dose de whey (opcional)",
      kcal: 300,
      macros: { proteina: "25g", carboidrato: "15g", gordura: "15g" }
    },
    {
      horario: "20:00",
      nome: "Jantar",
      descricao: isHipertrofia ? "150g de carne moída, 200g de batata doce" : "150g de peixe, 100g de batata doce, legumes",
      kcal: isHipertrofia ? 700 : 400,
      macros: { proteina: "35g", carboidrato: "50g", gordura: "15g" }
    }
  ];

  const dias = diasSemana.map(dia => ({
    dia,
    refeicoes: refeicoesTemplate
  }));

  return {
    tipo_dieta: isHipertrofia ? 'Dieta Hipercalórica' : 'Dieta Hipocalórica',
    objetivo: goalText,
    dias,
    observacoes: "Plano offline gerado como fallback. Consulte um nutricionista para ajustes finos."
  };
}
