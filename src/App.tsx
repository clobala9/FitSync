/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Dumbbell, 
  Utensils, 
  TrendingUp, 
  Home, 
  ChevronRight, 
  Play, 
  Clock, 
  CheckCircle2, 
  MoreVertical, 
  ThumbsUp, 
  ShieldAlert, 
  X,
  LogOut,
  Target,
  LayoutGrid,
  ArrowRight,
  Pause,
  RotateCcw,
  Video,
  Flame,
  Zap,
  Trophy,
  Star,
  Reply,
  MoreHorizontal,
  Settings,
  User as UserIcon,
  Music,
  Plus,
  RefreshCw,
  Eye,
  EyeOff,
  Apple
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, Toaster } from 'sonner';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { User, WorkoutPlanSheet, EvolutionSheet, WeightEntry, PhotoEntry, MeasurementsEntry, NutritionPlanSheet } from './types';
import { MOCK_EXERCISES, MOCK_MEALS } from './mockData';
import { generateWorkoutPlan } from './services/workoutService';
import { generateNutritionPlan } from './services/nutritionService';
import { generateEvolutionSuggestions } from './services/evolutionService';
import { supabase } from './lib/supabase';
import { Camera, Ruler, History, LineChart } from 'lucide-react';

// --- Components ---

const ProfileMenuModal = ({ user, onEditProfile, onLogout, onClose }: any) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
    />
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="relative w-full max-w-sm glass border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl p-8 space-y-8"
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-24 h-24 rounded-full border-4 border-brand-500/30 p-1">
          <img src={user?.photoUrl} alt={user?.name} className="w-full h-full rounded-full object-cover shadow-2xl" />
        </div>
        <div>
          <h3 className="text-2xl font-black text-white tracking-tight">{user?.name}</h3>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{user?.email}</p>
        </div>
      </div>

      <div className="space-y-3">
        <button 
          onClick={() => { onEditProfile(); onClose(); }}
          className="w-full p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-brand-500/30 transition-all flex items-center gap-4 group"
        >
          <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-500 group-hover:scale-110 transition-transform">
            <UserIcon className="w-5 h-5" />
          </div>
          <div className="text-left">
            <p className="text-white font-black text-sm">Editar Perfil</p>
            <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Minha Ficha Técnica</p>
          </div>
        </button>

        <button 
          onClick={onLogout}
          className="w-full p-5 rounded-2xl bg-red-500/5 border border-red-500/10 hover:bg-red-500/10 hover:border-red-500/30 transition-all flex items-center gap-4 group"
        >
          <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
            <LogOut className="w-5 h-5" />
          </div>
          <div className="text-left">
            <p className="text-red-500 font-black text-sm">Sair da Conta</p>
            <p className="text-red-500/50 text-[10px] uppercase font-bold tracking-widest">Fazer Logoff</p>
          </div>
        </button>
      </div>

      <button 
        onClick={onClose}
        className="w-full py-4 text-slate-500 font-bold hover:text-white transition-colors text-sm uppercase tracking-widest"
      >
        Fechar
      </button>
    </motion.div>
  </div>
);

const NutritionGuideModal = ({ onClose }: any) => (
  <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
    />
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="relative w-full max-w-2xl bg-black border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col max-h-[85vh]"
    >
      <div className="p-8 md:p-12 overflow-y-auto custom-scrollbar space-y-10">
        <div className="space-y-2">
          <Badge variant="brand">Guia Oficial FitSync</Badge>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase">Pilares da Nutrição</h2>
          <p className="text-slate-400 font-medium">Domine sua alimentação para potencializar seus resultados.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass p-6 rounded-[2rem] border-white/5 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
              <Zap className="w-6 h-6" />
            </div>
            <h4 className="text-white font-black uppercase text-sm tracking-widest">Proteínas</h4>
            <p className="text-slate-400 text-sm leading-relaxed">Essencial para reconstrução muscular. Mantenha 1.6g a 2.2g por kg de peso corporal.</p>
          </div>

          <div className="glass p-6 rounded-[2rem] border-white/5 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
              <Flame className="w-6 h-6" />
            </div>
            <h4 className="text-white font-black uppercase text-sm tracking-widest">Carboidratos</h4>
            <p className="text-slate-400 text-sm leading-relaxed">Sua principal fonte de energia. Priorize carboidratos complexos (aveia, batata doce, arroz integral).</p>
          </div>

          <div className="glass p-6 rounded-[2rem] border-white/5 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <Plus className="w-6 h-6" />
            </div>
            <h4 className="text-white font-black uppercase text-sm tracking-widest">Gorduras Boas</h4>
            <p className="text-slate-400 text-sm leading-relaxed">Regulação hormonal e saúde. Aposte em abacate, azeite, castanhas e ovos.</p>
          </div>

          <div className="glass p-6 rounded-[2rem] border-white/5 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-500">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h4 className="text-white font-black uppercase text-sm tracking-widest">Hidratação</h4>
            <p className="text-slate-400 text-sm leading-relaxed">Fundamental para o metabolismo. Beba no mínimo 35ml de água por quilo de peso.</p>
          </div>
        </div>

        <div className="bg-brand-500/5 border border-brand-500/20 p-8 rounded-[2rem] space-y-4">
          <div className="flex items-center gap-3 text-brand-500">
            <Star className="w-6 h-6 fill-current" />
            <span className="font-black uppercase tracking-widest text-sm">Dica de Ouro</span>
          </div>
          <p className="text-white font-medium italic">"A consistência na dieta supera a perfeição ocasional. Planeje suas refeições com antecedência para evitar escolhas impulsivas."</p>
        </div>
      </div>

      <div className="p-8 bg-slate-900/50 border-t border-white/5">
        <Button onClick={onClose} className="w-full py-5 shadow-brand">Entendido, vamos focar!</Button>
      </div>
    </motion.div>
  </div>
);

const EvolutionView = ({ evolution, onUpdate, onClose }: { evolution: EvolutionSheet, onUpdate: (data: EvolutionSheet) => void, onClose: () => void }) => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'add'>('timeline');
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoEntry | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex justify-center p-4 md:p-12 overflow-y-auto overflow-x-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black w-full max-w-4xl rounded-[3rem] shadow-tech border border-brand-500/20 h-fit my-auto overflow-hidden flex flex-col min-h-[80vh]"
      >
        <div className="p-8 md:p-12 border-b border-white/5 flex justify-between items-start">
          <div className="space-y-4">
            <Badge variant="brand">Acompanhamento Físico</Badge>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">Ficha de Evolução</h2>
            <div className="flex gap-4">
              <button 
                onClick={() => setActiveTab('timeline')}
                className={`text-xs font-black uppercase tracking-widest pb-2 border-b-2 transition-all ${activeTab === 'timeline' ? 'border-brand-500 text-brand-500' : 'border-transparent text-slate-500'}`}
              >
                Histórico
              </button>
              <button 
                onClick={() => setActiveTab('add')}
                className={`text-xs font-black uppercase tracking-widest pb-2 border-b-2 transition-all ${activeTab === 'add' ? 'border-brand-500 text-brand-500' : 'border-transparent text-slate-500'}`}
              >
                Novo Registro
              </button>
            </div>
          </div>
          <button onClick={onClose} className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 hover:text-white transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 p-8 md:p-12">
          {activeTab === 'timeline' ? (
            <div className="space-y-12">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="glass p-6 rounded-3xl border-white/5 text-center">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Peso Atual</p>
                  <p className="text-3xl font-black text-white">{evolution.progresso.peso[evolution.progresso.peso.length-1]?.valor || '--'}kg</p>
                </div>
                <div className="glass p-6 rounded-3xl border-white/5 text-center">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Meta</p>
                  <p className="text-3xl font-black text-brand-500">{evolution.metas.peso_objetivo}kg</p>
                </div>
                <div className="glass p-6 rounded-3xl border-white/5 text-center">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Diferença</p>
                  <p className="text-3xl font-black text-slate-300">
                    {evolution.progresso.peso.length >= 2 
                      ? `${(evolution.progresso.peso[evolution.progresso.peso.length-1].valor - evolution.progresso.peso[0].valor).toFixed(1)}kg`
                      : '0kg'}
                  </p>
                </div>
                <div className="glass p-6 rounded-3xl border-white/5 text-center">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">IMC</p>
                  <p className="text-3xl font-black text-slate-300">
                    {evolution.progresso.peso.length > 0
                      ? (evolution.progresso.peso[evolution.progresso.peso.length-1].valor / Math.pow(evolution.usuario.altura/100, 2)).toFixed(1)
                      : '--'}
                  </p>
                </div>
              </div>

              {/* Suggestions */}
              <div className="p-8 rounded-[2.5rem] bg-brand-500/5 border border-brand-500/10 space-y-2">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-brand-400 fill-current" />
                  <h4 className="text-[10px] font-black text-brand-400 uppercase tracking-widest">Feedback do Sistema</h4>
                </div>
                <p className="text-slate-400 text-sm italic font-medium">"{evolution.sugestoes_automaticas || 'Complete seu primeiro registro para receber orientações.'}"</p>
              </div>

              {/* Body Photos */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Camera className="text-brand-500 w-5 h-5" />
                  <h3 className="text-xl font-black text-white">Fotos de Evolução</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {evolution.progresso.fotos.map((p, i) => (
                    <div 
                      key={i} 
                      onClick={() => setSelectedPhoto(p)}
                      className="group relative aspect-[3/4] rounded-3xl overflow-hidden glass border-white/10 cursor-pointer"
                    >
                      <img src={p.url} alt={p.descricao} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" referrerPolicy="no-referrer" />
                      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="text-[8px] font-black text-brand-500 uppercase tracking-widest">{p.data}</p>
                        <p className="text-[10px] text-white font-bold leading-tight line-clamp-1">{p.descricao}</p>
                      </div>
                    </div>
                  ))}
                  <button onClick={() => setActiveTab('add')} className="aspect-[3/4] rounded-3xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-2 text-slate-500 hover:border-brand-500/40 hover:text-brand-500 transition-all">
                    <Plus className="w-8 h-8" />
                    <span className="text-[10px] font-black uppercase">Nova Foto</span>
                  </button>
                </div>
              </div>

              {/* Measurements History */}
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Ruler className="text-brand-500 w-5 h-5" />
                  <h3 className="text-xl font-black text-white">Medidas Corporais</h3>
                </div>
                <div className="space-y-4">
                  {evolution.progresso.medidas.slice().reverse().map((m, i) => (
                    <div key={i} className="glass p-6 rounded-3xl border-white/5 grid grid-cols-2 md:grid-cols-5 gap-6 items-center">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Data</p>
                        <p className="text-lg font-black text-white">{m.data}</p>
                      </div>
                      <div className="space-y-1 text-center">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Braço</p>
                        <p className="text-lg font-black text-brand-400">{m.braco}cm</p>
                      </div>
                      <div className="space-y-1 text-center">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Peito</p>
                        <p className="text-lg font-black text-brand-400">{m.peito}cm</p>
                      </div>
                      <div className="space-y-1 text-center">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Cintura</p>
                        <p className="text-lg font-black text-brand-400">{m.cintura}cm</p>
                      </div>
                      <div className="space-y-1 text-center">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Perna</p>
                        <p className="text-lg font-black text-brand-400">{m.perna}cm</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto space-y-10">
              <div className="space-y-8">
                <h3 className="text-2xl font-black text-white tracking-tight">Novo Registro de Evolução</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Peso Atual (kg)</label>
                    <input type="number" id="new-weight" className="input-field py-4" placeholder="00.0" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Data do Registro</label>
                    <input type="date" id="new-date" className="input-field py-4" defaultValue={new Date().toISOString().split('T')[0]} />
                  </div>

                  <div className="col-span-full h-px bg-white/5 my-4" />
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Medida Braço (cm)</label>
                    <input type="number" id="m-braco" className="input-field" placeholder="00" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Medida Peito (cm)</label>
                    <input type="number" id="m-peito" className="input-field" placeholder="00" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Medida Cintura (cm)</label>
                    <input type="number" id="m-cintura" className="input-field" placeholder="00" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Medida Perna (cm)</label>
                    <input type="number" id="m-perna" className="input-field" placeholder="00" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Foto de Evolução</label>
                    <div 
                      onClick={() => {
                        const proceed = window.confirm("FitSync deseja acessar sua câmera e galeria para registrar sua evolução. Permitir?");
                        if (proceed) {
                          fileInputRef.current?.click();
                        }
                      }}
                      className="w-full h-48 rounded-3xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-2 text-slate-500 hover:border-brand-500/40 hover:text-brand-500 transition-all cursor-pointer overflow-hidden relative group bg-white/5"
                    >
                      {photoPreview ? (
                        <div className="w-full h-full relative">
                          <img src={photoPreview} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <RefreshCw className="w-8 h-8 text-white" />
                          </div>
                        </div>
                      ) : (
                        <>
                          <Camera className="w-8 h-8" />
                          <span className="text-[10px] font-black uppercase">Tirar Foto ou Galeria</span>
                        </>
                      )}
                    </div>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*" 
                      capture="environment"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setPhotoPreview(reader.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Observações deste Registro</label>
                  <textarea id="e-obs" className="input-field min-h-[100px] py-4" placeholder="Como você se sente hoje?"></textarea>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button className="flex-1 py-5 shadow-brand" icon={CheckCircle2} onClick={async () => {
                    const weightVal = (document.getElementById('new-weight') as HTMLInputElement).value;
                    const dateVal = (document.getElementById('new-date') as HTMLInputElement).value;
                    const braco = (document.getElementById('m-braco') as HTMLInputElement).value;
                    const peito = (document.getElementById('m-peito') as HTMLInputElement).value;
                    const cintura = (document.getElementById('m-cintura') as HTMLInputElement).value;
                    const perna = (document.getElementById('m-perna') as HTMLInputElement).value;
                    const photoUrl = photoPreview;
                    const obs = (document.getElementById('e-obs') as HTMLTextAreaElement).value;

                    if (!weightVal || !dateVal) {
                      toast.error("Peso e data são obrigatórios.");
                      return;
                    }

                    const newWeight: WeightEntry = { data: dateVal, valor: Number(weightVal) };
                    const newEvolution = { ...evolution };
                    newEvolution.progresso.peso.push(newWeight);

                    if (braco || peito || cintura || perna) {
                       const newMeasurements: MeasurementsEntry = {
                         data: dateVal,
                         braco: Number(braco) || 0,
                         peito: Number(peito) || 0,
                         cintura: Number(cintura) || 0,
                         perna: Number(perna) || 0
                       };
                       newEvolution.progresso.medidas.push(newMeasurements);
                    }

                    if (photoUrl) {
                      const newPhoto: PhotoEntry = {
                        data: dateVal,
                        url: photoUrl,
                        descricao: obs || "Registro de progresso"
                      };
                      newEvolution.progresso.fotos.push(newPhoto);
                    }

                    newEvolution.observacoes = obs;
                    
                    toast.loading("IA analisando seu progresso...");
                    const suggestion = await generateEvolutionSuggestions(newEvolution);
                    newEvolution.sugestoes_automaticas = suggestion;
                    
                    onUpdate(newEvolution);
                    setActiveTab('timeline');
                    setPhotoPreview(null);
                    toast.dismiss();
                    toast.success("Evolução registrada com sucesso!");
                  }}>
                    Registrar Evolução
                  </Button>
                  <button onClick={() => setActiveTab('timeline')} className="px-10 py-5 rounded-2xl bg-white/5 text-slate-400 font-bold hover:bg-white/10 transition-all">Cancelar</button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Photo Lightbox */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-6"
              onClick={() => setSelectedPhoto(null)}
            >
              <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-10">
                <X className="w-10 h-10" />
              </button>
              <motion.div 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="max-w-4xl w-full h-[70vh] md:h-[80vh] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 bg-slate-900"
                onClick={e => e.stopPropagation()}
              >
                <img src={selectedPhoto.url} className="w-full h-full object-contain" />
              </motion.div>
              <div className="mt-8 text-center space-y-2 bg-black/50 p-6 rounded-3xl backdrop-blur-md border border-white/5">
                <p className="text-brand-500 font-black uppercase tracking-widest text-sm">{selectedPhoto.data}</p>
                <h4 className="text-2xl font-black text-white">{selectedPhoto.descricao}</h4>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

const WorkoutPlanSheetContent = ({ sheet, onComplete, activeDay }: { sheet: WorkoutPlanSheet, onComplete: any, activeDay: number }) => (
  <div className="space-y-10">
    <div className="space-y-4">
      <Badge variant="brand">Personal Trainer AI</Badge>
      <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">{sheet.tipo_treino}</h2>
      <div className="flex items-center gap-3">
        <div className="h-1 w-12 bg-brand-500 rounded-full" />
        <p className="text-brand-400 font-black uppercase tracking-[0.2em] text-xs">{sheet.objetivo}</p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {sheet.dias.map((dia, idx) => (
        <div key={idx} className="glass rounded-[2.5rem] border-white/5 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-white/5 bg-brand-500/5">
            <p className="text-[10px] font-black text-brand-500 uppercase tracking-widest mb-1">Dia {dia.dia}</p>
            <h3 className="text-xl font-black text-white uppercase">{dia.foco}</h3>
          </div>
          <div className="p-6 space-y-4 flex-1">
            {dia.exercicios.map((ex, eIdx) => (
              <div key={eIdx} className="flex justify-between items-start gap-4">
                <div className="space-y-1">
                  <p className="text-white font-bold uppercase text-sm leading-tight">{ex.nome}</p>
                  <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest">{ex.grupo_muscular} • {ex.tipo}</p>
                </div>
                <div className="text-right">
                  <p className="text-brand-500 font-black text-xs leading-none mb-1">{ex.series}X{ex.repeticoes}</p>
                  <p className="text-[8px] text-brand-500/40 font-bold uppercase tracking-widest font-mono">{ex.descanso}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>

    <div className="p-8 rounded-[2.5rem] bg-brand-500/5 border border-brand-500/10 space-y-4">
      <div className="flex items-center gap-2">
        <ShieldAlert className="w-4 h-4 text-brand-400" />
        <h4 className="text-[10px] font-black text-brand-400 uppercase tracking-widest">Observações do Trainer</h4>
      </div>
      <p className="text-slate-400 text-sm leading-relaxed font-medium italic">"{sheet.observacoes}"</p>
    </div>

    <div className="pt-6">
      <Button 
        variant="primary" 
        className="w-full py-6 shadow-brand text-lg" 
        icon={CheckCircle2}
        onClick={() => onComplete(activeDay, "Parabéns! Treino da IA concluído com sucesso.")}
      >
        Finalizar Treino de Hoje
      </Button>
    </div>
  </div>
);


const NutritionPlanSheetContent = ({ sheet, onComplete, activeDay }: { sheet: NutritionPlanSheet, onComplete: any, activeDay: number }) => (
  <div className="space-y-10">
    <div className="space-y-4">
      <Badge variant="brand">Nutricionista IA</Badge>
      <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none">{sheet.tipo_dieta}</h2>
      <div className="flex items-center gap-3">
        <div className="h-1 w-12 bg-brand-500 rounded-full" />
        <p className="text-brand-400 font-black uppercase tracking-[0.2em] text-xs">{sheet.objetivo}</p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {sheet.dias.map((dia, idx) => (
        <div key={idx} className="glass rounded-[2.5rem] border-white/5 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-white/5 bg-brand-500/5">
            <p className="text-[10px] font-black text-brand-500 uppercase tracking-widest mb-1">Dia {dia.dia}</p>
            <h3 className="text-xl font-black text-white uppercase">Planejamento Diário</h3>
          </div>
          <div className="p-6 space-y-8 flex-1">
            {dia.refeicoes.map((ref, rIdx) => (
              <div key={rIdx} className="space-y-3">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <Badge variant="slate" className="bg-white/5 text-slate-400 border-white/10 text-[8px]">{ref.horario}</Badge>
                    <p className="text-white font-bold uppercase text-sm leading-tight">{ref.nome}</p>
                    <p className="text-slate-400 text-xs leading-relaxed">{ref.descricao}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-brand-500 font-black text-xs leading-none mb-1">{ref.kcal} KCAL</p>
                  </div>
                </div>
                <div className="flex gap-3 pt-1">
                  <div className="text-[8px] font-black uppercase tracking-widest text-slate-500">P: <span className="text-white">{ref.macros.proteina}</span></div>
                  <div className="text-[8px] font-black uppercase tracking-widest text-slate-500">C: <span className="text-white">{ref.macros.carboidrato}</span></div>
                  <div className="text-[8px] font-black uppercase tracking-widest text-slate-500">G: <span className="text-white">{ref.macros.gordura}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>

    <div className="p-8 rounded-[2.5rem] bg-brand-500/5 border border-brand-500/10 space-y-4">
      <div className="flex items-center gap-2">
        <ShieldAlert className="w-4 h-4 text-brand-400" />
        <h4 className="text-[10px] font-black text-brand-400 uppercase tracking-widest">Observações do Nutricionista</h4>
      </div>
      <p className="text-slate-400 text-sm leading-relaxed font-medium italic">"{sheet.observacoes}"</p>
    </div>

    <div className="pt-6">
      <Button 
        variant="primary" 
        className="w-full py-6 shadow-brand text-lg" 
        icon={CheckCircle2}
        onClick={() => onComplete(activeDay, "Excelente! Dieta da IA seguida com sucesso.")}
      >
        Finalizar Dieta de Hoje
      </Button>
    </div>
  </div>
);

const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false, icon: Icon }: any) => {
  const variants: any = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    outline: "border-2 border-brand-500 text-brand-500 hover:bg-brand-500/10 px-8 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2",
    ghost: "text-slate-400 hover:bg-white/5 px-8 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2",
    danger: "bg-red-600 text-white font-bold px-8 py-4 rounded-2xl hover:bg-red-700 transition-all shadow-lg shadow-red-600/20 flex items-center justify-center gap-2"
  };

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={`${variants[variant]} ${className}`}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </button>
  );
};

const Card = ({ children, className = "", noPadding = false, hover = true, ...props }: any) => (
  <div 
    className={`glass rounded-[2.5rem] border border-white/40 overflow-hidden ${hover ? 'card-hover' : ''} ${noPadding ? '' : 'p-8 md:p-10'} ${className}`}
    {...props}
  >
    {children}
  </div>
);

const Badge = ({ children, variant = 'brand', className = '' }: any) => {
  const variants: any = {
    brand: "bg-gradient-to-br from-[#ff5e33] to-[#cb410b] text-white border-none shadow-tech",
    blue: "bg-brand-50 text-brand-600 border-brand-100",
    orange: "bg-brand-50 text-brand-600 border-brand-100",
    red: "bg-red-50 text-red-600 border-red-100",
    slate: "bg-slate-100 text-slate-600 border-slate-200"
  };

  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

// --- Views ---

const AuthView = ({ authMode, setAuthMode, authData, setAuthData, handleAuthSubmit, handleSocialLogin }: any) => {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const isEmailValid = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormValid = authMode === 'login' 
    ? (isEmailValid(authData.email) && authData.password.length >= 6)
    : (authData.name && isEmailValid(authData.email) && authData.password.length >= 6 && authData.password === confirmPassword);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    setIsLoading(true);
    await handleAuthSubmit();
    setIsLoading(false);
  };

  const handleForgotPassword = async () => {
    if (!isEmailValid(authData.email)) {
      toast.error("Insira um e-mail válido para recuperar a senha.");
      return;
    }
    setIsLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(authData.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setIsLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      setResetEmailSent(true);
      toast.success("E-mail de recuperação enviado!");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 md:p-6 font-sans relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="w-full max-w-[400px] flex flex-col items-center gap-6 relative z-10">
        {/* Main Auth Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full glass border border-white/10 p-10 md:p-12 space-y-10 rounded-[3rem] shadow-tech"
        >
          <div className="flex flex-col items-center space-y-8">
            <h1 className="text-5xl font-black tracking-tighter bg-gradient-to-r from-[#ff5e33] to-[#cb410b] bg-clip-text text-transparent select-none uppercase">FitSync</h1>
            
            {resetEmailSent ? (
              <div className="text-center space-y-6 py-4">
                <div className="w-20 h-20 bg-brand-500/10 text-brand-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-tech">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-black text-white uppercase tracking-tight">E-mail Enviado</h3>
                <p className="text-sm text-slate-400 leading-relaxed font-medium">Verifique sua caixa de entrada para redefinir sua senha.</p>
                <button 
                  onClick={() => setResetEmailSent(false)}
                  className="text-xs font-black text-brand-500 uppercase tracking-widest hover:text-white transition-colors mt-6"
                >
                  Voltar para o login
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="w-full space-y-4">
                {authMode === 'signup' && (
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Nome</label>
                    <input 
                      type="text" 
                      placeholder="Seu nome completo"
                      required
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm text-white focus:outline-none focus:border-brand-500/50 transition-all placeholder:text-slate-600 font-medium"
                      value={authData.name}
                      onChange={(e) => setAuthData({...authData, name: e.target.value})}
                    />
                  </div>
                )}
                
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">E-mail</label>
                  <input 
                    type="email" 
                    placeholder="exemplo@email.com"
                    required
                    className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm text-white focus:outline-none focus:border-brand-500/50 transition-all placeholder:text-slate-600 font-medium"
                    value={authData.email}
                    onChange={(e) => setAuthData({...authData, email: e.target.value})}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Senha</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      placeholder="••••••••"
                      required
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm text-white focus:outline-none focus:border-brand-500/50 transition-all pr-14 placeholder:text-slate-600 font-medium"
                      value={authData.password}
                      onChange={(e) => setAuthData({...authData, password: e.target.value})}
                    />
                    {authData.password && (
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 text-[10px] font-black uppercase tracking-widest hover:text-brand-500 transition-colors"
                      >
                        {showPassword ? 'Ocultar' : 'Ver'}
                      </button>
                    )}
                  </div>
                </div>

                {authMode === 'signup' && (
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Confirmar Senha</label>
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      required
                      className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-sm text-white focus:outline-none focus:border-brand-500/50 transition-all placeholder:text-slate-600 font-medium"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={!isFormValid || isLoading}
                  className={`w-full py-5 rounded-[1.5rem] text-sm font-black text-white uppercase tracking-widest transition-all mt-6 flex items-center justify-center gap-3 shadow-brand ${isFormValid && !isLoading ? 'bg-gradient-to-r from-[#ff5e33] to-[#cb410b] hover:brightness-110 active:scale-95' : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5'}`}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    authMode === 'signup' ? 'Criar Minha Conta' : 'Acessar FitSync'
                  )}
                </button>

                {authMode === 'login' && (
                  <div className="text-center pt-6">
                    <button 
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-[10px] font-black text-slate-600 uppercase tracking-widest hover:text-brand-500 transition-colors"
                    >
                      Esqueceu sua senha?
                    </button>
                  </div>
                )}
              </form>
            )}
          </div>
        </motion.div>

        {/* Guest Access & Toggle Auth Box */}
        <div className="w-full space-y-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full glass border border-white/10 p-6 flex flex-col items-center gap-4 rounded-[2rem] shadow-tech"
          >
            <p className="text-xs font-medium text-slate-400">
              {authMode === 'login' ? 'Ainda não é membro?' : 'Já possui uma conta?'}
              <button 
                onClick={() => {
                  setAuthMode(authMode === 'login' ? 'signup' : 'login');
                  setResetEmailSent(false);
                }}
                className="ml-2 text-brand-500 font-black uppercase tracking-widest hover:text-white transition-colors"
              >
                {authMode === 'login' ? 'Cadastre-se' : 'Entrar'}
              </button>
            </p>


          </motion.div>
        </div>
      </div>
    </div>
  );
};


const UserDataForm = ({ user, authData, setAuthData, onSave, onCancel }: any) => (

  <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-xl flex justify-center p-4 md:p-12 overflow-y-auto">
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black w-full max-w-2xl rounded-[3rem] shadow-tech border border-brand-500/20 h-fit my-auto overflow-hidden p-8 md:p-12 space-y-10"
    >
      <div className="space-y-2">
        <Badge variant="brand">Configuração Técnica</Badge>
        <h2 className="text-4xl font-black text-white tracking-tighter uppercase">Minha Ficha</h2>
        <p className="text-slate-400 font-medium">Dados essenciais para que o Trainer gere seu treino.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Idade</label>
          <input type="number" className="input-field" value={authData.age} onChange={e => setAuthData({...authData, age: e.target.value})} />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Altura (cm)</label>
          <input type="number" className="input-field" value={authData.height} onChange={e => setAuthData({...authData, height: e.target.value})} />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Peso (kg)</label>
          <input type="number" className="input-field" value={authData.weight} onChange={e => setAuthData({...authData, weight: e.target.value})} />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Intensidade/Nível</label>
          <select className="input-field appearance-none cursor-pointer" value={authData.level} onChange={e => setAuthData({...authData, level: e.target.value})}>
            <option value="iniciante">Iniciante</option>
            <option value="intermediario">Intermediário</option>
            <option value="avancado">Avançado</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Dias/Semana</label>
          <input type="number" className="input-field" value={authData.trainingDays} onChange={e => setAuthData({...authData, trainingDays: e.target.value})} />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Minutos/Treino</label>
          <input type="number" className="input-field" value={authData.availableTime} onChange={e => setAuthData({...authData, availableTime: e.target.value})} />
        </div>
        <div className="col-span-full space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Objetivo Principal</label>
          <select className="input-field appearance-none cursor-pointer" value={authData.goal} onChange={e => setAuthData({...authData, goal: e.target.value})}>
            <option value="hipertrofia">Hipertrofia Muscular</option>
            <option value="emagrecimento">Emagrecimento / Cardio</option>
            <option value="definicao">Definição Muscular</option>
          </select>
        </div>
        <div className="col-span-full space-y-2">
          <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Alguma Lesão ou Limitação?</label>
          <input type="text" className="input-field" placeholder="Ex: dor no joelho, ombro (opcional)" value={authData.injuries} onChange={e => setAuthData({...authData, injuries: e.target.value})} />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 pt-6">
        <Button className="flex-1 py-5 shadow-brand" onClick={onSave} icon={CheckCircle2}>Salvar e Continuar</Button>
        <button onClick={onCancel} className="px-10 py-5 rounded-2xl bg-white/5 text-slate-400 font-bold hover:bg-white/10 transition-all">Cancelar</button>
      </div>
    </motion.div>
  </div>
);

const PlaylistsView = () => (
  <div className="space-y-10">
    <div className="space-y-2 px-2">
      <h3 className="text-3xl font-black text-white tracking-tight">Playlists</h3>
      <p className="text-slate-500 text-xs font-black uppercase tracking-widest">Músicas para seu treino</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {[
        { 
          name: 'Sertanejo', 
          tracks: 50, 
          color: 'from-orange-500 to-yellow-600', 
          img: 'https://picsum.photos/seed/sertanejo/400/400',
          url: 'https://open.spotify.com/playlist/6wwx0B9KmT6fv97pflkQ9m?si=1XdadKNMQamicMLmB3-1JA&pi=f2DItbK0SL-0C'
        },
        { 
          name: 'Funk', 
          tracks: 45, 
          color: 'from-purple-600 to-pink-600', 
          img: 'https://picsum.photos/seed/funk/400/400',
          url: 'https://open.spotify.com/playlist/4JJtR5x841nFyieQjo7DXR?si=Ugug5KwUTj-yyc5XGJQMdg&pi=jNIN_ZwTTNmna'
        },
        { 
          name: 'Traps', 
          tracks: 38, 
          color: 'from-slate-800 to-indigo-900', 
          img: 'https://picsum.photos/seed/trap/400/400',
          url: 'https://open.spotify.com/playlist/60kFw9AdUKgAB6sBosALP6?si=7daPGF1yTV2I83ZIkQY19g&pi=S5uoxqs8QOKQ2'
        },
        { 
          name: 'Internacionais', 
          tracks: 60, 
          color: 'from-cyan-500 to-blue-600', 
          img: 'https://picsum.photos/seed/international/400/400',
          url: 'https://open.spotify.com/playlist/75XRXDivhDae6Oz5puUPF6?si=XEgz9MwOTOOrxzuUMUoUVQ&pi=x6uGQtN1Qya6q'
        },
        { 
          name: 'Internacionais 2.0', 
          tracks: 75, 
          color: 'from-blue-600 to-purple-700', 
          img: 'https://picsum.photos/seed/inter2/400/400',
          url: 'https://open.spotify.com/playlist/4Ox9PVNNMSynEhL84kHP25?si=cXounmEAQOCigkaICj5tNQ&pi=OYnevZo6SR23r'
        },
        { 
          name: 'Gospel', 
          tracks: 42, 
          color: 'from-emerald-400 to-teal-500', 
          img: 'https://picsum.photos/seed/gospel/400/400',
          url: 'https://open.spotify.com/playlist/5uz2ooMczRwmVFF9blJtwV?si=6ZiTMsYxRlu75zchBugvkg&pi=_gGbY7inQzK2l'
        },
        { 
          name: 'Rock', 
          tracks: 55, 
          color: 'from-zinc-900 to-red-900', 
          img: 'https://picsum.photos/seed/rock/400/400',
          url: 'https://open.spotify.com/playlist/4QQDhUVWM96xllUZluhVHp?si=FCUz6QKnRYaAAXE9zbBBuA&pi=r3eLUdi2RsKQ-'
        },
        { 
          name: 'Pop', 
          tracks: 65, 
          color: 'from-pink-400 to-rose-500', 
          img: 'https://picsum.photos/seed/pop/400/400',
          url: 'https://open.spotify.com/playlist/07Wi7ImNU2TRrSkDTwhhsi?si=M5PQxd38QUGtbUYGx8e0tA&pi=9W5-xKccS7yuk'
        },
        { 
          name: 'Jazz', 
          tracks: 40, 
          color: 'from-amber-900 to-slate-900', 
          img: 'https://picsum.photos/seed/jazz/400/400',
          url: 'https://open.spotify.com/playlist/0JKQMbrMBOU9ouqVmEDEvG?si=YGvnqrjXQeeeFUz5IlHCrw&pi=ZBAqnCkbTl2Pi'
        },
        { 
          name: 'MPB', 
          tracks: 48, 
          color: 'from-green-600 to-yellow-500', 
          img: 'https://picsum.photos/seed/mpb/400/400',
          url: 'https://open.spotify.com/playlist/5nRXKgLMKprqLJF2Dl0EVK?si=gqHyBlAFT5O-WI_n_VIhfA&pi=A8i9Z-YNShuHb'
        },
      ].map((p, i) => (
        <Card 
          key={i} 
          noPadding 
          className="group cursor-pointer"
          onClick={() => p.url && window.open(p.url, '_blank')}
        >
          <div className="relative aspect-video overflow-hidden">
            <img src={p.img} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
            <div className={`absolute inset-0 bg-gradient-to-t ${p.color} opacity-60 group-hover:opacity-40 transition-opacity`} />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl">
                <Play className="text-black w-10 h-10 fill-current ml-1" />
              </div>
            </div>
            <div className="absolute bottom-6 left-8 right-8">
              <h4 className="text-3xl font-black text-white tracking-tight mb-1 notranslate">{p.name}</h4>
              <p className="text-white/80 font-bold uppercase tracking-widest text-xs">{p.tracks} Músicas</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

const Dashboard = ({ 
  user, 
  progressData, 
  progressNutritionData,
  activeTab, 
  setActiveTab, 
  workoutInProgress, 
  setWorkoutInProgress, 
  activeDay, 
  onComplete, 
  onShowSheet, 
  onShowEvolution,
  hasWorkoutSheet,
  onResetPlan,
  onShowProfile
}: any) => {
  return (
    <div className="space-y-8 max-w-md mx-auto pb-12">
      <div className="px-2 flex items-center justify-between mt-4">
        <div className="space-y-1">
          <h2 className="text-4xl font-black text-white tracking-tight">Olá, {user?.name}!</h2>
          <p className="text-slate-400 text-xl font-medium">Vamos focar hoje?</p>
        </div>
        <button 
          onClick={onShowProfile}
          className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-brand-500 hover:bg-brand-500/10 transition-all active:scale-90"
        >
          <Settings className="w-7 h-7" />
        </button>
      </div>

      {/* Workout Banners */}
      <div className="px-2 space-y-4">
        {!workoutInProgress ? (
          <button 
            onClick={() => setWorkoutInProgress(true)}
            className="w-full p-6 rounded-[2rem] bg-black border-2 border-brand-500 text-brand-500 font-black uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-3 shadow-tech"
          >
            <Play className="w-6 h-6 fill-current" />
            <span className="bg-gradient-to-r from-[#ff5e33] to-[#cb410b] bg-clip-text text-transparent">Iniciar Treino</span>
          </button>
        ) : (
          <button 
            onClick={() => {
              onComplete(activeDay, "Parabéns pelo foco de hoje!");
              setWorkoutInProgress(false);
            }}
            className="w-full p-6 rounded-[2rem] bg-black border-2 border-brand-500 text-brand-500 font-black uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-3 shadow-tech"
          >
            <CheckCircle2 className="w-6 h-6" />
            <span className="bg-gradient-to-r from-[#ff5e33] to-[#cb410b] bg-clip-text text-transparent">Finalizar Treino</span>
          </button>
        )}

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={onShowSheet}
            className="w-full p-5 rounded-[2rem] bg-black border-2 border-brand-500 text-brand-500 font-black uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-3 shadow-tech"
          >
            <LayoutGrid className="w-5 h-5" />
            <span className="bg-gradient-to-r from-[#ff5e33] to-[#cb410b] bg-clip-text text-transparent text-sm">
              {hasWorkoutSheet ? 'Meu Treino' : 'Ficha'}
            </span>
          </button>

          <button 
            onClick={onShowEvolution}
            className="w-full p-5 rounded-[2rem] bg-black border-2 border-brand-500 text-brand-500 font-black uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-3 shadow-tech"
          >
            <TrendingUp className="w-5 h-5" />
            <span className="bg-gradient-to-r from-[#ff5e33] to-[#cb410b] bg-clip-text text-transparent text-sm">Evolução</span>
          </button>
        </div>

        {hasWorkoutSheet && (
          <button 
            onClick={onResetPlan}
            className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-slate-500 font-black uppercase tracking-widest text-[10px] hover:text-brand-500 hover:border-brand-500/50 transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-3 h-3" />
            Trocar Plano de Treino
          </button>
        )}
      </div>

      {/* Health Stats Summary */}
      <div className="px-2 grid grid-cols-2 gap-4">
        <div className="glass p-6 rounded-[2.5rem] border-white/5 space-y-2">
          <div className="flex items-center gap-2 text-slate-500">
            <Ruler className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">IMC Estimado</span>
          </div>
          <p className="text-3xl font-black text-white">
            {user?.weight && user?.height ? (user.weight / ((user.height / 100) ** 2)).toFixed(1) : '--'}
          </p>
          <Badge variant="slate" className="text-[8px] bg-white/5 border-white/10">Peso: {user?.weight}kg</Badge>
        </div>
        <div className="glass p-6 rounded-[2.5rem] border-white/5 space-y-2">
          <div className="flex items-center gap-2 text-brand-500">
            <Target className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Meta</span>
          </div>
          <p className="text-xl font-black text-white capitalize">{user?.goal || 'Definir'}</p>
          <Badge variant="brand" className="text-[8px]">Nível {user?.level || 'Atleta'}</Badge>
        </div>
      </div>

      {/* Workout Progress Card */}
      <Card className="relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8">
          <Dumbbell className="text-brand-500/20 w-32 h-32 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-2xl font-black text-white tracking-tight">Progresso Semanal Treino</h3>
              <p className="text-slate-500 text-xs font-black uppercase tracking-widest mt-1">Calorias Queimadas</p>
            </div>
            <Badge variant="brand">META +15%</Badge>
          </div>
          
          <div className="h-64 w-full -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={progressData}>
                <defs>
                  <linearGradient id="colorKcal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff5e33" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#cb410b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '1.5rem',
                    padding: '1rem'
                  }}
                  itemStyle={{ color: '#ff5e33', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="kcal" 
                  stroke="url(#colorKcalStroke)" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorKcal)" 
                  animationDuration={2000}
                />
                <defs>
                  <linearGradient id="colorKcalStroke" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#ff5e33" />
                    <stop offset="100%" stopColor="#cb410b" />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>

      {/* Diet Progress Card */}
      <Card className="relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8">
          <Utensils className="text-brand-500/20 w-32 h-32 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-2xl font-black text-white tracking-tight">Progresso Semanal Dieta</h3>
              <p className="text-slate-500 text-xs font-black uppercase tracking-widest mt-1">Calorias Consumidas</p>
            </div>
            <Badge variant="brand">META +15%</Badge>
          </div>
          
          <div className="h-64 w-full -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={progressNutritionData}>
                <defs>
                  <linearGradient id="colorDiet" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff5e33" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#cb410b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '1.5rem',
                    padding: '1rem'
                  }}
                  itemStyle={{ color: '#ff5e33', fontWeight: 'bold' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="kcal" 
                  stroke="url(#colorDietStroke)" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorDiet)" 
                  animationDuration={2000}
                />
                <defs>
                  <linearGradient id="colorDietStroke" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#ff5e33" />
                    <stop offset="100%" stopColor="#cb410b" />
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>
    </div>
  );
};

const WorkoutPlan = ({ activeObjective, setActiveObjective, activeDay, setActiveDay, onComplete, hasAiPlan, onToggleAi }: any) => {
  const [timer, setTimer] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  const startTimer = (seconds: number) => {
    setTimer(seconds);
    setIsTimerActive(true);
  };

  const objectives = [
    { id: 'emagrecimento', label: 'EMAGRECIMENTO', icon: Flame },
    { id: 'definicao', label: 'DEFINICAO', icon: Zap },
    { id: 'hipertrofia', label: 'HIPERTROFIA', icon: Target }
  ];

  const days = [
    { id: 1, label: 'Seg' },
    { id: 2, label: 'Ter' },
    { id: 3, label: 'Qua' },
    { id: 4, label: 'Qui' },
    { id: 5, label: 'Sex' },
    { id: 6, label: 'Sáb' },
    { id: 0, label: 'Dom' }
  ];

  const filteredExercises = MOCK_EXERCISES.filter(ex => {
    if (ex.objective !== activeObjective) return false;
    if (activeObjective === 'emagrecimento' || activeObjective === 'definicao' || activeObjective === 'hipertrofia') {
      return ex.dayOfWeek === activeDay;
    }
    return true;
  });

  return (
    <div className="space-y-8 md:space-y-12">
      <header className="flex flex-col gap-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 md:gap-8">
          <div className="space-y-1 md:space-y-2">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">Treinos</h2>
            <p className="text-slate-400 text-lg md:text-xl font-medium">Foco na execução e constância.</p>
          </div>
          {hasAiPlan && (
            <button 
              onClick={onToggleAi}
              className="text-[10px] font-black text-brand-500 uppercase tracking-widest hover:text-white transition-colors"
            >
              Ver Treino da Ficha (IA)
            </button>
          )}
        </div>

        <div className="flex flex-col space-y-6">
          <div className="space-y-4">
            <p className="text-xs font-black text-slate-500 uppercase tracking-widest px-1">Seu Objetivo</p>
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {objectives.map((obj) => (
                <button
                  key={obj.id}
                  onClick={() => setActiveObjective(obj.id as any)}
                  className={`p-4 md:p-6 rounded-2xl md:rounded-[2rem] border transition-all duration-300 flex flex-col items-center gap-2 md:gap-3 ${
                    activeObjective === obj.id 
                    ? 'border-brand-500 text-brand-500 shadow-tech transition-all duration-500' 
                    : 'bg-slate-900/40 border-white/5 text-slate-500 hover:border-white/10'
                  }`}
                  style={activeObjective === obj.id ? { background: 'linear-gradient(135deg, rgba(203, 65, 11, 0.1) 0%, rgba(255, 94, 51, 0.05) 100%)' } : {}}
                >
                  <obj.icon className={`w-5 h-5 md:w-8 md:h-8 ${activeObjective === obj.id ? 'text-brand-500' : 'text-slate-600'}`} />
                  <span className={`text-[10px] md:text-sm font-black uppercase tracking-tight ${activeObjective === obj.id ? 'bg-gradient-to-r from-[#ff5e33] to-[#cb410b] bg-clip-text text-transparent' : ''}`}>{obj.label}</span>
                </button>
              ))}
            </div>
          </div>

          {(activeObjective === 'emagrecimento' || activeObjective === 'definicao' || activeObjective === 'hipertrofia') && (
            <div className="space-y-4">
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest px-1">Dia da Semana</p>
              <div className="grid grid-cols-7 gap-1.5 md:flex md:gap-2 pb-2">
                {days.map((day) => (
                  <button
                    key={day.id}
                    onClick={() => setActiveDay(day.id)}
                    className={`py-3 md:px-6 rounded-xl font-black text-[10px] md:text-xs transition-all text-center ${
                      activeDay === day.id 
                      ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20' 
                      : 'bg-slate-900/40 border-white/5 text-slate-400 hover:border-white/10'
                    }`}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {isTimerActive && (
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-32 left-1/2 -translate-x-1/2 z-50 glass p-6 md:p-10 rounded-[2.5rem] border-brand-500/50 shadow-2xl shadow-brand-500/20 flex items-center gap-6 md:gap-10 min-w-[300px] md:min-w-[450px]"
        >
          <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border-4 md:border-8 border-brand-500/20 flex items-center justify-center relative">
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle 
                cx="50%" cy="50%" r="45%" 
                className="fill-none stroke-brand-500 stroke-[4px] md:stroke-[8px]" 
                strokeDasharray="283" 
                strokeDashoffset={283 - (283 * timer) / 60}
              />
            </svg>
            <span className="text-2xl md:text-4xl font-black text-white">{timer}s</span>
          </div>
          <div className="flex-1">
            <p className="text-brand-400 font-black uppercase tracking-widest text-[10px] md:text-xs mb-1 md:mb-2">Tempo de Descanso</p>
            <h4 className="text-xl md:text-2xl font-black text-white tracking-tight">Recupere o fôlego!</h4>
          </div>
          <button 
            onClick={() => setIsTimerActive(false)}
            className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-red-950 hover:text-red-500 transition-all border border-white/5"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </motion.div>
      )}

      <div className="grid grid-cols-1 gap-6 md:gap-10">
        {filteredExercises.length > 0 ? (
          filteredExercises.map((ex, idx) => (
            <Card key={ex.id} noPadding className={`flex flex-col ${activeObjective === 'emagrecimento' ? '' : 'lg:flex-row'} group overflow-hidden border-white/5`}>
              <div className={`w-full ${activeObjective === 'emagrecimento' ? '' : 'lg:w-[450px]'} aspect-video bg-slate-900 relative`}>
                {ex.videoUrl.includes('youtu.be') || ex.videoUrl.includes('youtube.com') ? (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-4 bg-slate-950">
                    <div className="w-16 h-16 rounded-full bg-brand-500/10 flex items-center justify-center text-brand-500">
                      <Video className="w-8 h-8" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-white font-black uppercase tracking-widest text-xs">Vídeo de Execução</p>
                      <a 
                        href={ex.videoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-brand-400 hover:text-brand-300 font-bold transition-colors group/link"
                      >
                        Clique aqui para assistir
                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                ) : (
                  <iframe 
                    src={ex.videoUrl} 
                    className="w-full h-full border-none opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                    allow="autoplay; fullscreen; picture-in-picture"
                  />
                )}
                <div className="absolute top-4 left-4 md:top-6 md:left-6">
                  <Badge className="bg-brand-500 text-white border-none shadow-lg px-4 md:px-6 py-1.5 md:py-2 text-[10px] md:text-xs">EXERCÍCIO {idx + 1}</Badge>
                </div>
              </div>
              <div className={`flex-1 ${activeObjective === 'emagrecimento' ? 'p-4 md:p-12' : 'p-6 md:p-12'} flex flex-col justify-between bg-slate-900/40`}>
                <div className={`${activeObjective === 'emagrecimento' ? 'space-y-4 md:space-y-8' : 'space-y-6 md:space-y-8'}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1 md:space-y-2">
                      <h3 className={`${activeObjective === 'emagrecimento' ? 'text-xl md:text-4xl' : 'text-2xl md:text-4xl'} font-black text-white tracking-tight leading-tight`}>{ex.name}</h3>
                      <div className="flex flex-wrap items-center gap-2 md:gap-3">
                        <Badge variant="slate" className="bg-white/5 text-slate-300 border-white/10 text-[10px] md:text-xs">Objetivo: {ex.objective}</Badge>
                        {ex.rest > 0 && (
                          <div className="flex items-center gap-1 text-slate-500 font-bold text-[10px] md:text-xs uppercase tracking-widest">
                            <Clock className="w-3 h-3 md:w-3.5 md:h-3.5" /> {ex.rest}s descanso
                          </div>
                        )}
                      </div>
                    </div>
                    <motion.button 
                      className={`${activeObjective === 'emagrecimento' ? 'w-10 h-10 md:w-16 md:h-16' : 'w-12 h-12 md:w-16 md:h-16'} rounded-xl md:rounded-[1.5rem] bg-brand-500/10 flex items-center justify-center text-brand-400 shadow-sm hover:bg-brand-500/20 transition-all shrink-0`}
                    >
                      <Play className={`${activeObjective === 'emagrecimento' ? 'w-5 h-5 md:w-8 md:h-8' : 'w-6 h-6 md:w-8 md:h-8'} fill-current`} />
                    </motion.button>
                  </div>

                  <div className={`grid grid-cols-3 ${activeObjective === 'emagrecimento' ? 'gap-2 md:gap-6' : 'gap-3 md:gap-6'}`}>
                    {[
                      { label: 'Séries', value: ex.series, icon: TrendingUp },
                      { label: 'Reps', value: ex.reps, icon: Dumbbell },
                      { label: 'Descanso', value: ex.rest > 0 ? `${ex.rest}s` : '-' , icon: Clock }
                    ].map((item, i) => (
                      <div key={i} className={`bg-slate-900/50 ${activeObjective === 'emagrecimento' ? 'p-2 md:p-6' : 'p-3 md:p-6'} rounded-xl md:rounded-[2rem] border border-white/5 text-center group/item hover:bg-slate-800 transition-all duration-500`}>
                        <p className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 md:mb-2">{item.label}</p>
                        <p className={`${activeObjective === 'emagrecimento' ? 'text-lg md:text-3xl' : 'text-xl md:text-3xl'} font-black text-white tracking-tight`}>{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`flex flex-col sm:flex-row ${activeObjective === 'emagrecimento' ? 'gap-2 md:gap-6 mt-4 md:mt-12' : 'gap-3 md:gap-6 mt-8 md:mt-12'}`}>
                  {ex.rest > 0 && (
                    <Button 
                      variant="outline" 
                      className={`flex-1 ${activeObjective === 'emagrecimento' ? 'py-3 md:py-5' : 'py-4 md:py-5'} text-sm md:text-lg`}
                      onClick={() => startTimer(ex.rest)}
                      icon={Clock}
                    >
                      Descanso
                    </Button>
                  )}
                  <Button 
                    variant={activeDay === new Date().getDay() ? "primary" : "outline"} 
                    disabled={activeDay !== new Date().getDay()}
                    className={`flex-1 ${activeObjective === 'emagrecimento' ? 'py-3 md:py-5' : 'py-4 md:py-5'} text-sm md:text-lg shadow-brand ${activeDay !== new Date().getDay() ? 'opacity-30' : ''}`} 
                    icon={activeDay === new Date().getDay() ? CheckCircle2 : Clock}
                    onClick={() => onComplete(activeDay, "Treino concluído com sucesso!")}
                  >
                    {activeDay === new Date().getDay() ? 'Concluir treino' : 'Bloqueado'}
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-20 glass rounded-[2.5rem] border border-white/5">
            <p className="text-slate-400 text-xl font-medium">Nenhum exercício encontrado para este dia.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const NutritionPlan = ({ activeObjective, setActiveObjective, activeDay, setActiveDay, onComplete, onShowGuide, hasAiPlan, onToggleAi }: any) => {
  const objectives = [
    { id: 'emagrecimento', label: 'EMAGRECIMENTO', icon: Flame },
    { id: 'definicao', label: 'DEFINICAO', icon: Zap },
    { id: 'hipertrofia', label: 'HIPERTROFIA', icon: Target }
  ];

  const days = [
    { id: 1, label: 'Seg' },
    { id: 2, label: 'Ter' },
    { id: 3, label: 'Qua' },
    { id: 4, label: 'Qui' },
    { id: 5, label: 'Sex' },
    { id: 6, label: 'Sáb' },
    { id: 0, label: 'Dom' }
  ];

  const filteredMeals = MOCK_MEALS.filter(meal => {
    if (meal.objective !== activeObjective) return false;
    if ((activeObjective === 'emagrecimento' || activeObjective === 'definicao' || activeObjective === 'hipertrofia') && meal.dayOfWeek !== undefined) {
      return meal.dayOfWeek === activeDay;
    }
    return true;
  });

  return (
    <div className="space-y-8 md:space-y-12">
      <header className="flex flex-col gap-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 md:gap-8">
          <div className="space-y-1 md:space-y-2">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">Refeições</h2>
            <p className="text-slate-400 text-lg md:text-xl font-medium">Nutrição estratégica para seu metabolismo.</p>
          </div>
          {hasAiPlan && (
            <button 
              onClick={onToggleAi}
              className="text-[10px] font-black text-brand-500 uppercase tracking-widest hover:text-white transition-colors"
            >
              Ver Dieta da Ficha (IA)
            </button>
          )}
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <p className="text-xs font-black text-slate-500 uppercase tracking-widest px-1">Seu Objetivo Nutricional</p>
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {objectives.map((obj) => (
                <button
                  key={obj.id}
                  onClick={() => setActiveObjective(obj.id as any)}
                  className={`p-4 md:p-6 rounded-2xl md:rounded-[2rem] border transition-all duration-300 flex flex-col items-center gap-2 md:gap-3 ${
                    activeObjective === obj.id 
                    ? 'border-brand-500 text-brand-500 shadow-tech transition-all duration-500' 
                    : 'bg-slate-900/40 border-white/5 text-slate-500 hover:border-white/10'
                  }`}
                  style={activeObjective === obj.id ? { background: 'linear-gradient(135deg, rgba(203, 65, 11, 0.1) 0%, rgba(255, 94, 51, 0.05) 100%)' } : {}}
                >
                  <obj.icon className={`w-5 h-5 md:w-8 md:h-8 ${activeObjective === obj.id ? 'text-brand-500' : 'text-slate-600'}`} />
                  <span className={`text-[10px] md:text-sm font-black uppercase tracking-tight ${activeObjective === obj.id ? 'bg-gradient-to-r from-[#ff5e33] to-[#cb410b] bg-clip-text text-transparent' : ''}`}>{obj.label}</span>
                </button>
              ))}
            </div>
          </div>

          {(activeObjective === 'emagrecimento' || activeObjective === 'definicao' || activeObjective === 'hipertrofia') && (
            <div className="space-y-4">
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest px-1">Plano Diário</p>
              <div className="grid grid-cols-7 gap-2">
                {days.map((day) => (
                  <button
                    key={day.id}
                    onClick={() => setActiveDay(day.id)}
                    className={`py-3 md:py-5 rounded-xl md:rounded-3xl border transition-all duration-300 flex flex-col items-center gap-1 ${
                      activeDay === day.id 
                      ? 'bg-brand-500 border-brand-500 text-white shadow-lg shadow-brand-500/20' 
                      : 'bg-slate-900/40 border-white/5 text-slate-400 hover:border-white/10'
                    }`}
                  >
                    <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">{day.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Featured Nutrition Section */}
    <Card noPadding className="relative group cursor-pointer border-white/5 shadow-xl overflow-hidden bg-slate-900/40">
      <div className="flex flex-col justify-center p-10 md:p-16">
        <div className="max-w-md space-y-4">
          <Badge className="bg-brand-500 text-white border-none shadow-brand px-4 py-1 w-fit">GUIA NUTRICIONAL</Badge>
          <h3 className="text-4xl font-black text-white tracking-tight">Nutrição & Dieta</h3>
          <p className="text-slate-300 font-medium">Aprenda a alimentar seu corpo para máxima performance.</p>
          <Button 
            variant="primary" 
            className="w-fit shadow-brand" 
            icon={ChevronRight}
            onClick={() => window.open('https://youtu.be/ywUuoTJJznA?si=Z1qNEw_UpigcRqt2', '_blank')}
          >
            Ver Dicas
          </Button>
        </div>
      </div>
    </Card>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
      {filteredMeals.length > 0 ? (
        filteredMeals.map((meal, idx) => (
          <Card key={idx} noPadding className="flex flex-col h-full group overflow-hidden border-white/5">
          <div className="p-6 md:p-12 flex-1 flex flex-col bg-slate-900/40">
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <Badge className="bg-slate-900/80 backdrop-blur-md text-white border-none shadow-xl px-4 md:px-6 py-1.5 md:py-2 text-[10px] md:text-xs">{meal.time}</Badge>
              <Badge className="bg-brand-500 text-white border-none shadow-xl px-4 md:px-6 py-1.5 md:py-2 text-[10px] md:text-xs">{meal.calories} KCAL</Badge>
            </div>
            <div className="flex-1 space-y-4 md:space-y-6">
              <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">{meal.name}</h3>
              <p className="text-slate-400 text-sm md:text-lg leading-relaxed">{meal.description}</p>
              
              <div className="bg-slate-900/50 p-6 md:p-8 rounded-2xl md:rounded-[2.5rem] border border-white/5 relative group/recipe">
                <div className="absolute -top-3 left-6 md:left-8">
                  <Badge variant="slate" className="bg-slate-800 shadow-sm text-slate-300 border-white/10 text-[8px] md:text-[10px]">PREPARO</Badge>
                </div>
                <p className="text-slate-300 text-sm md:text-lg font-medium italic leading-relaxed">"{meal.recipe}"</p>
              </div>
            </div>
            
            <div className="mt-8 md:mt-10 pt-6 md:pt-10 border-t border-white/5 flex items-center justify-between">
              <div className="flex gap-4 md:gap-6">
                <div>
                  <p className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest mb-0.5 md:mb-1">Proteína</p>
                  <p className="text-lg md:text-xl font-black text-white">35g</p>
                </div>
                <div>
                  <p className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest mb-0.5 md:mb-1">Carbs</p>
                  <p className="text-lg md:text-xl font-black text-white">45g</p>
                </div>
              </div>
              <Button 
                variant={activeDay === new Date().getDay() ? "primary" : "outline"} 
                disabled={activeDay !== new Date().getDay()}
                className={`px-6 md:px-10 py-3 md:py-4 text-sm md:text-base shadow-brand ${activeDay !== new Date().getDay() ? 'opacity-30' : ''}`} 
                icon={activeDay === new Date().getDay() ? CheckCircle2 : Clock}
                onClick={() => onComplete(activeDay, "Dieta concluída com sucesso!")}
              >
                {activeDay === new Date().getDay() ? 'Consumido' : 'Bloqueado'}
              </Button>
            </div>
          </div>
        </Card>
      ))
    ) : (
      <div className="col-span-full text-center py-20 glass rounded-[2.5rem] border border-white/5">
        <p className="text-slate-400 text-xl font-medium">Nenhuma refeição encontrada para este objetivo.</p>
      </div>
    )}
    </div>
  </div>
);
};

// --- Main App ---

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeObjective, setActiveObjective] = useState<'emagrecimento' | 'definicao' | 'hipertrofia'>('hipertrofia');
  const [activeDay, setActiveDay] = useState(new Date().getDay());
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [completedNutritionDays, setCompletedNutritionDays] = useState<number[]>([]);
  const [workoutInProgress, setWorkoutInProgress] = useState(false);
  const [workoutSheet, setWorkoutSheet] = useState<WorkoutPlanSheet | null>(() => {
    const cached = localStorage.getItem('fitsync_workout_sheet');
    return cached ? JSON.parse(cached) : null;
  });
  const [evolutionSheet, setEvolutionSheet] = useState<EvolutionSheet | null>(() => {
    const cached = localStorage.getItem('fitsync_evolution_sheet');
    return cached ? JSON.parse(cached) : null;
  });
  const [showEvolutionModal, setShowEvolutionModal] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNutritionGuide, setShowNutritionGuide] = useState(false);
  const [showAiPlan, setShowAiPlan] = useState(false);
  const [showAiNutritionPlan, setShowAiNutritionPlan] = useState(false);
  const [nutritionSheet, setNutritionSheet] = useState<NutritionPlanSheet | null>(() => {
    const cached = localStorage.getItem('fitsync_nutrition_sheet');
    return cached ? JSON.parse(cached) : null;
  });
  const [isGeneratingSheet, setIsGeneratingSheet] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);


  // Auth State Listener
  useEffect(() => {
    const fetchProfile = async (userId: string, email: string, metadata?: any) => {
      console.log("Buscando perfil para:", email);
      
      try {
        // Tenta buscar no banco com um limite de tempo curto
        const profilePromise = supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();

        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error("Timeout")), 8000)
        );

        const { data, error }: any = await Promise.race([profilePromise, timeoutPromise]).catch(() => ({ error: { code: 'TIMEOUT' } }));

        if (data) {
          console.log("Perfil encontrado no banco.");
          const mappedUser: User = {
            id: data.id,
            name: data.name || metadata?.name || email.split('@')[0],
            email: data.email || email,
            photoUrl: data.photo_url || metadata?.photoUrl || `https://picsum.photos/seed/${email}/200`,
            description: 'Focado nos resultados!',
            weight: data.weight || 75,
            height: data.height || 175,
            age: data.age || 25,
            goal: (data.goal as any) || 'hipertrofia',
            level: (data.level as any) || 'intermediario',
            trainingDays: data.training_days || 5,
            availableTime: data.available_time || 60,
            injuries: data.injuries || '',
            onboardingComplete: !!data.onboarding_complete,
            isAtGym: !!data.is_at_gym,
            completedDays: data.completed_days || [],
            completedNutritionDays: data.completed_nutrition_days || []
          };
          
          setCompletedDays(data.completed_days || []);
          setCompletedNutritionDays(data.completed_nutrition_days || []);
          
          if (data.workout_sheet) setWorkoutSheet(data.workout_sheet);
          if (data.nutrition_sheet) setNutritionSheet(data.nutrition_sheet);
          if (data.evolution_sheet) setEvolutionSheet(data.evolution_sheet);

          localStorage.setItem('fitsync_user', JSON.stringify(mappedUser));
          return mappedUser;
        }

        // Se não encontrar no banco, cria um perfil temporário baseado nos dados do Supabase Auth
        console.warn("Perfil não encontrado no banco. Criando perfil inicial...");
        const newProfile = {
          id: userId,
          email: email,
          name: metadata?.name || email.split('@')[0],
          photo_url: metadata?.photoUrl || metadata?.avatar_url || `https://picsum.photos/seed/${email}/200`,
          weight: 75,
          height: 175,
          age: 25,
          goal: 'hipertrofia',
          level: 'intermediario',
          training_days: 5,
          available_time: 60,
          injuries: '',
          onboarding_complete: false,
          is_at_gym: false,
          completed_days: [],
          completed_nutrition_days: []
        };

        await supabase.from('profiles').upsert(newProfile);

        const fallbackUser: User = {
          id: userId,
          name: metadata?.name || email.split('@')[0],
          email: email,
          photoUrl: metadata?.photoUrl || metadata?.avatar_url || `https://picsum.photos/seed/${email}/200`,
          description: 'Focado nos resultados!',
          weight: 75,
          height: 175,
          age: 25,
          goal: 'hipertrofia',
          level: 'intermediario',
          trainingDays: 5,
          availableTime: 60,
          injuries: '',
          onboardingComplete: false,
          isAtGym: false,
          completedDays: [],
          completedNutritionDays: []
        };
        localStorage.setItem('fitsync_user', JSON.stringify(fallbackUser));
        return fallbackUser;

      } catch (err: any) {
        console.error('Erro crítico no fetchProfile:', err);
        
        // Fallback supremo: se tudo falhar, mas temos o ID e e-mail, deixa o usuário entrar
        const ultimateFallback: User = {
          id: userId,
          name: metadata?.name || email.split('@')[0],
          email: email,
          photoUrl: metadata?.photoUrl || metadata?.avatar_url || `https://picsum.photos/seed/${email}/200`,
          description: 'Focado nos resultados!',
          weight: 75,
          height: 175,
          age: 25,
          goal: 'hipertrofia',
          level: 'intermediario',
          trainingDays: 5,
          availableTime: 60,
          injuries: '',
          onboardingComplete: false,
          isAtGym: false,
          completedDays: [],
          completedNutritionDays: []
        };
        
        toast.error("Erro ao carregar seu perfil da nuvem. Usando modo local temporário.");
        return ultimateFallback;
      }
    };

    // Verifica sessão ativa ao inicializar o app
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      try {
        if (session) {
          const profile = await fetchProfile(session.user.id, session.user.email || '', session.user.user_metadata);
          if (profile) {
            setUser(profile);
            if (!profile.onboardingComplete) setShowOnboarding(true);
          }
        }
      } catch (err) {
        console.error('Erro ao inicializar sessão:', err);
      } finally {
        setIsInitializing(false);
      }
    });


    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        const profile = await fetchProfile(session.user.id, session.user.email || '', session.user.user_metadata);
        if (profile) {
          setUser(profile);
          if (!profile.onboardingComplete) setShowOnboarding(true);
        }
      } else {
        localStorage.removeItem('fitsync_user');
        localStorage.removeItem('fitsync_workout_sheet');
        localStorage.removeItem('fitsync_nutrition_sheet');
        localStorage.removeItem('fitsync_evolution_sheet');
        setUser(null);
        setWorkoutSheet(null);
        setNutritionSheet(null);
        setEvolutionSheet(null);
      }
      setIsInitializing(false);
    });

    // Handle Supabase errors in URL
    const hash = window.location.hash;
    if (hash.includes('error=')) {
      const params = new URLSearchParams(hash.replace('#', ''));
      const errorMsg = params.get('error_description') || params.get('error') || 'Erro na autenticação';
      toast.error(errorMsg);
      window.history.replaceState(null, '', window.location.pathname);
    }

    return () => subscription.unsubscribe();
  }, []);

  // Motivational Messages Logic
  const motivationalMessages = [
    "Mantenha o foco! Cada repetição conta.",
    "Sinta o músculo trabalhar, a evolução é hoje!",
    "Você é mais forte do que imagina. Vá em frente!",
    "Não pare agora! O resultado vem da disciplina.",
    "Supere seus limites! O corpo segue sua mente.",
    "A dor é temporária, o orgulho é para sempre!",
    "Faltam poucas séries. Dê o seu melhor agora!",
    "Queime cada caloria como se fosse sua meta final!"
  ];

  useEffect(() => {
    let interval: any;
    if (workoutInProgress) {
      // Send an immediate motivational message
      toast(motivationalMessages[0], {
        style: {
          background: 'black',
          color: '#cb410b',
          fontWeight: '900',
          border: '2px solid #cb410b',
          borderRadius: '2rem',
          padding: '1.5rem 2.5rem',
          fontSize: '1.1rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        },
        duration: 5000
      });

      // Set up recurring messages
      interval = setInterval(() => {
        const randomMsg = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
        toast(randomMsg, {
          style: {
            background: 'black',
            color: '#cb410b',
            fontWeight: '900',
            border: '2px solid #cb410b',
            borderRadius: '2rem',
            padding: '1.5rem 2.5rem',
            fontSize: '1.1rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          },
          duration: 5000
        });
      }, 180000); // Every 3 minutes
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [workoutInProgress]);

  const handleWorkoutComplete = async (day: number, message?: string) => {
    let newCompletedDays = completedDays;
    if (!completedDays.includes(day)) {
      newCompletedDays = [...completedDays, day];
      setCompletedDays(newCompletedDays);
    }
    
    // Sync with Supabase
    if (user) {
      await supabase
        .from('profiles')
        .update({ completed_days: newCompletedDays })
        .eq('id', user.id);
    }

    if (message) {
      // Send the requested message
      toast(message, {
        style: {
          background: 'black',
          color: '#cb410b',
          fontWeight: '900',
          border: '2px solid #cb410b',
          borderRadius: '2rem',
          padding: '1.5rem 2.5rem',
          fontSize: '1.1rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        },
        duration: 6000
      });
    }
  };

  const handleNutritionComplete = async (day: number, message?: string) => {
    let newCompletedDays = completedNutritionDays;
    if (!completedNutritionDays.includes(day)) {
      newCompletedDays = [...completedNutritionDays, day];
      setCompletedNutritionDays(newCompletedDays);
    }
    
    // Sync with Supabase
    if (user) {
      await supabase
        .from('profiles')
        .update({ completed_nutrition_days: newCompletedDays })
        .eq('id', user.id);
    }

    if (message) {
      toast(message, {
        style: {
          background: 'black',
          color: '#cb410b',
          fontWeight: '900',
          border: '2px solid #cb410b',
          borderRadius: '2rem',
          padding: '1.5rem 2.5rem',
          fontSize: '1.1rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        },
        duration: 6000
      });
    }
  };

  const handleShowSheet = async (customUser?: User) => {
    const activeUser = customUser || user;
    if (!activeUser) return;

    setIsGeneratingSheet(true);
    const loadingToast = toast.loading("Personal Trainer IA está analisando seu perfil...", {
      style: {
        background: 'black',
        color: '#ff5e33',
        fontWeight: '900',
        border: '2px solid #ff5e33',
        borderRadius: '2rem',
        padding: '1.25rem 2rem',
        fontSize: '1rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }
    });
    
    try {
      const sheet = await generateWorkoutPlan(activeUser);
      setWorkoutSheet(sheet);
      
      // Persist sheet to Supabase
      if (activeUser.id !== 'guest') {
        await supabase
          .from('profiles')
          .update({ workout_sheet: sheet })
          .eq('id', activeUser.id);
      }

      setShowAiPlan(true);
      setActiveTab('workout'); // Go to workout tab to show the new sheet
      toast.dismiss(loadingToast);
      toast.success("Treino planejado com sucesso!", {
        style: {
          background: 'black',
          color: '#ff5e33',
          fontWeight: '900',
          border: '2px solid #ff5e33',
          borderRadius: '2rem',
          padding: '1.25rem 2rem',
          fontSize: '1rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }
      });
    } catch (error) {
      console.error(error);
      toast.dismiss(loadingToast);
      toast.error("Ocorreu um erro ao gerar sua ficha. Tente novamente.", {
        style: {
          background: 'black',
          color: '#ff5e33',
          fontWeight: '900',
          border: '2px solid #ff5e33',
          borderRadius: '2rem',
          padding: '1.25rem 2rem',
          fontSize: '1rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }
      });
    } finally {
      setIsGeneratingSheet(false);
    }
  };

  const handleShowNutritionSheet = async (customUser?: User) => {
    const activeUser = customUser || user;
    if (!activeUser) return;

    setIsGeneratingSheet(true);
    const loadingToast = toast.loading("Nutricionista IA está montando seu plano alimentar...", {
      style: {
        background: 'black',
        color: '#ff5e33',
        fontWeight: '900',
        border: '2px solid #ff5e33',
        borderRadius: '2rem',
        padding: '1.25rem 2rem',
        fontSize: '1rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }
    });
    
    try {
      const sheet = await generateNutritionPlan(activeUser);
      setNutritionSheet(sheet);
      
      // Persist sheet to Supabase
      if (activeUser.id !== 'guest') {
        await supabase
          .from('profiles')
          .update({ nutrition_sheet: sheet })
          .eq('id', activeUser.id);
      }

      setShowAiNutritionPlan(true);
      setActiveTab('nutrition');
      toast.dismiss(loadingToast);
      toast.success("Plano alimentar gerado com sucesso!");
    } catch (error) {
      console.error(error);
      toast.dismiss(loadingToast);
      toast.error("Erro ao gerar plano alimentar.");
    } finally {
      setIsGeneratingSheet(false);
    }
  };

  const getKcalForDay = (dayNum: number, baseKcal: number) => {
    const today = new Date().getDay();
    const isCompleted = completedDays.includes(dayNum);
    
    if (isCompleted) return baseKcal;
    
    // Penalty if it's in the past and not completed
    // Note: Sunday is 0, so we handle the wrap-around for the week starting Monday
    const currentWeekPos = today === 0 ? 6 : today - 1;
    const dayWeekPos = dayNum === 0 ? 6 : dayNum - 1;
    
    if (dayWeekPos < currentWeekPos) return 50; // Sharp fall for missed days
    return 300; // Future days or today not yet done
  };

  const getNutritionKcalForDay = (dayNum: number, baseKcal: number) => {
    const today = new Date().getDay();
    const isCompleted = completedNutritionDays.includes(dayNum);
    
    if (isCompleted) return baseKcal;
    
    const currentWeekPos = today === 0 ? 6 : today - 1;
    const dayWeekPos = dayNum === 0 ? 6 : dayNum - 1;
    
    if (dayWeekPos < currentWeekPos) return 50; // Sharp fall for missed days
    return 300; // Future days or today not yet done
  };

  const progressData = [
    { day: 'Seg', kcal: getKcalForDay(1, 800) },
    { day: 'Ter', kcal: getKcalForDay(2, 850) },
    { day: 'Qua', kcal: getKcalForDay(3, 750) },
    { day: 'Qui', kcal: getKcalForDay(4, 900) },
    { day: 'Sex', kcal: getKcalForDay(5, 880) },
    { day: 'Sáb', kcal: getKcalForDay(6, 700) },
    { day: 'Dom', kcal: getKcalForDay(0, 650) },
  ];

  const progressNutritionData = [
    { day: 'Seg', kcal: getNutritionKcalForDay(1, 2200) },
    { day: 'Ter', kcal: getNutritionKcalForDay(2, 2300) },
    { day: 'Qua', kcal: getNutritionKcalForDay(3, 2100) },
    { day: 'Qui', kcal: getNutritionKcalForDay(4, 2400) },
    { day: 'Sex', kcal: getNutritionKcalForDay(5, 2350) },
    { day: 'Sáb', kcal: getNutritionKcalForDay(6, 2000) },
    { day: 'Dom', kcal: getNutritionKcalForDay(0, 1900) },
  ];

  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [authData, setAuthData] = useState({
    name: '',
    email: '',
    password: '',
    age: '25',
    weight: '75',
    height: '175',
    level: 'intermediario',
    goal: 'hipertrofia',
    trainingDays: '5',
    availableTime: '60',
    injuries: ''
  });

  // --- Handlers ---

  const handleAuthSubmit = async () => {
    if (!authData.email || !authData.password) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    console.log("Iniciando processo de autenticação para:", authData.email, "Modo:", authMode);
    const loadingToast = toast.loading(authMode === 'login' ? "Entrando..." : "Criando conta...");

    try {
      // Timeout de 30 segundos para dar tempo ao servidor Supabase
      const authPromise = (async () => {
        if (authMode === 'login') {
          console.log("Executando signInWithPassword...");
          const { data, error } = await supabase.auth.signInWithPassword({
            email: authData.email.trim(),
            password: authData.password,
          });
          
          if (error) throw error;
          return { type: 'login', data };
        } else {
          console.log("Executando signUp...");
          const { data, error } = await supabase.auth.signUp({
            email: authData.email.trim(),
            password: authData.password,
            options: {
              data: {
                name: authData.name || authData.email.split('@')[0],
                photoUrl: `https://picsum.photos/seed/${authData.email}/200`,
              },
              emailRedirectTo: window.location.origin
            }
          });

          if (error) throw error;
          return { type: 'signup', data };
        }
      })();

      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("O servidor demorou muito para responder. Verifique sua conexão ou se o e-mail é válido.")), 30000)
      );

      const result: any = await Promise.race([authPromise, timeoutPromise]);
      console.log("Resultado da autenticação:", result);

      if (result.type === 'login') {
        toast.success("Bem-vindo de volta!");
      } else {
        if (result.data.user && !result.data.session) {
          toast.info("E-mail de confirmação enviado! Por favor, verifique sua caixa de entrada (e o spam) para ativar sua conta.", {
            duration: 10000
          });
        } else {
          toast.success("Conta criada com sucesso!");
        }
      }

    } catch (error: any) {
      console.error("Erro detalhado na autenticação:", error);
      let userMessage = error.message;
      
      if (error.message.includes("Invalid login credentials")) {
        userMessage = "E-mail ou senha incorretos.";
      } else if (error.message.includes("User already registered")) {
        userMessage = "Este e-mail já está cadastrado. Tente fazer login.";
      } else if (error.message.includes("network")) {
        userMessage = "Erro de conexão. Verifique sua internet.";
      }
      
      toast.error(userMessage || "Erro na autenticação. Tente novamente.");
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'apple') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch (error: any) {
      toast.error(`Erro ao entrar com ${provider}: ${error.message}`);
    }
  };


  const handleUpdateUserData = async () => {
    if (!user) return;
    
    const loadingToast = toast.loading("Salvando seus dados na nuvem...");

    // Update the local user object with all gathered data
    const updatedUser: User = {
      ...user,
      weight: Number(authData.weight),
      height: Number(authData.height),
      age: Number(authData.age),
      goal: authData.goal as any,
      level: authData.level as any,
      trainingDays: Number(authData.trainingDays),
      availableTime: Number(authData.availableTime),
      injuries: authData.injuries,
      onboardingComplete: true
    };

    try {
      if (user.id !== 'guest') {
        const { error } = await supabase
          .from('profiles')
          .update({
            weight: updatedUser.weight,
            height: updatedUser.height,
            age: updatedUser.age,
            goal: updatedUser.goal,
            level: updatedUser.level,
            training_days: updatedUser.trainingDays,
            available_time: updatedUser.availableTime,
            injuries: updatedUser.injuries,
            completed_days: updatedUser.completedDays,
            completed_nutrition_days: updatedUser.completedNutritionDays,
            onboarding_complete: true,
            workout_sheet: workoutSheet,
            nutrition_sheet: nutritionSheet,
            evolution_sheet: evolutionSheet,
            updated_at: new Date().toISOString()
          })
          .eq('id', user.id);

        if (error) throw error;
      }

      setUser(updatedUser);
      setShowOnboarding(false);
      setActiveTab('workout'); // Switch straight to workout mode
      toast.success("Dados salvos! A IA está gerando seus planos...");
      
      // Auto-trigger plan generations
      handleShowSheet(updatedUser);
      handleShowNutritionSheet(updatedUser);
    } catch (error: any) {
      toast.error("Erro ao salvar dados: " + error.message);
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  const handleShowEvolution = () => {
    if (!user) return;

    if (!evolutionSheet) {
      // Initialize a default evolution sheet if it doesn't exist
      const initialEvolution: EvolutionSheet = {
        usuario: {
          nome: user.name,
          idade: user.age,
          altura: user.height,
          objetivo: user.goal
        },
        progresso: {
          peso: [{ data: new Date().toISOString().split('T')[0], valor: user.weight }],
          fotos: [],
          medidas: []
        },
        metas: {
          peso_objetivo: user.goal === 'emagrecimento' ? user.weight - 5 : user.weight + 5,
          prazo: '90 dias'
        },
        observacoes: 'Iniciando minha jornada!',
        sugestoes_automaticas: 'Comece registrando suas medidas e fotos para acompanhar sua evolução!'
      };
      setEvolutionSheet(initialEvolution);
    }
    setShowEvolutionModal(true);
  };





  const handleUpdateEvolution = async (data: EvolutionSheet) => {
    setEvolutionSheet(data);
    if (user) {
      await supabase
        .from('profiles')
        .update({ evolution_sheet: data })
        .eq('id', user.id);
    }
  };



  // --- Views ---

  // --- Render Logic ---

  if (!user) return (
    <AuthView 
      authMode={authMode} 
      setAuthMode={setAuthMode} 
      authData={authData} 
      setAuthData={setAuthData} 
      handleAuthSubmit={handleAuthSubmit} 
      handleSocialLogin={handleSocialLogin}
    />
  );


  return (
    <div className="min-h-screen bg-black flex flex-col text-white">
      {/* Universal Header */}
      <header className="sticky top-0 left-0 right-0 bg-black/80 backdrop-blur-xl z-40 border-b border-white/5 safe-area-top">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-tech" style={{ background: 'linear-gradient(135deg, #ff5e33 0%, #cb410b 100%)' }}>
              <TrendingUp className="text-white w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#ff5e33] to-[#cb410b] bg-clip-text text-transparent tracking-tight">FitSync</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={async () => {
                try {
                  if (user?.id !== 'guest') {
                    await supabase.auth.signOut();
                  }
                } catch (err) {
                  console.error('Error during sign out:', err);
                } finally {
                  localStorage.removeItem('fitsync_user');
                  localStorage.removeItem('fitsync_workout_sheet');
                  localStorage.removeItem('fitsync_nutrition_sheet');
                  localStorage.removeItem('fitsync_evolution_sheet');
                  setUser(null);
                  setWorkoutSheet(null);
                  setNutritionSheet(null);
                  setEvolutionSheet(null);
                  toast.success("Sessão encerrada.");
                }
              }}
              className="p-3 bg-white/5 rounded-2xl text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-all active:scale-95"
            >
              <LogOut className="w-5 h-5" />
            </button>

          </div>
        </div>
      </header>

      <main className="flex-1 pb-32">
        <div className="max-w-5xl mx-auto p-4 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'dashboard' && (
                <Dashboard 
                  user={user} 
                  activeTab={activeTab} 
                  setActiveTab={setActiveTab} 
                  progressData={progressData}
                  progressNutritionData={progressNutritionData}
                  workoutInProgress={workoutInProgress}
                  setWorkoutInProgress={setWorkoutInProgress}
                  activeDay={activeDay}
                  onComplete={handleWorkoutComplete}
                  onShowSheet={() => {
                    if (workoutSheet) {
                      setShowAiPlan(true);
                      setActiveTab('workout');
                    } else {
                      setShowOnboarding(true);
                    }
                  }}
                  onShowEvolution={handleShowEvolution}
                  hasWorkoutSheet={!!workoutSheet}
                  onResetPlan={() => {
                    setWorkoutSheet(null);
                    setActiveTab('workout');
                  }}
                  onShowProfile={() => setShowProfileMenu(true)}
                />
              )}
              {activeTab === 'workout' && (
                showAiPlan && workoutSheet ? (
                  <div className="pb-12">
                    <div className="flex justify-between items-center mb-10 px-2">
                      <div className="space-y-1">
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">Seu Treino</h2>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Personalizado pela IA</p>
                      </div>
                      <button 
                        onClick={() => {
                          setShowAiPlan(false);
                        }}
                        className="text-[10px] font-black text-brand-500 uppercase tracking-widest hover:text-white transition-colors"
                      >
                        Ver Treino Padrão
                      </button>
                    </div>
                    <WorkoutPlanSheetContent 
                      sheet={workoutSheet} 
                      onComplete={handleWorkoutComplete}
                      activeDay={activeDay}
                    />
                  </div>
                ) : (
                  <WorkoutPlan 
                    activeObjective={activeObjective} 
                    setActiveObjective={setActiveObjective} 
                    activeDay={activeDay} 
                    setActiveDay={setActiveDay} 
                    onComplete={handleWorkoutComplete}
                    hasAiPlan={!!workoutSheet}
                    onToggleAi={() => setShowAiPlan(true)}
                  />
                )
              )}
              {activeTab === 'nutrition' && (
                showAiNutritionPlan && nutritionSheet ? (
                  <div className="pb-12">
                    <div className="flex justify-between items-center mb-10 px-2">
                      <div className="space-y-1">
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">Sua Dieta</h2>
                        <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Personalizada pela IA</p>
                      </div>
                      <button 
                        onClick={() => setShowAiNutritionPlan(false)}
                        className="text-[10px] font-black text-brand-500 uppercase tracking-widest hover:text-white transition-colors"
                      >
                        Ver Plano Padrão
                      </button>
                    </div>
                    <NutritionPlanSheetContent 
                      sheet={nutritionSheet} 
                      onComplete={handleNutritionComplete}
                      activeDay={activeDay}
                    />
                  </div>
                ) : (
                  <NutritionPlan 
                    activeObjective={activeObjective} 
                    setActiveObjective={setActiveObjective} 
                    activeDay={activeDay} 
                    setActiveDay={setActiveDay} 
                    onComplete={handleNutritionComplete}
                    onShowGuide={() => window.open('https://youtu.be/ywUuoTJJznA?si=Z1qNEw_UpigcRqt2', '_blank')}
                    hasAiPlan={!!nutritionSheet}
                    onToggleAi={() => setShowAiNutritionPlan(true)}
                  />
                )
              )}
              {activeTab === 'playlists' && <PlaylistsView />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Bottom Nav - Professional Icon Style */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl px-4 py-5 flex justify-around items-center z-50 border-t border-white/5 shadow-2xl safe-area-bottom">
        {[
          { id: 'dashboard', icon: Home },
          { id: 'workout', icon: Dumbbell },
          { id: 'nutrition', icon: Utensils },
          { id: 'playlists', icon: Music },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setActiveTab(item.id);
              if (item.id === 'workout') setShowAiPlan(false);
              if (item.id === 'nutrition') setShowAiNutritionPlan(false);
            }}
            className="relative flex flex-col items-center min-w-[64px] transition-all duration-300 active:scale-90"
          >
            <item.icon 
              className={`w-7 h-7 transition-all duration-300 ${
                activeTab === item.id 
                  ? 'text-brand-500 scale-110 drop-shadow-[0_0_8px_rgba(255,94,51,0.5)]' 
                  : 'text-slate-500 opacity-40 grayscale scale-100'
              }`} 
            />
            {activeTab === item.id && (
              <motion.div 
                layoutId="nav-indicator"
                className="absolute -top-5 w-8 h-1 bg-brand-500 rounded-full shadow-[0_0_15px_rgba(255,94,51,0.8)]"
              />
            )}
          </button>
        ))}
      </nav>

      <Toaster position="top-center" richColors closeButton />
      {showProfileMenu && (
        <ProfileMenuModal 
          user={user}
          onEditProfile={() => setShowOnboarding(true)}
          onLogout={async () => {
            try {
              if (user?.id !== 'guest') {
                await supabase.auth.signOut();
              }
            } catch (err) {
              console.error('Error during sign out:', err);
            } finally {
              // Explicitly clear all local state and cache
              localStorage.removeItem('fitsync_user');
              localStorage.removeItem('fitsync_workout_sheet');
              localStorage.removeItem('fitsync_nutrition_sheet');
              localStorage.removeItem('fitsync_evolution_sheet');
              
              setUser(null);
              setWorkoutSheet(null);
              setNutritionSheet(null);
              setEvolutionSheet(null);
              setShowProfileMenu(false);
              toast.success("Você saiu da conta.");
            }
          }}
          onClose={() => setShowProfileMenu(false)}
        />

      )}
      {showNutritionGuide && (
        <NutritionGuideModal onClose={() => setShowNutritionGuide(false)} />
      )}
      {showOnboarding && (
        <UserDataForm 
          user={user} 
          authData={authData} 
          setAuthData={setAuthData} 
          onSave={handleUpdateUserData} 
          onCancel={() => setShowOnboarding(false)} 
        />
      )}
      {showEvolutionModal && evolutionSheet && (
        <EvolutionView 
          evolution={evolutionSheet} 
          onUpdate={handleUpdateEvolution} 
          onClose={() => setShowEvolutionModal(false)} 
        />
      )}
    </div>
  );
}

