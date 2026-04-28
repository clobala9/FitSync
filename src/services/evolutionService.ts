import { EvolutionSheet } from '../types';
import { GoogleGenAI } from "@google/genai";

export async function generateEvolutionSuggestions(evolution: EvolutionSheet): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY as string;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is missing!");
    return "Continue focado no seu processo. A constância é a chave para o resultado!";
  }
  const ai = new GoogleGenAI({ apiKey });
  const prompt = `
    Você é um especialista em acompanhamento físico e evolução corporal.
    Sua tarefa é dar uma sugestão motivacional curta e técnica baseada no progresso do usuário abaixo.

    DADOS DO USUÁRIO:
    - Nome: ${evolution.usuario.nome}
    - Objetivo: ${evolution.usuario.objetivo}
    - Peso Atual: ${evolution.progresso.peso[evolution.progresso.peso.length - 1]?.valor || 'N/A'} kg
    - Meta: ${evolution.metas.peso_objetivo} kg

    HISTÓRICO DE PESO:
    ${evolution.progresso.peso.map(p => `- ${p.data}: ${p.valor}kg`).join('\n')}

    ULTIMAS MEDIDAS:
    ${evolution.progresso.medidas[evolution.progresso.medidas.length - 1] ? JSON.stringify(evolution.progresso.medidas[evolution.progresso.medidas.length - 1]) : 'N/A'}

    REGRAS:
    - Responda apenas com a sugestão curta (máximo 2 frases).
    - Seja motivacional e profissional.
    - Se não houver dados suficientes, incentive o primeiro registro.
    - Fale em Português.
  `;

  try {
    const result = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: prompt
    });
    return (result as any).text || "Continue focado no seu processo. A constância é a chave para o resultado!";
  } catch (error) {
    console.error("Erro ao gerar sugestões:", error);
    return "Continue focado no seu processo. A constância é a chave para o resultado!";
  }
}
