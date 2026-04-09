import { useState, useEffect, ReactNode, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  Play, 
  Gift, 
  ChevronRight, 
  ChevronLeft, 
  Star, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Clock,
  Home,
  Sparkles,
  HelpCircle,
  Plus,
  Minus
} from 'lucide-react';
import logo from './media/cristalize-logo.webp';
import heroImage from './media/cristalize-antesedepois-header.webp';

// Breve Explicação
import belief1 from './media/Cristalize-BreveExplicação/🧼 manchas persistentes.webp';
import belief2 from './media/Cristalize-BreveExplicação/🌫️ aparência embaçada.webp';
import belief3 from './media/Cristalize-BreveExplicação/🧱 marcas que nunca saem.webp';
import belief4 from './media/Cristalize-BreveExplicação/🚫 vidro sujo mesmo após limpeza.webp';

// Antes e Depois
import demo1 from './media/Cristalize-AntesEDepois/box de banheiro.webp';
import demo2 from './media/Cristalize-AntesEDepois/janela.webp';
import demo3 from './media/Cristalize-AntesEDepois/espelho.webp';

// Bônus
import bonus1 from './media/Cristalize-Bônus/anti-mancha permanente.webp';
import bonus2 from './media/Cristalize-Bônus/misturas de alto brilho.webp';
import bonus3 from './media/Cristalize-Bônus/limpeza profissional express.webp';
import bonus4 from './media/Cristalize-Bônus/guia de superfícies.webp';

// --- Types & Components ---

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'vturb-smartplayer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { id?: string };
    }
  }
}

const VTurbPlayer = ({ videoId, scriptUrl, className }: { videoId: string, scriptUrl: string, className?: string }) => {
  useEffect(() => {
    const scriptId = `vturb-script-${videoId}`;
    if (document.getElementById(scriptId)) return;

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = scriptUrl;
    script.async = true;
    document.head.appendChild(script);
  }, [videoId, scriptUrl]);

  return (
    <div className={className || "w-full max-w-[320px] mx-auto rounded-2xl overflow-hidden shadow-2xl border border-zinc-700 mb-6 bg-zinc-950 relative min-h-[450px]"}>
      {/* @ts-expect-error custom element for VTurb */}
      <vturb-smartplayer id={`vid-${videoId}`}></vturb-smartplayer>
    </div>
  );
};

const Button = ({ children, className = "", onClick = () => {} }: { children: ReactNode, className?: string, onClick?: () => void }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`w-full py-4 px-6 rounded-xl font-extrabold text-lg uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] ${className}`}
  >
    {children}
  </motion.button>
);

const Section = ({ children, className = "", id = "" }: { children: ReactNode, className?: string, id?: string }) => (
  <section id={id} className={`py-8 md:py-16 px-4 md:px-8 max-w-4xl mx-auto ${className}`}>
    {children}
  </section>
);

const Badge = ({ children }: { children: ReactNode }) => (
  <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">
    {children}
  </span>
);

const Accordion = ({ question, answer }: { question: string, answer: string, key?: number | string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-zinc-800 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-5 flex justify-between items-center text-left"
      >
        <span className="font-semibold text-zinc-200">{question}</span>
        {isOpen ? <Minus className="w-5 h-5 text-primary" /> : <Plus className="w-5 h-5 text-primary" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-zinc-400 text-sm leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SalesNotification = ({ show }: { show: boolean }) => {
  const [currentSale, setCurrentSale] = useState<{ name: string; time: string } | null>(null);
  const names = [
    "Maria Silva", "Ana Oliveira", "Juliana Costa", "Fernanda Santos", "Camila Lima",
    "Beatriz Souza", "Larissa Rocha", "Patrícia Alves", "Gabriela Ferreira", "Amanda Melo",
    "Roberta Ribeiro", "Luciana Carvalho", "Priscila Gomes", "Vanessa Martins", "Tatiane Barbosa",
    "João Pereira", "Pedro Rodrigues", "Lucas Almeida", "Marcos Oliveira", "Felipe Santos"
  ];

  useEffect(() => {
    if (!show) return;

    const triggerNotification = () => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      setCurrentSale({ name: randomName, time: "ahora mismo" });
      
      setTimeout(() => {
        setCurrentSale(null);
      }, 5000);

      const nextTrigger = Math.floor(Math.random() * 15000) + 10000; // 10-25 seconds
      setTimeout(triggerNotification, nextTrigger);
    };

    const initialDelay = setTimeout(triggerNotification, 3000);
    return () => clearTimeout(initialDelay);
  }, [show]);

  return (
    <AnimatePresence>
      {currentSale && (
        <motion.div
          initial={{ opacity: 0, x: -100, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -100 }}
          className="fixed bottom-6 left-6 z-[100] bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 p-4 rounded-2xl shadow-2xl flex items-center gap-4 max-w-[280px]"
        >
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="text-primary w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-zinc-100 font-bold leading-tight">
              {currentSale.name}
            </p>
            <p className="text-[10px] text-zinc-400 mt-1">
              Acaba de adquirir <span className="text-primary font-bold">Cristalize™ PRO</span>
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Main App ---

export default function App() {
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes countdown
  const [viewers, setViewers] = useState(142);
  const [totalWatched, setTotalWatched] = useState(4218);
  const [showSales, setShowSales] = useState(false);
  const bonusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Rapid update for live viewers
    const viewerInterval = setInterval(() => {
      const change = Math.floor(Math.random() * 7) - 3; // -3 to +3
      setViewers(prev => {
        const next = prev + change;
        if (next < 89) return 89;
        if (next > 319) return 319;
        return next;
      });
    }, 1500);

    // Slower update for total watched today
    const totalInterval = setInterval(() => {
      const increment = Math.floor(Math.random() * 3) + 1; // +1 to +3
      setTotalWatched(prev => prev + increment);
    }, 12000);

    return () => {
      clearInterval(viewerInterval);
      clearInterval(totalInterval);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (bonusRef.current) {
        const rect = bonusRef.current.getBoundingClientRect();
        if (rect.top < 0) {
          setShowSales(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const scrollToPlans = () => {
    document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Sticky Top Bar (Urgency) */}
      <div className="sticky top-0 z-50 bg-primary py-2 px-4 text-center text-zinc-950 font-bold text-xs md:text-sm">
        OFERTA ESPECIAL EXPIRA EN: <span className="font-mono">{formatTime(timeLeft)}</span>
      </div>

      {/* Header Logo */}
      <div className="pt-4 mx-auto w-fit leading-none flex justify-center">
        <img src={logo} alt="Cristalize Logo" className="w-32 md:w-36 block object-contain" />
      </div>

      {/* 1. HERO SECTION */}
      <Section className="text-center pt-6 pb-12 md:pt-12 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl md:text-5xl font-black leading-tight mb-4 bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
            El Truco Casero que Hace que tu Vidrio Luzca como de un Hotel 5 Estrellas
          </h1>
          <p className="text-zinc-400 text-base md:text-xl mb-6 max-w-2xl mx-auto leading-relaxed">
            Elimina manchas y deja tus vidrios con un brillo profesional usando solo artículos simples de tu hogar, sin esfuerzo y sin gastar en productos costosos.
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8">
            {[
              { text: "Sin esfuerzo", icon: Sparkles },
              { text: "Resultado inmediato", icon: Zap },
              { text: "Funciona incluso en vidrios antiguos", icon: ShieldCheck }
            ].map((item, i) => (
              <span key={i} className="text-zinc-500 text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold flex items-center gap-2">
                <item.icon className="w-3 h-3 text-primary" />
                {item.text}
              </span>
            ))}
          </div>
          
          <div className="relative rounded-2xl overflow-hidden border border-zinc-800 mb-8 shadow-2xl">
            <img 
              src={heroImage} 
              alt="Vidro metade sujo / metade cristalino" 
              className="w-full aspect-video object-cover z-10 relative"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1 h-full bg-primary/50 backdrop-blur-sm shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>
            </div>
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-[10px] font-bold uppercase text-red-500 border border-red-500/30">Antes</div>
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded text-[10px] font-bold uppercase text-primary border border-primary/30">Después</div>
          </div>

          <Button 
            onClick={scrollToPlans}
            className="bg-primary text-zinc-950 hover:bg-primary-light"
          >
            QUIERO APRENDER EL TRUCO AHORA
          </Button>
        </motion.div>
      </Section>

      {/* 2. VSL SECTION */}
      <Section className="bg-zinc-900/50 rounded-3xl my-6 md:my-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-black mb-4">
            En 60 segundos entenderás por qué este truco se está volviendo viral en TikTok
          </h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-lg mx-auto">
            Mira cómo personas comunes están logrando vidrios con apariencia de un hotel de lujo sin gastar casi nada
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-3 mb-6">
          <div className="bg-red-500/10 text-red-500 border border-red-500/20 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            {viewers} personas viendo este video ahora
          </div>
          <div className="bg-primary/10 text-primary border border-primary/20 px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
            🔥 Más de {totalWatched.toLocaleString('es-LA')} personas lo han visto hoy
          </div>
        </div>
        
        <VTurbPlayer 
          videoId="69d4ef05ba8431ee2bd8e79e"
          scriptUrl="https://scripts.converteai.net/7f5ec58a-41f1-43db-b0c9-c5b25cecd62d/players/69d4ef05ba8431ee2bd8e79e/v4/player.js"
        />

        <div className="flex flex-col gap-3 mb-8 w-full max-w-[340px] mx-auto">
          {[
            { text: "Funciona en ventanas, espejos, puertas de baño y mesas", icon: Home },
            { text: "Toma menos de 5 minutos", icon: Clock },
            { text: "Usa artículos comunes de tu casa", icon: CheckCircle2 }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 bg-zinc-900/60 border border-zinc-800 px-4 py-3 rounded-2xl w-full shadow-lg backdrop-blur-sm">
              <div className="bg-primary/10 p-2.5 rounded-xl shrink-0 shadow-inner">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-zinc-200 text-xs font-semibold leading-relaxed tracking-wide text-left">{item.text}</span>
            </div>
          ))}
        </div>

        <Button 
          onClick={scrollToPlans}
          className="bg-white text-zinc-950 hover:bg-zinc-200"
        >
          QUIERO ACCEDER AL MÉTODO
        </Button>
      </Section>

      {/* 3. BELIEF BREAK */}
      <Section className="text-center">
        <h2 className="text-2xl md:text-3xl font-black mb-4 text-primary">
          ¿Por qué solo Cristalize funciona, mientras que los productos costosos fallan?
        </h2>
        <p className="text-zinc-400 mb-8">
          Cuando el agua se seca en el vidrio, deja micro depósitos minerales. Estos depósitos forman una capa invisible llamada <span className="text-white font-bold">calcificación</span>.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8">
          {[
            { text: "Manchas persistentes", img: belief1 },
            { text: "Apariencia empañada", img: belief2 },
            { text: "Marcas que nunca salen", img: belief3 },
            { text: "Vidrio con apariencia sucia incluso después de limpiarlo", img: belief4 }
          ].map((item, i) => (
            <div key={i} className="bg-zinc-900/60 p-3 md:p-4 rounded-2xl border border-red-500/20 flex flex-row items-center gap-4 text-left shadow-lg">
              <div className="w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-xl overflow-hidden border border-red-500/30 relative shadow-inner">
                <img src={item.img} alt={item.text} className="w-full h-full object-cover grayscale opacity-70" />
                <div className="absolute inset-0 bg-red-900/30 mix-blend-overlay border border-zinc-900/10 rounded-xl"></div>
                <div className="absolute -bottom-1 -right-1 bg-zinc-950 rounded-tl-lg p-1.5 shadow-[-2px_-2px_10px_rgba(0,0,0,0.5)]">
                   <XCircle className="text-red-500 w-4 h-4 shadow-[0_0_10px_rgba(239,68,68,0.3)] bg-zinc-950 rounded-full" />
                </div>
              </div>
              <span className="text-zinc-300 font-medium text-sm md:text-base leading-tight pr-2">{item.text}</span>
            </div>
          ))}
        </div>

        <div className="bg-primary/5 p-8 rounded-3xl border border-primary/20">
          <p className="text-lg leading-relaxed text-zinc-300 italic">
            "Y por eso es que los productos comunes fallan. Limpian la superficie… <span className="text-primary font-bold not-italic">pero no eliminan la calcificación.</span>"
          </p>
        </div>
      </Section>

      {/* 4. DEMONSTRATION */}
      <Section className="bg-zinc-900/30 rounded-3xl">
        <h2 className="text-2xl font-bold text-center mb-8">
          Mira lo que sucede cuando se elimina la calcificación con Cristalize
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 md:mb-8">
          {[
            { label: "Puerta de Baño", img: demo1 },
            { label: "Ventana", img: demo2 },
            { label: "Espejo", img: demo3 }
          ].map((item, i) => (
            <div key={i} className="space-y-2">
              <div className="rounded-xl overflow-hidden border border-zinc-800 aspect-square relative group">
                <img 
                  src={item.img} 
                  alt={item.label} 
                  className="w-full h-full object-cover"
                />
                {/* Horizontal Line */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <div className="w-full h-px bg-primary/50 backdrop-blur-sm shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
                </div>
                {/* Tags */}
                <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[8px] font-bold uppercase text-red-500 border border-red-500/30">Antes</div>
                <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[8px] font-bold uppercase text-primary border border-primary/30">Después</div>
              </div>
              <p className="text-center text-xs font-bold text-zinc-500 uppercase tracking-widest">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-xl font-bold text-white mb-2">El vidrio vuelve a ser transparente y brillante.</p>
          <p className="text-primary font-black text-2xl uppercase tracking-tighter">Como si fuera nuevo.</p>
        </div>
      </Section>

      {/* 4.5. CLARITY SECTION */}
      <Section className="bg-zinc-950 border-y border-zinc-900 py-12 md:py-20 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-64 bg-primary/5 rounded-[100%] blur-[100px] pointer-events-none"></div>

        <div className="text-center mb-10 md:mb-12 relative z-10">
          <Badge>Paso a Paso Simple</Badge>
          <h2 className="text-3xl md:text-4xl font-black mb-4">
            Mira lo simple que es restaurar tu vidrio en <span className="text-primary hover:text-white transition-colors">pocos minutos</span> con Cristalize nuestro pulidor natural de vidrios
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-sm md:text-base">
            Sin esfuerzo, sin fregar, cualquier persona puede aplicarlo y ver el resultado al instante
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 md:gap-12 relative z-10">
          {/* Left Column - Video */}
          <div className="w-full max-w-[320px] mx-auto lg:mx-0 shrink-0">
            <VTurbPlayer 
              videoId="69d4f5bd4f7f1cfa1765085f"
              scriptUrl="https://scripts.converteai.net/7f5ec58a-41f1-43db-b0c9-c5b25cecd62d/players/69d4f5bd4f7f1cfa1765085f/v4/player.js"
              className="aspect-[9/16] bg-zinc-900 rounded-[32px] overflow-hidden border-4 border-zinc-800 shadow-2xl relative"
            />
          </div>

          {/* Right Column - Info */}
          <div className="w-full max-w-lg lg:max-w-xl flex flex-col gap-8 md:gap-10 text-left">
            
            {/* Benefícios rápidos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
               {[
                 { text: "Elimina incluso manchas que parecen imposibles", icon: Sparkles },
                 { text: "Resultado visible al instante", icon: Zap },
                 { text: "Efecto de vidrio nuevo sin esfuerzo", icon: Star },
                 { text: "No deja residuos que hagan que la mancha regrese", icon: ShieldCheck },
                 { text: "Funciona incluso en vidrios antiguos", icon: CheckCircle2 }
               ].map((item, i) => (
                 <div key={i} className="flex items-start gap-3 bg-zinc-900/50 p-3 rounded-xl border border-zinc-800 hover:border-primary/30 transition-colors">
                   <item.icon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                   <span className="text-zinc-300 text-xs font-semibold leading-relaxed">{item.text}</span>
                 </div>
               ))}
            </div>

            {/* Onde Funciona */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <span className="bg-primary/20 p-1.5 rounded-lg text-primary"><Sparkles className="w-4 h-4"/></span>
                Ideal para:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                {[
                  "Puertas de baño de vidrio con manchas blanquecinas",
                  "Marcas de agua dura (sarro)",
                  "Residuos de champú y jabón incrustados",
                  "Vidrios opacos y sin transparencia",
                  "Vidrios de auto con marcas de lluvia ácida",
                  "Superficies cromadas con apariencia desgastada"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="text-zinc-400 text-xs">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Como Aplicar */}
            <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 rounded-2xl border border-zinc-800 shadow-xl relative overflow-hidden group hover:border-primary/50 transition-colors duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none group-hover:bg-primary/10 transition-colors duration-500"></div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="bg-primary/20 p-1.5 rounded-lg text-primary"><Zap className="w-4 h-4"/></span>
                Paso a paso simple:
              </h3>
              <ol className="space-y-3 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-zinc-800 ml-1">
                {[
                  "Aplica la mezcla Cristalize en el vidrio seco",
                  "Deja actuar de 2 a 5 minutos",
                  "Frota suavemente con una esponja común",
                  "Enjuaga con agua"
                ].map((step, i) => (
                  <li key={i} className="flex gap-4 relative z-10">
                    <span className="w-6 h-6 rounded-full bg-primary text-zinc-950 font-black text-xs flex items-center justify-center shrink-0 shadow-lg border-2 border-zinc-950">{i + 1}</span>
                    <span className="text-zinc-300 text-sm font-medium pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-5 p-3 bg-primary/10 border border-primary/20 rounded-xl flex items-center gap-3 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
                <Sparkles className="w-5 h-5 text-primary shrink-0" />
                <p className="text-primary font-bold text-xs">Listo — el vidrio vuelve a ser transparente y renovado</p>
              </div>
            </div>

            {/* Entrega e Acesso Imediato + Persuasão */}
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-4">
                 <div className="bg-primary/20 p-3 rounded-2xl shrink-0 text-primary mt-1 shadow-inner">
                   <Clock className="w-6 h-6" />
                 </div>
                 <div>
                   <h4 className="text-white font-bold text-sm mb-1 uppercase tracking-wide flex items-center gap-2">Acceso inmediato tras la compra <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span></h4>
                   <p className="text-zinc-400 text-xs leading-relaxed">Recibirás directamente en tu correo una app exclusiva de Cristalize, con el paso a paso completo, la receta detallada y las aplicaciones para diferentes tipos de vidrio. Puedes acceder desde tu celular o computadora y comenzar enseguida.</p>
                 </div>
              </div>

              <div className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-700/50 relative">
                 <div className="absolute -left-2 top-4 text-4xl text-zinc-700/50 leading-none pointer-events-none opacity-50 font-serif">"</div>
                 <p className="text-zinc-300 text-sm italic font-medium relative z-10">Cristalize no es un producto común... es una mezcla casera con un efecto de pulido profesional. Actúa directamente sobre la calcificación, eliminando la capa que deja el vidrio opaco.</p>
                 <div className="absolute -right-2 bottom-0 text-4xl text-zinc-700/50 leading-none pointer-events-none opacity-50 font-serif rotate-180">"</div>
               </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 flex items-center gap-2 bg-red-500/10 border border-red-500/20 p-2.5 rounded-lg text-red-400 text-[10px] font-semibold transition-colors hover:bg-red-500/20">
                  <XCircle className="w-4 h-4 shrink-0" />
                  <span>Evita el contacto con metales sensibles y mármol</span>
                </div>
                <div className="flex-1 flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 p-2.5 rounded-lg text-yellow-400 text-[10px] font-semibold transition-colors hover:bg-yellow-500/20">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>Mantenlo fuera del alcance de los niños</span>
                </div>
              </div>
            </div>

            {/* Teste sem risco */}
            <div className="bg-primary hover:bg-primary-light transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:scale-[1.02] text-zinc-950 p-4 rounded-xl font-bold flex flex-col items-center justify-center text-center gap-1 cursor-pointer" onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}>
              <span className="uppercase text-sm tracking-widest flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                Pruébalo sin riesgos
                <ChevronRight className="w-4 h-4" />
              </span>
              <span className="text-[10px] opacity-80 font-semibold">Si no funciona en tu vidrio, te devolvemos tu dinero en un plazo de 15 días</span>
            </div>
            
          </div>
        </div>
      </Section>

      {/* 5. TESTIMONIALS */}
      <Section>
        <h2 className="text-2xl font-bold text-center mb-8">
          Lo que dicen quienes ya usaron Cristalize™
        </h2>
        
        <div className="flex gap-4 overflow-x-auto pb-8 snap-x no-scrollbar">
          {[
            "69d4ef3749922114cb89a15e",
            "69d4ef4149922114cb89a177",
            "69d4ef3d84e8b7c722836f7d"
          ].map((id, i) => (
            <div key={i} className="min-w-[240px] aspect-[9/16] bg-zinc-900 rounded-2xl snap-center flex-shrink-0 relative overflow-hidden border border-zinc-800 shadow-xl">
              <VTurbPlayer 
                videoId={id}
                scriptUrl={`https://scripts.converteai.net/7f5ec58a-41f1-43db-b0c9-c5b25cecd62d/players/${id}/v4/player.js`}
                className="w-full h-full"
              />
            </div>
          ))}
        </div>
      </Section>

      {/* 6. BONUS SECTION */}
      <div ref={bonusRef}>
        <Section className="bg-primary/5 border-2 border-dashed border-primary/30 rounded-[40px] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
        
        <div className="text-center mb-8">
          <span className="bg-red-500 text-white px-4 py-1 rounded-full text-[10px] font-black uppercase mb-4 inline-block animate-pulse">
            Atención: Oportunidad Única
          </span>
          <h2 className="text-2xl md:text-3xl font-black mb-4">
            Si sales de esta página ahora, <span className="text-red-500 underline">NO</span> volverás a ver esto...
          </h2>
          <p className="text-zinc-400">
            No solo te estás llevando el método Cristalize™... Vas a desbloquear un paquete completo que transforma a CUALQUIER persona en un experto.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
          {[
            { title: "Anti-Manchas Permanente", desc: "Evita la calcificación por hasta 30 días", val: "$17", icon: ShieldCheck, img: bonus1 },
            { title: "Mezclas de Alto Brillo", desc: "Efecto vitrina de tienda profesional", val: "$12", icon: Sparkles, img: bonus2 },
            { title: "Limpieza Profesional Express", desc: "Resultados perfectos en 3 minutos", val: "$15", icon: Zap, img: bonus3 },
            { title: "Guía de Superficies", desc: "Puertas de baño, mesas, puertas y ventanas", val: "$10", icon: Home, img: bonus4 }
          ].map((bonus, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-4 flex flex-col gap-4 hover:border-primary/30 transition-colors"
            >
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-zinc-800">
                <img 
                  src={bonus.img} 
                  alt={bonus.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-zinc-950/80 backdrop-blur-md px-2 py-1 rounded-lg text-[9px] font-black text-primary border border-white/5 uppercase tracking-tighter">
                  Bono #{i+1}
                </div>
                <div className="absolute bottom-2 right-2 bg-primary text-zinc-950 px-2 py-0.5 rounded-md text-[10px] font-bold">
                  GRATIS
                </div>
              </div>
              
              <div className="flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-white leading-tight mb-1">
                  {bonus.title}
                </h3>
                <p className="text-zinc-500 text-xs leading-relaxed">
                  {bonus.desc}
                </p>
                <div className="mt-auto pt-3 flex items-center justify-between border-t border-zinc-800/50">
                  <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Valor: {bonus.val}</span>
                  <bonus.icon className="w-4 h-4 text-primary/40" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="max-w-md mx-auto bg-zinc-900/10 border border-zinc-800/30 rounded-[2.5rem] p-8 md:p-10 text-center backdrop-blur-md">
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center text-zinc-200 text-sm font-black uppercase tracking-widest">
              <span>Método Cristalize™</span>
              <span>$27</span>
            </div>
            
            <div className="space-y-2.5 pt-4 border-t border-zinc-800/20">
              {[
                { name: "Anti-Manchas Permanente", price: "$17" },
                { name: "Mezclas de Alto Brillo", price: "$12" },
                { name: "Limpieza Profesional Express", price: "$15" },
                { name: "Guía de Superficies", price: "$10" }
              ].map((b, i) => (
                <div key={i} className="flex justify-between items-center text-zinc-500 text-[9px] uppercase tracking-[0.2em] font-medium">
                  <span>{b.name}</span>
                  <span className="line-through opacity-40">{b.price}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-zinc-800/20 flex justify-between items-center text-zinc-400 text-xs font-black uppercase tracking-widest">
              <span>Valor Total</span>
              <span className="line-through decoration-red-500/40">$81</span>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-primary text-[9px] uppercase tracking-[0.4em] font-black mb-3">Oportunidad Única</p>
            <h3 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tighter">
              Hoy <span className="text-primary">no pagas</span> nada de esto…
            </h3>
          </div>

          <Button 
            onClick={scrollToPlans}
            className="bg-primary text-zinc-950 shadow-[0_20px_50px_-10px_rgba(6,182,212,0.5)] hover:scale-[1.02] transition-all duration-300"
          >
            QUIERO MI PAQUETE COMPLETO
          </Button>
          
          <div className="mt-6 flex items-center justify-center gap-2 text-zinc-600">
            <ShieldCheck className="w-3 h-3" />
            <span className="text-[9px] font-bold uppercase tracking-widest">Acceso inmediato y de por vida</span>
          </div>
        </div>
      </Section>
      </div>

      {/* 7. PLANS SECTION */}
      <Section id="plans" className="scroll-mt-20">
        <h2 className="text-3xl font-black text-center mb-8">
          Elige cómo quieres acceder a Cristalize™
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* =========================================
              PLANO 1 - ESENCIAL (BÁSICO)
              =========================================
              LINK DE CHECKOUT ADICIONADO AQUI NO BOTÃO ABAIXO
          */}
          <div className="bg-zinc-900/50 p-6 md:p-8 rounded-[32px] border border-zinc-800 flex flex-col">
            <h3 className="text-xl font-bold mb-2">Plan Esencial</h3>
            <p className="text-zinc-500 text-sm mb-4">Ideal para quienes solo quieren lo básico.</p>
            
            <div className="space-y-4 mb-8 flex-grow">
              {[
                "Acceso al método principal",
                "Elimina la calcificación en minutos",
                "Funciona con artículos económicos",
                "Resultado inmediato"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-zinc-300 text-sm">
                  <CheckCircle2 className="text-zinc-500 w-5 h-5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mb-5">
              <span className="text-zinc-500 line-through text-sm">$27</span>
              <div className="flex items-baseline gap-1">
                <span className="text-zinc-400 text-lg font-bold">$</span>
                <span className="text-4xl font-black text-white">5</span>
              </div>
            </div>

            <Button 
              onClick={() => window.location.href = "https://pay.hotmart.com/K105303276T?checkoutMode=10"} 
              className="bg-zinc-800 text-white shadow-none hover:bg-zinc-700"
            >
              QUIERO COMENZAR AHORA
            </Button>
          </div>

          {/* =========================================
              PLANO 2 - PRO (AVANÇADO)
              =========================================
              COLOQUE O LINK DE CHECKOUT NO BOTÃO ABAIXO POSTERIORMENTE
          */}
          <div className="bg-zinc-900 p-6 md:p-8 rounded-[32px] border-2 border-primary relative flex flex-col shadow-[0_0_40px_rgba(6,182,212,0.15)]">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-zinc-950 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
              🔥 MÁS ELEGIDO
            </div>
            
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              Cristalize™ PRO <Zap className="w-5 h-5 text-primary fill-primary" />
            </h3>
            <p className="text-zinc-400 text-sm mb-4">Acceso completo y duradero.</p>
            
            <div className="space-y-4 mb-8 flex-grow">
              {[
                "Método completo Cristalize™",
                "TODOS los bonos desbloqueados",
                "Técnicas de nivel profesional",
                "Resultado más duradero",
                "Evita que el problema regrese"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-zinc-100 text-sm font-medium">
                  <CheckCircle2 className="text-primary w-5 h-5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <p className="text-[10px] text-primary font-bold mb-5 italic leading-tight">
              La mayoría de las personas elige el PRO porque evita tener que repetir el trabajo y garantiza un resultado perfecto.
            </p>

            <div className="mb-5">
              <span className="text-zinc-500 line-through text-sm">$81</span>
              <div className="flex items-baseline gap-1">
                <span className="text-primary text-lg font-bold">$</span>
                <span className="text-5xl font-black text-white">10</span>
              </div>
            </div>

            {/* LINK DO CHECKOUT ADICIONADO ABAIXO */}
            <Button 
              onClick={() => window.location.href = "https://pay.hotmart.com/F105303460Y?checkoutMode=10"}
              className="bg-primary text-zinc-950 hover:bg-primary-light"
            >
              QUIERO EL RESULTADO COMPLETO
            </Button>
          </div>
        </div>
        
        <p className="text-center text-zinc-500 text-xs mt-8">
          Solo necesitas aplicarlo una vez para ver el resultado.
        </p>
      </Section>

      {/* 8. FAQ SECTION */}
      <Section className="pb-16 md:pb-32">
        <div className="flex items-center justify-center gap-3 mb-8">
          <HelpCircle className="text-primary w-8 h-8" />
          <h2 className="text-2xl font-bold">Preguntas Frecuentes</h2>
        </div>

        <div className="bg-zinc-900/30 rounded-3xl p-6 border border-zinc-800">
          {[
            { q: "¿Funciona en cualquier tipo de vidrio?", a: "Sí, el método se puede aplicar en puertas de baño, ventanas, espejos, mesas y cualquier superficie de vidrio." },
            { q: "¿Necesito comprar algo costoso?", a: "No, solo usas artículos simples que probablemente ya tengas en casa." },
            { q: "¿Funciona en manchas antiguas?", a: "Sí, incluso en manchas que parecen imposibles de quitar." },
            { q: "¿Cuánto tiempo toma?", a: "Menos de 5 minutos para ver un resultado visible." },
            { q: "¿Y si no funciona?", a: "Puedes probarlo sin riesgos, ya que el método es simple e inmediato de aplicar." }
          ].map((faq, i) => (
            <Accordion key={i} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-900 py-6 px-4 text-center">
        <div className="flex items-center justify-center mb-2 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
          <img src={logo} alt="Cristalize Logo" className="w-32 object-contain" />
        </div>
        <p className="text-zinc-600 text-[10px] max-w-md mx-auto leading-relaxed">
          © 2026 Cristalize Método Profesional. Todos los derechos reservados.<br />
          Este sitio no está afiliado a TikTok o Facebook. Los resultados pueden variar de persona a persona.
        </p>
      </footer>

      <SalesNotification show={showSales} />
    </div>
  );
}
