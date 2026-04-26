import { Exercise, Meal } from './types';

export const MOCK_EXERCISES: Exercise[] = [
  // --- Emagrecimento (Weight Loss) Plan ---
  // Monday (1): Pernas + Cardio
  { id: 'e1_1', name: 'Agachamento', series: 3, reps: '12', rest: 60, videoUrl: 'https://youtu.be/Eo4EZK3UD98?si=YB2WuT44UJJG-9qr', category: 'A', objective: 'emagrecimento', dayOfWeek: 1 },
  { id: 'e1_2', name: 'Leg press', series: 3, reps: '12', rest: 60, videoUrl: 'https://youtu.be/5sQ0HrXwrjU?si=9bzY5lhp4KwwyKwa', category: 'A', objective: 'emagrecimento', dayOfWeek: 1 },
  { id: 'e1_3', name: 'Afundo', series: 3, reps: '10 cada perna', rest: 60, videoUrl: 'https://youtu.be/-oIl0YJGf9c?si=GujXCVbXhMu8Znum', category: 'A', objective: 'emagrecimento', dayOfWeek: 1 },
  { id: 'e1_4', name: 'Stiff', series: 3, reps: '12', rest: 60, videoUrl: 'https://youtu.be/_6ElJLyBXcE?si=z31cXCYAWM9qO4qQ', category: 'A', objective: 'emagrecimento', dayOfWeek: 1 },
  { id: 'e1_5', name: 'Panturrilha', series: 3, reps: '15', rest: 45, videoUrl: 'https://youtu.be/xIq9K_oeTK4?si=aBuTz0qwIQNND1Ei', category: 'A', objective: 'emagrecimento', dayOfWeek: 1 },
  { id: 'e1_6', name: '🚴 Cardio: Corrida leve ou bike', series: 1, reps: '20 min', rest: 0, videoUrl: 'https://player.vimeo.com/external/371433846.sd.mp4?s=231560ad12315cf2108ec2f1d01223bc983b45f2&profile_id=139&oauth2_token_id=57447761', category: 'A', objective: 'emagrecimento', dayOfWeek: 1 },

  // Tuesday (2): Peito + Tríceps + HIIT
  { id: 'e2_1', name: 'Supino reto', series: 3, reps: '10', rest: 60, videoUrl: 'https://youtu.be/-iRqhXSx15M?si=3cIJagifJzfK4xhY', category: 'A', objective: 'emagrecimento', dayOfWeek: 2 },
  { id: 'e2_2', name: 'Supino inclinado', series: 3, reps: '10', rest: 60, videoUrl: 'https://youtu.be/-iRqhXSx15M?si=3cIJagifJzfK4xhY', category: 'A', objective: 'emagrecimento', dayOfWeek: 2 },
  { id: 'e2_3', name: 'Tríceps corda', series: 3, reps: '12', rest: 45, videoUrl: 'https://youtu.be/btj6dDfAQ2w?si=48pJqjBG4_gNDBhj', category: 'A', objective: 'emagrecimento', dayOfWeek: 2 },
  { id: 'e2_4', name: 'Mergulho (banco)', series: 3, reps: 'Até falhar', rest: 60, videoUrl: 'https://youtu.be/UGxwkr52YLM?si=Cu5UfZNtOc_ri8vl', category: 'A', objective: 'emagrecimento', dayOfWeek: 2 },
  { id: 'e2_5', name: '🔥 HIIT: 30s corrida forte + 30s caminhada', series: 15, reps: '15 min', rest: 30, videoUrl: 'https://youtu.be/6OeWGBaVzAU?si=PyohyQnujJlYaVmF', category: 'A', objective: 'emagrecimento', dayOfWeek: 2 },

  // Wednesday (3): Cardio + Abdômen
  { id: 'e3_1', name: '🏃 Cardio contínuo', series: 1, reps: '30–40 min', rest: 0, videoUrl: 'https://player.vimeo.com/external/371433846.sd.mp4?s=231560ad12315cf2108ec2f1d01223bc983b45f2&profile_id=139&oauth2_token_id=57447761', category: 'A', objective: 'emagrecimento', dayOfWeek: 3 },
  { id: 'e3_2', name: 'Abdominal reto', series: 3, reps: '15', rest: 30, videoUrl: 'https://youtu.be/9eeeUjV4r_I?si=X1puCF93u52szHYc', category: 'A', objective: 'emagrecimento', dayOfWeek: 3 },
  { id: 'e3_3', name: 'Abdominal bicicleta', series: 3, reps: '20', rest: 30, videoUrl: 'https://youtu.be/kWEniBee4_Y?si=MRUAD4qtLBU8Rsvy', category: 'A', objective: 'emagrecimento', dayOfWeek: 3 },
  { id: 'e3_4', name: 'Prancha', series: 3, reps: '30–60s', rest: 60, videoUrl: 'https://youtu.be/A2b2EmIg0dA?si=WWz5EB0XeXL7sCGV', category: 'A', objective: 'emagrecimento', dayOfWeek: 3 },

  // Thursday (4): Costas + Bíceps
  { id: 'e4_1', name: 'Puxada na frente', series: 3, reps: '12', rest: 60, videoUrl: 'https://youtu.be/YywSCu4Y360?si=G-YzbaNAT9_iln1B', category: 'A', objective: 'emagrecimento', dayOfWeek: 4 },
  { id: 'e4_2', name: 'Remada curvada', series: 3, reps: '10', rest: 60, videoUrl: 'https://youtu.be/k3dExTB8Jyo?si=mKnzJs9WB_c5g_A9', category: 'A', objective: 'emagrecimento', dayOfWeek: 4 },
  { id: 'e4_3', name: 'Rosca direta', series: 3, reps: '12', rest: 45, videoUrl: 'https://youtu.be/FHyZEuRpSg4?si=WRLIwrnuvcP-sTzo', category: 'A', objective: 'emagrecimento', dayOfWeek: 4 },
  { id: 'e4_4', name: 'Rosca alternada', series: 3, reps: '12', rest: 45, videoUrl: 'https://youtu.be/AuBN9_8Iihc?si=1ZWrtTA9eVVEnoEJ', category: 'A', objective: 'emagrecimento', dayOfWeek: 4 },
  { id: 'e4_5', name: '🏃 Cardio leve', series: 1, reps: '15–20 min', rest: 0, videoUrl: 'https://player.vimeo.com/external/371433846.sd.mp4?s=231560ad12315cf2108ec2f1d01223bc983b45f2&profile_id=139&oauth2_token_id=57447761', category: 'A', objective: 'emagrecimento', dayOfWeek: 4 },

  // Friday (5): Treino Full Body + HIIT
  { id: 'e5_1', name: 'Agachamento', series: 3, reps: '12', rest: 60, videoUrl: 'https://youtu.be/Eo4EZK3UD98?si=YB2WuT44UJJG-9qr', category: 'A', objective: 'emagrecimento', dayOfWeek: 5 },
  { id: 'e5_2', name: 'Flexão', series: 3, reps: 'Até falhar', rest: 60, videoUrl: 'https://youtu.be/xAiHrxk5XyU?si=E2sWVyZ8iYnEJjHu', category: 'A', objective: 'emagrecimento', dayOfWeek: 5 },
  { id: 'e5_3', name: 'Remada', series: 3, reps: '10', rest: 60, videoUrl: 'https://youtu.be/f8AVh4VBbos?si=KwjDb1GaEt6SFxLq', category: 'A', objective: 'emagrecimento', dayOfWeek: 5 },
  { id: 'e5_4', name: 'Desenvolvimento (ombro)', series: 3, reps: '12', rest: 60, videoUrl: 'https://youtu.be/eufDL9MmF8A?si=dnnYq5RnBHlpbvcJ', category: 'A', objective: 'emagrecimento', dayOfWeek: 5 },
  { id: 'e5_5', name: '🔥 HIIT', series: 1, reps: '15–20 min', rest: 0, videoUrl: 'https://youtu.be/6OeWGBaVzAU?si=PyohyQnujJlYaVmF', category: 'A', objective: 'emagrecimento', dayOfWeek: 5 },

  // Saturday (6): Cardio + Funcional
  { id: 'e6_1', name: '🏃 Caminhada/corrida', series: 1, reps: '40 min', rest: 0, videoUrl: 'https://player.vimeo.com/external/371433846.sd.mp4?s=231560ad12315cf2108ec2f1d01223bc983b45f2&profile_id=139&oauth2_token_id=57447761', category: 'A', objective: 'emagrecimento', dayOfWeek: 6 },
  { id: 'e6_2', name: 'Circuito: Polichinelo', series: 3, reps: '30s', rest: 0, videoUrl: 'https://youtu.be/YJbkVbNNops?si=Z_MydKBWDpjTwuPA', category: 'A', objective: 'emagrecimento', dayOfWeek: 6 },
  { id: 'e6_3', name: 'Circuito: Burpee', series: 3, reps: '10', rest: 0, videoUrl: 'https://youtu.be/G2hv_NYhM-A?si=jC-OdjS4OpzvYHMw', category: 'A', objective: 'emagrecimento', dayOfWeek: 6 },
  { id: 'e6_4', name: 'Circuito: Abdominal', series: 3, reps: '15', rest: 0, videoUrl: 'https://youtu.be/T8ctQ4DlPIo?si=FQsGThiY3_H9MWx7', category: 'A', objective: 'emagrecimento', dayOfWeek: 6 },
  { id: 'e6_5', name: 'Circuito: Agachamento', series: 3, reps: '15', rest: 0, videoUrl: 'https://youtu.be/Eo4EZK3UD98?si=YB2WuT44UJJG-9qr', category: 'A', objective: 'emagrecimento', dayOfWeek: 6 },

  // Sunday (0): Descanso
  { id: 'e0_1', name: '🚶♂️ Caminhada leve (Opcional)', series: 1, reps: 'Livre', rest: 0, videoUrl: 'https://player.vimeo.com/external/371433846.sd.mp4?s=231560ad12315cf2108ec2f1d01223bc983b45f2&profile_id=139&oauth2_token_id=57447761', category: 'A', objective: 'emagrecimento', dayOfWeek: 0 },

  // --- Definição (Definition) Plan ---
  // Monday (1): Peito + Tríceps + Cardio
  { id: 'd1_1', name: 'Supino reto', series: 4, reps: '10', rest: 60, videoUrl: 'https://youtu.be/-iRqhXSx15M?si=3cIJagifJzfK4xhY', category: 'A', objective: 'definicao', dayOfWeek: 1 },
  { id: 'd1_2', name: 'Supino inclinado', series: 3, reps: '10', rest: 60, videoUrl: 'https://youtu.be/-iRqhXSx15M?si=3cIJagifJzfK4xhY', category: 'A', objective: 'definicao', dayOfWeek: 1 },
  { id: 'd1_3', name: 'Crucifixo', series: 3, reps: '12', rest: 45, videoUrl: 'https://youtu.be/J1YnmuweOkM?si=2qun7r5BEPlRI_2z', category: 'A', objective: 'definicao', dayOfWeek: 1 },
  { id: 'd1_4', name: 'Tríceps corda', series: 3, reps: '12', rest: 45, videoUrl: 'https://youtu.be/btj6dDfAQ2w?si=48pJqjBG4_gNDBhj', category: 'A', objective: 'definicao', dayOfWeek: 1 },
  { id: 'd1_5', name: 'Tríceps banco', series: 3, reps: 'Até falhar', rest: 60, videoUrl: 'https://youtu.be/UGxwkr52YLM?si=Cu5UfZNtOc_ri8vl', category: 'A', objective: 'definicao', dayOfWeek: 1 },
  { id: 'd1_6', name: '🔥 Cardio: Moderado', series: 1, reps: '15–20 min', rest: 0, videoUrl: 'https://player.vimeo.com/external/371433846.sd.mp4?s=231560ad12315cf2108ec2f1d01223bc983b45f2&profile_id=139&oauth2_token_id=57447761', category: 'A', objective: 'definicao', dayOfWeek: 1 },

  // Tuesday (2): Costas + Bíceps
  { id: 'd2_1', name: 'Puxada na frente', series: 4, reps: '10', rest: 60, videoUrl: 'https://youtu.be/YywSCu4Y360?si=G-YzbaNAT9_iln1B', category: 'A', objective: 'definicao', dayOfWeek: 2 },
  { id: 'd2_2', name: 'Remada curvada', series: 3, reps: '10', rest: 60, videoUrl: 'https://youtu.be/k3dExTB8Jyo?si=mKnzJs9WB_c5g_A9', category: 'A', objective: 'definicao', dayOfWeek: 2 },
  { id: 'd2_3', name: 'Remada baixa', series: 3, reps: '12', rest: 60, videoUrl: 'https://youtu.be/f8AVh4VBbos?si=KwjDb1GaEt6SFxLq', category: 'A', objective: 'definicao', dayOfWeek: 2 },
  { id: 'd2_4', name: 'Rosca direta', series: 3, reps: '12', rest: 45, videoUrl: 'https://youtu.be/FHyZEuRpSg4?si=WRLIwrnuvcP-sTzo', category: 'A', objective: 'definicao', dayOfWeek: 2 },
  { id: 'd2_5', name: 'Rosca alternada', series: 3, reps: '12', rest: 45, videoUrl: 'https://youtu.be/AuBN9_8Iihc?si=1ZWrtTA9eVVEnoEJ', category: 'A', objective: 'definicao', dayOfWeek: 2 },
  { id: 'd2_6', name: '🚶 Cardio leve', series: 1, reps: '10–15 min', rest: 0, videoUrl: 'https://player.vimeo.com/external/371433846.sd.mp4?s=231560ad12315cf2108ec2f1d01223bc983b45f2&profile_id=139&oauth2_token_id=57447761', category: 'A', objective: 'definicao', dayOfWeek: 2 },

  // Wednesday (3): Pernas + Glúteo
  { id: 'd3_1', name: 'Agachamento', series: 4, reps: '10', rest: 90, videoUrl: 'https://youtu.be/Eo4EZK3UD98?si=YB2WuT44UJJG-9qr', category: 'A', objective: 'definicao', dayOfWeek: 3 },
  { id: 'd3_2', name: 'Leg press', series: 3, reps: '12', rest: 60, videoUrl: 'https://youtu.be/5sQ0HrXwrjU?si=9bzY5lhp4KwwyKwa', category: 'A', objective: 'definicao', dayOfWeek: 3 },
  { id: 'd3_3', name: 'Cadeira extensora', series: 3, reps: '12', rest: 45, videoUrl: 'https://youtu.be/I_uBK4DDflU?si=sGVjPu3wB0IKgVUC', category: 'A', objective: 'definicao', dayOfWeek: 3 },
  { id: 'd3_4', name: 'Stiff', series: 3, reps: '10', rest: 60, videoUrl: 'https://youtu.be/_6ElJLyBXcE?si=z31cXCYAWM9qO4qQ', category: 'A', objective: 'definicao', dayOfWeek: 3 },
  { id: 'd3_5', name: 'Glúteo (máquina ou solo)', series: 3, reps: '12', rest: 45, videoUrl: 'https://youtu.be/CQebwTfJjas?si=vxSUiO96bLdiPb7-', category: 'A', objective: 'definicao', dayOfWeek: 3 },
  { id: 'd3_6', name: 'Panturrilha', series: 4, reps: '15', rest: 45, videoUrl: 'https://youtu.be/xIq9K_oeTK4?si=aBuTz0qwIQNND1Ei', category: 'A', objective: 'definicao', dayOfWeek: 3 },

  // Thursday (4): Ombro + Abdômen
  { id: 'd4_1', name: 'Desenvolvimento', series: 4, reps: '10', rest: 60, videoUrl: 'https://youtu.be/eufDL9MmF8A?si=dnnYq5RnBHlpbvcJ', category: 'A', objective: 'definicao', dayOfWeek: 4 },
  { id: 'd4_2', name: 'Elevação lateral', series: 3, reps: '12', rest: 45, videoUrl: 'https://youtu.be/c7zMmbWkUPw?si=8rjXdjqvAjWBt4A1', category: 'A', objective: 'definicao', dayOfWeek: 4 },
  { id: 'd4_3', name: 'Elevação frontal', series: 3, reps: '12', rest: 45, videoUrl: 'https://youtu.be/kKjjeiXL960?si=xG24W-AXdhwrQXdx', category: 'A', objective: 'definicao', dayOfWeek: 4 },
  { id: 'd4_4', name: 'Encolhimento', series: 3, reps: '12', rest: 45, videoUrl: 'https://youtu.be/AdkMdSoRVPE?si=u8TtcUHvFHCpCnWC', category: 'A', objective: 'definicao', dayOfWeek: 4 },
  { id: 'd4_5', name: 'Abdominal', series: 3, reps: '15', rest: 30, videoUrl: 'https://youtu.be/_Zeku5F7IX8?si=BSJteB7vKVFcSsrh', category: 'A', objective: 'definicao', dayOfWeek: 4 },
  { id: 'd4_6', name: 'Prancha', series: 3, reps: '40s', rest: 60, videoUrl: 'https://youtu.be/A2b2EmIg0dA?si=WWz5EB0XeXL7sCGV', category: 'A', objective: 'definicao', dayOfWeek: 4 },
  { id: 'd4_7', name: 'Bicicleta', series: 3, reps: '20', rest: 30, videoUrl: 'https://player.vimeo.com/external/371433846.sd.mp4?s=231560ad12315cf2108ec2f1d01223bc983b45f2&profile_id=139&oauth2_token_id=57447761', category: 'A', objective: 'definicao', dayOfWeek: 4 },

  // Friday (5): Full Body + HIIT
  { id: 'd5_1', name: 'Agachamento', series: 3, reps: '12', rest: 60, videoUrl: 'https://youtu.be/Eo4EZK3UD98?si=YB2WuT44UJJG-9qr', category: 'A', objective: 'definicao', dayOfWeek: 5 },
  { id: 'd5_2', name: 'Supino', series: 3, reps: '10', rest: 60, videoUrl: 'https://youtu.be/-iRqhXSx15M?si=3cIJagifJzfK4xhY', category: 'A', objective: 'definicao', dayOfWeek: 5 },
  { id: 'd5_3', name: 'Remada', series: 3, reps: '10', rest: 60, videoUrl: 'https://youtu.be/f8AVh4VBbos?si=KwjDb1GaEt6SFxLq', category: 'A', objective: 'definicao', dayOfWeek: 5 },
  { id: 'd5_4', name: 'Desenvolvimento', series: 3, reps: '10', rest: 60, videoUrl: 'https://youtu.be/eufDL9MmF8A?si=dnnYq5RnBHlpbvcJ', category: 'A', objective: 'definicao', dayOfWeek: 5 },
  { id: 'd5_5', name: '🔥 HIIT: 30s forte + 30s leve', series: 1, reps: '15 min', rest: 0, videoUrl: 'https://youtu.be/6OeWGBaVzAU?si=PyohyQnujJlYaVmF', category: 'A', objective: 'definicao', dayOfWeek: 5 },

  // Saturday (6): Cardio + Core
  { id: 'd6_1', name: '🏃 Cardio', series: 1, reps: '30–40 min', rest: 0, videoUrl: 'https://player.vimeo.com/external/371433846.sd.mp4?s=231560ad12315cf2108ec2f1d01223bc983b45f2&profile_id=139&oauth2_token_id=57447761', category: 'A', objective: 'definicao', dayOfWeek: 6 },
  { id: 'd6_2', name: 'Prancha', series: 3, reps: '40s', rest: 60, videoUrl: 'https://youtu.be/A2b2EmIg0dA?si=WWz5EB0XeXL7sCGV', category: 'A', objective: 'definicao', dayOfWeek: 6 },
  { id: 'd6_3', name: 'Abdominal', series: 3, reps: '15', rest: 30, videoUrl: 'https://youtu.be/_Zeku5F7IX8?si=BSJteB7vKVFcSsrh', category: 'A', objective: 'definicao', dayOfWeek: 6 },

  // Sunday (0): Descanso
  { id: 'd0_1', name: '🛌 Descanso ou caminhada leve', series: 1, reps: 'Livre', rest: 0, videoUrl: 'https://player.vimeo.com/external/371433846.sd.mp4?s=231560ad12315cf2108ec2f1d01223bc983b45f2&profile_id=139&oauth2_token_id=57447761', category: 'A', objective: 'definicao', dayOfWeek: 0 },

  // --- Hipertrofia (Hypertrophy) Plan ---
  // Monday (1): Peito + Tríceps
  { id: 'h1_1', name: 'Supino reto', series: 4, reps: '8–10', rest: 90, videoUrl: 'https://youtu.be/-iRqhXSx15M?si=3cIJagifJzfK4xhY', category: 'A', objective: 'hipertrofia', dayOfWeek: 1 },
  { id: 'h1_2', name: 'Supino inclinado', series: 3, reps: '8–10', rest: 90, videoUrl: 'https://youtu.be/-iRqhXSx15M?si=3cIJagifJzfK4xhY', category: 'A', objective: 'hipertrofia', dayOfWeek: 1 },
  { id: 'h1_3', name: 'Crucifixo', series: 3, reps: '10–12', rest: 60, videoUrl: 'https://youtu.be/J1YnmuweOkM?si=2qun7r5BEPlRI_2z', category: 'A', objective: 'hipertrofia', dayOfWeek: 1 },
  { id: 'h1_4', name: 'Crossover', series: 3, reps: '12', rest: 60, videoUrl: 'https://youtu.be/VakpIeaaeXA?si=C9nl48LvQ_Gd2xX1', category: 'A', objective: 'hipertrofia', dayOfWeek: 1 },
  { id: 'h1_5', name: 'Tríceps corda', series: 3, reps: '10–12', rest: 60, videoUrl: 'https://youtu.be/btj6dDfAQ2w?si=48pJqjBG4_gNDBhj', category: 'A', objective: 'hipertrofia', dayOfWeek: 1 },
  { id: 'h1_6', name: 'Tríceps testa', series: 3, reps: '10', rest: 60, videoUrl: 'https://youtu.be/VakpIeaaeXA?si=C9nl48LvQ_Gd2xX1', category: 'A', objective: 'hipertrofia', dayOfWeek: 1 },

  // Tuesday (2): Costas + Bíceps
  { id: 'h2_1', name: 'Puxada na frente', series: 4, reps: '8–10', rest: 90, videoUrl: 'https://youtu.be/YywSCu4Y360?si=G-YzbaNAT9_iln1B', category: 'A', objective: 'hipertrofia', dayOfWeek: 2 },
  { id: 'h2_2', name: 'Remada curvada', series: 3, reps: '8–10', rest: 90, videoUrl: 'https://youtu.be/k3dExTB8Jyo?si=mKnzJs9WB_c5g_A9', category: 'A', objective: 'hipertrofia', dayOfWeek: 2 },
  { id: 'h2_3', name: 'Remada baixa', series: 3, reps: '10', rest: 60, videoUrl: 'https://youtu.be/f8AVh4VBbos?si=KwjDb1GaEt6SFxLq', category: 'A', objective: 'hipertrofia', dayOfWeek: 2 },
  { id: 'h2_4', name: 'Pulldown', series: 3, reps: '10–12', rest: 60, videoUrl: 'https://youtu.be/QTQABcLosXk?si=lrRI7TWZ1CUhSBSC', category: 'A', objective: 'hipertrofia', dayOfWeek: 2 },
  { id: 'h2_5', name: 'Rosca direta', series: 3, reps: '10', rest: 60, videoUrl: 'https://youtu.be/FHyZEuRpSg4?si=WRLIwrnuvcP-sTzo', category: 'A', objective: 'hipertrofia', dayOfWeek: 2 },
  { id: 'h2_6', name: 'Rosca alternada', series: 3, reps: '10–12', rest: 60, videoUrl: 'https://youtu.be/AuBN9_8Iihc?si=1ZWrtTA9eVVEnoEJ', category: 'A', objective: 'hipertrofia', dayOfWeek: 2 },

  // Wednesday (3): Pernas (Completo)
  { id: 'h3_1', name: 'Agachamento', series: 4, reps: '8–10', rest: 120, videoUrl: 'https://youtu.be/Eo4EZK3UD98?si=YB2WuT44UJJG-9qr', category: 'A', objective: 'hipertrofia', dayOfWeek: 3 },
  { id: 'h3_2', name: 'Leg press', series: 4, reps: '10', rest: 90, videoUrl: 'https://youtu.be/5sQ0HrXwrjU?si=9bzY5lhp4KwwyKwa', category: 'A', objective: 'hipertrofia', dayOfWeek: 3 },
  { id: 'h3_3', name: 'Cadeira extensora', series: 3, reps: '12', rest: 60, videoUrl: 'https://youtu.be/I_uBK4DDflU?si=sGVjPu3wB0IKgVUC', category: 'A', objective: 'hipertrofia', dayOfWeek: 3 },
  { id: 'h3_4', name: 'Mesa flexora', series: 3, reps: '12', rest: 60, videoUrl: 'https://youtu.be/KIoiwCfcTXM?si=bat8aIeGFWdsV5Ta', category: 'A', objective: 'hipertrofia', dayOfWeek: 3 },
  { id: 'h3_5', name: 'Stiff', series: 3, reps: '10', rest: 90, videoUrl: 'https://youtu.be/_6ElJLyBXcE?si=z31cXCYAWM9qO4qQ', category: 'A', objective: 'hipertrofia', dayOfWeek: 3 },
  { id: 'h3_6', name: 'Panturrilha', series: 4, reps: '15', rest: 60, videoUrl: 'https://youtu.be/xIq9K_oeTK4?si=aBuTz0qwIQNND1Ei', category: 'A', objective: 'hipertrofia', dayOfWeek: 3 },

  // Thursday (4): Ombro + Trapézio
  { id: 'h4_1', name: 'Desenvolvimento', series: 4, reps: '8–10', rest: 90, videoUrl: 'https://youtu.be/eufDL9MmF8A?si=dnnYq5RnBHlpbvcJ', category: 'A', objective: 'hipertrofia', dayOfWeek: 4 },
  { id: 'h4_2', name: 'Elevação lateral', series: 3, reps: '12', rest: 60, videoUrl: 'https://youtu.be/c7zMmbWkUPw?si=8rjXdjqvAjWBt4A1', category: 'A', objective: 'hipertrofia', dayOfWeek: 4 },
  { id: 'h4_3', name: 'Elevação frontal', series: 3, reps: '10', rest: 60, videoUrl: 'https://youtu.be/kKjjeiXL960?si=xG24W-AXdhwrQXdx', category: 'A', objective: 'hipertrofia', dayOfWeek: 4 },
  { id: 'h4_4', name: 'Encolhimento', series: 4, reps: '12', rest: 60, videoUrl: 'https://youtu.be/AdkMdSoRVPE?si=u8TtcUHvFHCpCnWC', category: 'A', objective: 'hipertrofia', dayOfWeek: 4 },
  { id: 'h4_5', name: 'Crucifixo invertido', series: 3, reps: '12', rest: 60, videoUrl: 'https://youtu.be/G3DXKpk5AJA?si=m_LVPRhlMgQdu7i5', category: 'A', objective: 'hipertrofia', dayOfWeek: 4 },

  // Friday (5): Braços (Bíceps + Tríceps)
  { id: 'h5_1', name: 'Rosca direta', series: 4, reps: '10', rest: 60, videoUrl: 'https://youtu.be/FHyZEuRpSg4?si=WRLIwrnuvcP-sTzo', category: 'A', objective: 'hipertrofia', dayOfWeek: 5 },
  { id: 'h5_2', name: 'Rosca concentrada', series: 3, reps: '10', rest: 60, videoUrl: 'https://youtu.be/PcwdHVhWY3s?si=KGRXH5uG4c-XelPe', category: 'A', objective: 'hipertrofia', dayOfWeek: 5 },
  { id: 'h5_3', name: 'Rosca martelo', series: 3, reps: '10', rest: 60, videoUrl: 'https://youtu.be/6GClLap3WCA?si=k7RNTUgzztIrMdqu', category: 'A', objective: 'hipertrofia', dayOfWeek: 5 },
  { id: 'h5_4', name: 'Tríceps corda', series: 4, reps: '10', rest: 60, videoUrl: 'https://youtu.be/btj6dDfAQ2w?si=48pJqjBG4_gNDBhj', category: 'A', objective: 'hipertrofia', dayOfWeek: 5 },
  { id: 'h5_5', name: 'Tríceps banco', series: 3, reps: 'Até falhar', rest: 60, videoUrl: 'https://youtu.be/UGxwkr52YLM?si=Cu5UfZNtOc_ri8vl', category: 'A', objective: 'hipertrofia', dayOfWeek: 5 },
  { id: 'h5_6', name: 'Tríceps francês', series: 3, reps: '10', rest: 60, videoUrl: 'https://youtu.be/zjbKswHOH_I?si=OUKBAQaT9K-Apef3', category: 'A', objective: 'hipertrofia', dayOfWeek: 5 },

  // Saturday (6): Full Body leve (opcional)
  { id: 'h6_1', name: 'Agachamento', series: 3, reps: '12', rest: 60, videoUrl: 'https://youtu.be/Eo4EZK3UD98?si=YB2WuT44UJJG-9qr', category: 'A', objective: 'hipertrofia', dayOfWeek: 6 },
  { id: 'h6_2', name: 'Supino', series: 3, reps: '10', rest: 60, videoUrl: 'https://youtu.be/-iRqhXSx15M?si=3cIJagifJzfK4xhY', category: 'A', objective: 'hipertrofia', dayOfWeek: 6 },
  { id: 'h6_3', name: 'Remada', series: 3, reps: '10', rest: 60, videoUrl: 'https://youtu.be/f8AVh4VBbos?si=KwjDb1GaEt6SFxLq', category: 'A', objective: 'hipertrofia', dayOfWeek: 6 },
  { id: 'h6_4', name: 'Abdômen', series: 3, reps: '15', rest: 45, videoUrl: 'https://youtu.be/No6fFlwBkEE?si=ZmW7lDkNflwjGy8G', category: 'A', objective: 'hipertrofia', dayOfWeek: 6 },
  { id: 'h6_5', name: '👉 Descanso opcional', series: 1, reps: 'Livre', rest: 0, videoUrl: 'https://player.vimeo.com/external/371433846.sd.mp4?s=231560ad12315cf2108ec2f1d01223bc983b45f2&profile_id=139&oauth2_token_id=57447761', category: 'A', objective: 'hipertrofia', dayOfWeek: 6 },

  // Sunday (0): Descanso
  { id: 'h0_1', name: '🛌 Descanso', series: 1, reps: 'Recuperação', rest: 0, videoUrl: 'https://player.vimeo.com/external/371433846.sd.mp4?s=231560ad12315cf2108ec2f1d01223bc983b45f2&profile_id=139&oauth2_token_id=57447761', category: 'A', objective: 'hipertrofia', dayOfWeek: 0 }
];

export const MOCK_MEALS: Meal[] = [
  // --- Emagrecimento (Weight Loss) Daily Plan ---
  
  // Segunda (1)
  {
    id: 'me1_1',
    name: 'Omelete com Banana e Aveia',
    calories: 380,
    description: '3 claras + 1 ovo (130g), aveia (40g) e banana (100g).',
    recipe: '1. Bata os ovos e faça omelete. 2. Consuma aveia com banana.',
    imageUrl: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&q=80&w=400',
    time: 'Café da Manhã',
    objective: 'emagrecimento',
    dayOfWeek: 1
  },
  {
    id: 'me1_2',
    name: 'Frango com Arroz Integral e Feijão',
    calories: 450,
    description: 'Frango (150g), arroz integral (70g cru), feijão (80g) e brócolis (100g).',
    recipe: '1. Grelhe o frango. 2. Cozinhe arroz e feijão. 3. Cozinhe brócolis.',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400',
    time: 'Almoço',
    objective: 'emagrecimento',
    dayOfWeek: 1
  },
  {
    id: 'me1_3',
    name: 'Tilápia com Abobrinha',
    calories: 320,
    description: 'Tilápia (150g) e abobrinha (100g).',
    recipe: 'Grelhe tudo junto.',
    imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=400',
    time: 'Jantar',
    objective: 'emagrecimento',
    dayOfWeek: 1
  },

  // Terça (2)
  {
    id: 'me2_1',
    name: 'Iogurte com Morango e Aveia',
    calories: 290,
    description: 'Iogurte (170g), aveia (30g) e morango (80g).',
    recipe: 'Misturar tudo em um bowl.',
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=400',
    time: 'Café da Manhã',
    objective: 'emagrecimento',
    dayOfWeek: 2
  },
  {
    id: 'me2_2',
    name: 'Carne Magra com Batata Doce',
    calories: 480,
    description: 'Carne magra (150g), batata doce (150g) e salada (100g).',
    recipe: '1. Grelhar carne. 2. Cozinhar batata.',
    imageUrl: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=400',
    time: 'Almoço',
    objective: 'emagrecimento',
    dayOfWeek: 2
  },
  {
    id: 'me2_3',
    name: 'Omelete de Espinafre',
    calories: 310,
    description: '2 ovos + 2 claras (140g) e espinafre (80g).',
    recipe: 'Prepare como omelete.',
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=400',
    time: 'Jantar',
    objective: 'emagrecimento',
    dayOfWeek: 2
  },

  // Quarta (3)
  {
    id: 'me3_1',
    name: 'Ovos Mexidos com Pão Integral',
    calories: 320,
    description: '2 ovos (100g) e pão integral (40g).',
    recipe: 'Prepare os ovos mexidos e sirva com o pão.',
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=400',
    time: 'Café da Manhã',
    objective: 'emagrecimento',
    dayOfWeek: 3
  },
  {
    id: 'me3_2',
    name: 'Frango com Arroz e Legumes',
    calories: 380,
    description: 'Frango (120g), arroz integral (50g) e legumes (100g).',
    recipe: 'Grelhar o frango e cozinhar o arroz com legumes.',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400',
    time: 'Almoço',
    objective: 'emagrecimento',
    dayOfWeek: 3
  },
  {
    id: 'me3_3',
    name: 'Atum com Salada (Low Carb)',
    calories: 250,
    description: 'Atum (120g) e salada (150g).',
    recipe: 'Misturar o atum com a salada fresca.',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400',
    time: 'Jantar',
    objective: 'emagrecimento',
    dayOfWeek: 3
  },

  // Quinta (4)
  {
    id: 'me4_1',
    name: 'Iogurte com Banana e Aveia',
    calories: 310,
    description: 'Iogurte (170g), banana (80g) e aveia (30g).',
    recipe: 'Misturar tudo em um bowl.',
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=400',
    time: 'Café da Manhã',
    objective: 'emagrecimento',
    dayOfWeek: 4
  },
  {
    id: 'me4_2',
    name: 'Frango com Arroz e Feijão',
    calories: 420,
    description: 'Frango (150g), arroz integral (60g) e feijão (80g).',
    recipe: 'Grelhar o frango e cozinhar os grãos.',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400',
    time: 'Almoço',
    objective: 'emagrecimento',
    dayOfWeek: 4
  },
  {
    id: 'me4_3',
    name: 'Carne Magra com Legumes',
    calories: 350,
    description: 'Carne magra (120g) e legumes (120g).',
    recipe: 'Refogar a carne com os legumes.',
    imageUrl: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=400',
    time: 'Jantar',
    objective: 'emagrecimento',
    dayOfWeek: 4
  },

  // Sexta (5)
  {
    id: 'me5_1',
    name: 'Omelete de Aveia',
    calories: 340,
    description: '3 claras + 1 ovo (130g) e aveia (40g).',
    recipe: 'Bata os ovos com a aveia e faça a omelete.',
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=400',
    time: 'Café da Manhã',
    objective: 'emagrecimento',
    dayOfWeek: 5
  },
  {
    id: 'me5_2',
    name: 'Frango com Arroz e Legumes',
    calories: 410,
    description: 'Frango (150g), arroz (70g) e legumes (100g).',
    recipe: 'Grelhar o frango e cozinhar o arroz com legumes.',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400',
    time: 'Almoço',
    objective: 'emagrecimento',
    dayOfWeek: 5
  },
  {
    id: 'me5_3',
    name: 'Frango Desfiado com Salada',
    calories: 280,
    description: 'Frango desfiado (120g) e salada (150g).',
    recipe: 'Misturar o frango desfiado com a salada.',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400',
    time: 'Jantar',
    objective: 'emagrecimento',
    dayOfWeek: 5
  },

  // Sábado (6)
  {
    id: 'me6_1',
    name: 'Iogurte com Granola',
    calories: 260,
    description: 'Iogurte (170g) e granola (30g).',
    recipe: 'Misturar o iogurte com a granola.',
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=400',
    time: 'Café da Manhã',
    objective: 'emagrecimento',
    dayOfWeek: 6
  },
  {
    id: 'me6_2',
    name: 'Frango Assado com Batata Doce',
    calories: 460,
    description: 'Frango (150g), batata doce (150g) e legumes (100g).',
    recipe: '1. Assar frango (200°C). 2. Cozinhar batata.',
    imageUrl: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=400',
    time: 'Almoço',
    objective: 'emagrecimento',
    dayOfWeek: 6
  },
  {
    id: 'me6_3',
    name: 'Omelete de Legumes',
    calories: 290,
    description: '2 ovos + 2 claras e legumes (80g).',
    recipe: 'Prepare como omelete.',
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=400',
    time: 'Jantar',
    objective: 'emagrecimento',
    dayOfWeek: 6
  },

  // Domingo (0)
  {
    id: 'me0_1',
    name: 'Salada de Frutas com Iogurte',
    calories: 240,
    description: 'Frutas (150g) e iogurte (170g).',
    recipe: 'Misturar as frutas picadas com o iogurte.',
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=400',
    time: 'Café da Manhã',
    objective: 'emagrecimento',
    dayOfWeek: 0
  },
  {
    id: 'me0_2',
    name: 'Carne com Arroz e Salada',
    calories: 430,
    description: 'Carne (150g), arroz integral (50g) e salada (150g).',
    recipe: 'Assar ou grelhar a carne e servir com arroz e salada.',
    imageUrl: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=400',
    time: 'Almoço',
    objective: 'emagrecimento',
    dayOfWeek: 0
  },
  {
    id: 'me0_3',
    name: 'Sopa de Legumes',
    calories: 220,
    description: 'Sopa de legumes (200g).',
    recipe: 'Cozinhar tudo em água e temperos naturais.',
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=400',
    time: 'Jantar',
    objective: 'emagrecimento',
    dayOfWeek: 0
  },

  // --- Definição (Definition) Daily Plan ---

  // Segunda (1)
  {
    id: 'md1_1',
    name: 'Omelete com Banana e Aveia',
    calories: 360,
    description: '3 claras + 1 ovo (130g), aveia (40g) e banana (80g).',
    recipe: '1. Bata ovos e faça omelete. 2. Consuma com aveia e banana.',
    imageUrl: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&q=80&w=400',
    time: 'Café da Manhã',
    objective: 'definicao',
    dayOfWeek: 1
  },
  {
    id: 'md1_2',
    name: 'Frango com Arroz Integral e Feijão',
    calories: 420,
    description: 'Frango (150g), arroz integral (60g cru), feijão (80g) e brócolis (100g).',
    recipe: '1. Grelhe o frango. 2. Cozinhe arroz e feijão. 3. Cozinhe o brócolis.',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400',
    time: 'Almoço',
    objective: 'definicao',
    dayOfWeek: 1
  },
  {
    id: 'md1_3',
    name: 'Tilápia com Abobrinha',
    calories: 310,
    description: 'Tilápia (150g) e abobrinha (100g).',
    recipe: 'Grelhe tudo junto.',
    imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=400',
    time: 'Jantar',
    objective: 'definicao',
    dayOfWeek: 1
  },

  // Terça (2)
  {
    id: 'md2_1',
    name: 'Iogurte com Morango e Aveia',
    calories: 280,
    description: 'Iogurte natural (170g), aveia (30g) e morango (80g).',
    recipe: 'Misturar tudo em um bowl.',
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=400',
    time: 'Café da Manhã',
    objective: 'definicao',
    dayOfWeek: 2
  },
  {
    id: 'md2_2',
    name: 'Carne Magra com Batata Doce',
    calories: 450,
    description: 'Carne magra (150g), batata doce (150g) e salada (100g).',
    recipe: '1. Grelhar carne. 2. Cozinhar batata.',
    imageUrl: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=400',
    time: 'Almoço',
    objective: 'definicao',
    dayOfWeek: 2
  },
  {
    id: 'md2_3',
    name: 'Omelete de Espinafre',
    calories: 300,
    description: '2 ovos + 2 claras (140g) e espinafre (80g).',
    recipe: 'Prepare como omelete.',
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=400',
    time: 'Jantar',
    objective: 'definicao',
    dayOfWeek: 2
  },

  // Quarta (3)
  {
    id: 'md3_1',
    name: 'Omelete com Banana e Aveia (Carbo Alto)',
    calories: 410,
    description: '3 claras + 1 ovo (130g), aveia (50g) e banana (100g).',
    recipe: 'Bata ovos e faça omelete. Consuma com aveia e banana.',
    imageUrl: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&q=80&w=400',
    time: 'Café da Manhã',
    objective: 'definicao',
    dayOfWeek: 3
  },
  {
    id: 'md3_2',
    name: 'Frango com Arroz, Feijão e Legumes',
    calories: 480,
    description: 'Frango (150g), arroz integral (80g cru), feijão (100g) e legumes (100g).',
    recipe: 'Grelhar o frango e cozinhar os grãos com legumes.',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400',
    time: 'Almoço',
    objective: 'definicao',
    dayOfWeek: 3
  },
  {
    id: 'md3_3',
    name: 'Carne Magra com Legumes',
    calories: 340,
    description: 'Carne magra (120g) e legumes (120g).',
    recipe: 'Refogar a carne com os legumes.',
    imageUrl: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=400',
    time: 'Jantar',
    objective: 'definicao',
    dayOfWeek: 3
  },

  // Quinta (4)
  {
    id: 'md4_1',
    name: 'Iogurte com Banana e Aveia',
    calories: 310,
    description: 'Iogurte (170g), banana (80g) e aveia (30g).',
    recipe: 'Misturar tudo em um bowl.',
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=400',
    time: 'Café da Manhã',
    objective: 'definicao',
    dayOfWeek: 4
  },
  {
    id: 'md4_2',
    name: 'Frango com Arroz e Legumes',
    calories: 390,
    description: 'Frango (150g), arroz integral (60g) e legumes (100g).',
    recipe: 'Grelhar o frango e cozinhar o arroz com legumes.',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400',
    time: 'Almoço',
    objective: 'definicao',
    dayOfWeek: 4
  },
  {
    id: 'md4_3',
    name: 'Atum com Salada',
    calories: 260,
    description: 'Atum (120g) e salada (150g).',
    recipe: 'Misturar o atum com a salada fresca.',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400',
    time: 'Jantar',
    objective: 'definicao',
    dayOfWeek: 4
  },

  // Sexta (5)
  {
    id: 'md5_1',
    name: 'Omelete de Aveia',
    calories: 330,
    description: '3 claras + 1 ovo (130g) e aveia (40g).',
    recipe: 'Bata os ovos com a aveia e faça a omelete.',
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=400',
    time: 'Café da Manhã',
    objective: 'definicao',
    dayOfWeek: 5
  },
  {
    id: 'md5_2',
    name: 'Frango com Arroz e Legumes',
    calories: 400,
    description: 'Frango (150g), arroz (70g) e legumes (100g).',
    recipe: 'Grelhar o frango e cozinhar o arroz com legumes.',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400',
    time: 'Almoço',
    objective: 'definicao',
    dayOfWeek: 5
  },
  {
    id: 'md5_3',
    name: 'Frango Desfiado com Salada',
    calories: 270,
    description: 'Frango desfiado (120g) e salada (150g).',
    recipe: 'Misturar o frango desfiado com a salada.',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400',
    time: 'Jantar',
    objective: 'definicao',
    dayOfWeek: 5
  },

  // Sábado (6)
  {
    id: 'md6_1',
    name: 'Iogurte com Granola',
    calories: 260,
    description: 'Iogurte (170g) e granola (30g).',
    recipe: 'Misturar o iogurte com a granola.',
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=400',
    time: 'Café da Manhã',
    objective: 'definicao',
    dayOfWeek: 6
  },
  {
    id: 'md6_2',
    name: 'Peixe com Batata Doce e Legumes',
    calories: 410,
    description: 'Peixe (150g), batata doce (120g) e legumes (100g).',
    recipe: '1. Grelhe peixe. 2. Cozinhe batata.',
    imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=400',
    time: 'Almoço',
    objective: 'definicao',
    dayOfWeek: 6
  },
  {
    id: 'md6_3',
    name: 'Omelete de Legumes',
    calories: 290,
    description: '2 ovos + 2 claras e legumes (80g).',
    recipe: 'Prepare como omelete.',
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=400',
    time: 'Jantar',
    objective: 'definicao',
    dayOfWeek: 6
  },

  // Domingo (0)
  {
    id: 'md0_1',
    name: 'Salada de Frutas com Iogurte',
    calories: 240,
    description: 'Frutas (150g) e iogurte (170g).',
    recipe: 'Misturar as frutas picadas com o iogurte.',
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=400',
    time: 'Café da Manhã',
    objective: 'definicao',
    dayOfWeek: 0
  },
  {
    id: 'md0_2',
    name: 'Carne Magra com Arroz e Salada',
    calories: 380,
    description: 'Carne magra (150g), arroz integral (50g) e salada (150g).',
    recipe: 'Assar ou grelhar a carne e servir com arroz e salada.',
    imageUrl: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=400',
    time: 'Almoço',
    objective: 'definicao',
    dayOfWeek: 0
  },
  {
    id: 'md0_3',
    name: 'Sopa de Legumes',
    calories: 220,
    description: 'Sopa de legumes (200g).',
    recipe: 'Cozinhar tudo em água e temperos naturais.',
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=400',
    time: 'Jantar',
    objective: 'definicao',
    dayOfWeek: 0
  },

  // --- Hipertrofia (Muscle Gain) Daily Plan ---

  // Segunda (1)
  {
    id: 'mh1_1',
    name: 'Omelete com Banana e Aveia',
    calories: 520,
    description: '3 ovos inteiros (150g), aveia (50g) e banana (100g).',
    recipe: '1. Bata os ovos e faça omelete. 2. Consuma aveia com banana.',
    imageUrl: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&q=80&w=400',
    time: 'Café da Manhã',
    objective: 'hipertrofia',
    dayOfWeek: 1
  },
  {
    id: 'mh1_2',
    name: 'Frango com Arroz Integral e Feijão',
    calories: 650,
    description: 'Frango (180g), arroz integral (80g cru), feijão (100g) e brócolis (100g).',
    recipe: '1. Tempere e grelhe o frango. 2. Cozinhe arroz e feijão. 3. Cozinhe brócolis.',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400',
    time: 'Almoço',
    objective: 'hipertrofia',
    dayOfWeek: 1
  },
  {
    id: 'mh1_3',
    name: 'Carne Vermelha com Batata Inglesa',
    calories: 580,
    description: 'Carne vermelha (150g) e batata inglesa (200g).',
    recipe: '1. Grelhe a carne. 2. Cozinhe a batata.',
    imageUrl: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=400',
    time: 'Jantar',
    objective: 'hipertrofia',
    dayOfWeek: 1
  },

  // Terça (2)
  {
    id: 'mh2_1',
    name: 'Iogurte com Banana e Aveia',
    calories: 480,
    description: 'Iogurte (200g), aveia (40g) e banana (100g).',
    recipe: 'Misturar tudo em um bowl.',
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=400',
    time: 'Café da Manhã',
    objective: 'hipertrofia',
    dayOfWeek: 2
  },
  {
    id: 'mh2_2',
    name: 'Carne Magra com Arroz e Legumes',
    calories: 620,
    description: 'Carne magra (180g), arroz integral (80g) e legumes (100g).',
    recipe: 'Grelhar a carne e cozinhar o arroz com legumes.',
    imageUrl: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=400',
    time: 'Almoço',
    objective: 'hipertrofia',
    dayOfWeek: 2
  },
  {
    id: 'mh2_3',
    name: 'Ovos Mexidos com Pão Integral',
    calories: 450,
    description: '3 ovos (150g) e pão integral 2 fatias (80g).',
    recipe: 'Prepare os ovos mexidos e sirva com o pão.',
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=400',
    time: 'Jantar',
    objective: 'hipertrofia',
    dayOfWeek: 2
  },

  // Quarta (3)
  {
    id: 'mh3_1',
    name: 'Omelete com Banana e Aveia (Hipercalórico)',
    calories: 610,
    description: '4 ovos (200g), aveia (60g) e banana (120g).',
    recipe: 'Bata os ovos e faça omelete. Consuma com aveia e banana.',
    imageUrl: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&q=80&w=400',
    time: 'Café da Manhã',
    objective: 'hipertrofia',
    dayOfWeek: 3
  },
  {
    id: 'mh3_2',
    name: 'Frango com Arroz, Feijão e Legumes',
    calories: 780,
    description: 'Frango (200g), arroz integral (100g), feijão (120g) e legumes (100g).',
    recipe: 'Grelhar o frango e cozinhar os grãos com legumes.',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400',
    time: 'Almoço',
    objective: 'hipertrofia',
    dayOfWeek: 3
  },
  {
    id: 'mh3_3',
    name: 'Carne Vermelha com Batata Doce',
    calories: 650,
    description: 'Carne vermelha (180g) e batata doce (200g).',
    recipe: 'Grelhar a carne e cozinhar a batata doce.',
    imageUrl: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=400',
    time: 'Jantar',
    objective: 'hipertrofia',
    dayOfWeek: 3
  },

  // Quinta (4)
  {
    id: 'mh4_1',
    name: 'Iogurte com Fruta e Aveia',
    calories: 460,
    description: 'Iogurte (200g), aveia (40g) e fruta (100g).',
    recipe: 'Misturar tudo em um bowl.',
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=400',
    time: 'Café da Manhã',
    objective: 'hipertrofia',
    dayOfWeek: 4
  },
  {
    id: 'mh4_2',
    name: 'Frango com Arroz e Legumes',
    calories: 590,
    description: 'Frango (180g), arroz integral (80g) e legumes (100g).',
    recipe: 'Grelhar o frango e cozinhar o arroz com legumes.',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400',
    time: 'Almoço',
    objective: 'hipertrofia',
    dayOfWeek: 4
  },
  {
    id: 'mh4_3',
    name: 'Tilápia com Batata Doce',
    calories: 480,
    description: 'Tilápia (180g) e batata doce (150g).',
    recipe: 'Grelhar o peixe e cozinhar a batata doce.',
    imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=400',
    time: 'Jantar',
    objective: 'hipertrofia',
    dayOfWeek: 4
  },

  // Sexta (5)
  {
    id: 'mh5_1',
    name: 'Ovos com Pão Integral',
    calories: 440,
    description: '3 ovos (150g) e pão integral 2 fatias (80g).',
    recipe: 'Prepare os ovos mexidos e sirva com o pão.',
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=400',
    time: 'Café da Manhã',
    objective: 'hipertrofia',
    dayOfWeek: 5
  },
  {
    id: 'mh5_2',
    name: 'Carne Magra com Arroz e Feijão',
    calories: 630,
    description: 'Carne magra (180g), arroz (80g) e feijão (100g).',
    recipe: 'Grelhar a carne e cozinhar os grãos.',
    imageUrl: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=400',
    time: 'Almoço',
    objective: 'hipertrofia',
    dayOfWeek: 5
  },
  {
    id: 'mh5_3',
    name: 'Frango Desfiado com Batata e Salada',
    calories: 520,
    description: 'Frango desfiado (150g), batata (150g) e salada (150g).',
    recipe: 'Cozinhar a batata e misturar com o frango desfiado e salada.',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400',
    time: 'Jantar',
    objective: 'hipertrofia',
    dayOfWeek: 5
  },

  // Sábado (6)
  {
    id: 'mh6_1',
    name: 'Iogurte com Granola',
    calories: 320,
    description: 'Iogurte (200g) e granola (40g).',
    recipe: 'Misturar o iogurte com a granola.',
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=400',
    time: 'Café da Manhã',
    objective: 'hipertrofia',
    dayOfWeek: 6
  },
  {
    id: 'mh6_2',
    name: 'Frango com Arroz e Legumes',
    calories: 550,
    description: 'Frango (180g), arroz (70g) e legumes (100g).',
    recipe: 'Grelhar o frango e cozinhar o arroz com legumes.',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400',
    time: 'Almoço',
    objective: 'hipertrofia',
    dayOfWeek: 6
  },
  {
    id: 'mh6_3',
    name: 'Omelete de Legumes',
    calories: 380,
    description: '3 ovos e legumes (80g).',
    recipe: 'Misturar os ovos com legumes e grelhar.',
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=400',
    time: 'Jantar',
    objective: 'hipertrofia',
    dayOfWeek: 6
  },

  // Domingo (0)
  {
    id: 'mh0_1',
    name: 'Salada de Frutas com Iogurte',
    calories: 340,
    description: 'Frutas (150g) e iogurte (200g).',
    recipe: 'Misturar as frutas picadas com o iogurte.',
    imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=400',
    time: 'Café da Manhã',
    objective: 'hipertrofia',
    dayOfWeek: 0
  },
  {
    id: 'mh0_2',
    name: 'Carne com Arroz e Salada',
    calories: 580,
    description: 'Carne (180g), arroz integral (70g) e salada (150g).',
    recipe: 'Assar ou grelhar a carne e servir com arroz e salada.',
    imageUrl: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=400',
    time: 'Almoço',
    objective: 'hipertrofia',
    dayOfWeek: 0
  },
  {
    id: 'mh0_3',
    name: 'Sopa de Legumes Hipercalórica',
    calories: 420,
    description: 'Sopa de legumes (250g).',
    recipe: 'Cozinhar tudo em água e temperos naturais.',
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=400',
    time: 'Jantar',
    objective: 'hipertrofia',
    dayOfWeek: 0
  },
];

export const MOTIVATIONAL_QUOTES = [
  "O único treino ruim é aquele que não aconteceu.",
  "Sua única competição é quem você era ontem.",
  "A disciplina é a ponte entre metas e realizações.",
  "Não pare quando estiver cansado, pare quando tiver terminado.",
  "O suor de hoje é o sorriso de amanhã.",
  "Transforme sua dor em poder.",
  "O corpo alcança o que a mente acredita."
];
