import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileWarning, 
  HandCoins, 
  Building2, 
  Phone, 
  Clock, 
  CreditCard, 
  HelpCircle,
  MessageCircle,
  Search,
  CheckCircle2,
  ArrowRight,
  Loader2
} from 'lucide-react';

// URL de AgentOS QA (decoy siempre apunta ahí). DECOY_SIGNING_SECRET está en el env de AgentOS QA.
const QA_BOT_URL = 'https://qa.umbralhq.io';
const DECOY_API = `${QA_BOT_URL}/api/decoy-url?slug=buro-legal`;

function useDecoyCTA() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleClick = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(DECOY_API);
      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data?.error || 'Error al obtener enlace');
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  return { handleClick, loading, error };
}

const CTAButton = ({ className = "", variant = "default", children }) => {
  const { handleClick, loading, error } = useDecoyCTA();
  const baseClasses = "cta-button";
  const variantClasses = variant === "giant" ? "cta-button-giant" : "";

  return (
    <div className="inline-block">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className={`${baseClasses} ${variantClasses} ${className} ${loading ? 'opacity-80 cursor-wait' : ''}`}
        data-testid="cta-button"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin inline" />
            Cargando…
          </>
        ) : (
          children
        )}
      </button>
      {error && (
        <p className="mt-2 text-sm text-red-600" data-testid="cta-error">
          Error al conectar. Intenta de nuevo.
        </p>
      )}
    </div>
  );
};

const HeroSection = () => (
  <section className="hero-section" data-testid="hero-section">
    <div className="max-w-3xl mx-auto">
      {/* Badge */}
      <div className="badge mb-6">
        <MessageCircle className="w-4 h-4" />
        <span>Asesoría Gratuita • Sin Compromiso</span>
      </div>
      
      {/* Main Headline */}
      <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
        ¿Te están cobrando una deuda y no sabes si es válida?
      </h1>
      
      {/* Subheadline */}
      <p className="text-lg sm:text-xl text-slate-600 mb-4 max-w-2xl mx-auto leading-relaxed">
        En 2 minutos revisamos tu caso y te decimos si puedes negociar, esperar o defenderte.
      </p>
      
      {/* Curiosity hook */}
      <p className="text-base sm:text-lg text-slate-700 mb-8 max-w-xl mx-auto font-medium">
        Algunas deudas ya no se pueden cobrar. Otras sí.<br />
        <span className="text-blue-600">Aquí te digo cuál es tu caso.</span>
      </p>
      
      {/* Primary CTA */}
      <CTAButton variant="giant" data-testid="hero-cta">
        QUIERO SABER SI DEBO PAGAR
      </CTAButton>
      
      {/* Trust text */}
      <p className="mt-6 text-sm text-slate-500">
        Te respondemos en el chat. Sin llamadas. Sin compromiso.
      </p>
    </div>
  </section>
);

const FeaturesSection = () => {
  const features = [
    {
      icon: Building2,
      title: "Deudas con bancos o apps",
      description: "Revisamos si el cobro es legítimo y si puedes negociar."
    },
    {
      icon: Phone,
      title: "Despachos de cobranza",
      description: "Te orientamos sobre tus derechos ante acoso telefónico."
    },
    {
      icon: Clock,
      title: "Deudas antiguas",
      description: "Verificamos si ya prescribió o si aún pueden cobrarte."
    },
    {
      icon: CreditCard,
      title: "Buró de crédito",
      description: "Analizamos tu situación y opciones de corrección."
    },
    {
      icon: HelpCircle,
      title: "Cargos que no reconoces",
      description: "Te ayudamos a identificar cobros indebidos."
    },
    {
      icon: ShieldCheck,
      title: "Validez legal",
      description: "Verificamos si el cobro cumple con la ley mexicana."
    }
  ];

  return (
    <section className="section section-subtle" data-testid="features-section">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">
            ¿Qué revisa el asistente?
          </h2>
          <p className="text-lg text-slate-600 max-w-xl mx-auto">
            Cuéntanos qué pasó y te orientamos en minutos.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <div key={index} className="feature-card" data-testid={`feature-card-${index}`}>
              <div className="icon-container">
                <feature.icon />
              </div>
              <h3 className="font-heading font-semibold text-slate-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <CTAButton variant="giant">
            QUIERO SABER SI DEBO PAGAR
          </CTAButton>
        </div>
      </div>
    </section>
  );
};

const StepsSection = () => {
  const steps = [
    {
      number: 1,
      title: "Describe tu caso en el chat",
      description: "Responde unas preguntas simples sobre tu situación."
    },
    {
      number: 2,
      title: "El asistente analiza tu situación",
      description: "Revisamos tu caso al instante con base en la ley."
    },
    {
      number: 3,
      title: "Te decimos qué opciones tienes",
      description: "Recibe una ruta de acción clara y legal."
    }
  ];

  return (
    <section className="section" data-testid="steps-section">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">
            ¿Cómo funciona?
          </h2>
          <p className="text-lg text-slate-600">
            Solo 3 pasos para obtener orientación.
          </p>
        </div>
        
        <div className="space-y-4 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="step-card" data-testid={`step-card-${index}`}>
              <div className="step-number">
                {step.number}
              </div>
              <div>
                <h3 className="font-heading font-semibold text-slate-900 mb-1">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <CTAButton variant="giant">
            QUIERO SABER SI DEBO PAGAR
          </CTAButton>
        </div>
      </div>
    </section>
  );
};

const UrgencySection = () => (
  <section className="section urgency-section" data-testid="urgency-section">
    <div className="max-w-3xl mx-auto">
      <div className="mb-10">
        <p className="urgency-text">
          Ignorar llamadas no resuelve el problema.<br />
          Pero pagar sin revisar puede ser peor.<br />
          <span className="text-white font-semibold">Primero revisa tu caso.</span>
        </p>
      </div>
      
      <CTAButton variant="giant" className="!bg-white !text-blue-600 hover:!bg-slate-100">
        QUIERO SABER SI DEBO PAGAR
      </CTAButton>
    </div>
  </section>
);

const Footer = () => (
  <footer className="footer" data-testid="footer-section">
    <div className="max-w-3xl mx-auto">
      <p className="footer-brand">
        Resolución de Deudas México
      </p>
      
      <p className="text-sm mb-8 max-w-lg mx-auto">
        Orientación inicial gratuita.<br />
        No sustituye asesoría legal personalizada.
      </p>
      
      <CTAButton variant="giant">
        QUIERO SABER SI DEBO PAGAR
      </CTAButton>
      
      <p className="text-xs mt-8 text-slate-500">
        © 2024 Resolución de Deudas México. Este servicio es informativo y no constituye asesoría legal vinculante.
      </p>
    </div>
  </footer>
);

const StickyCTA = () => {
  const { handleClick, loading } = useDecoyCTA();
  return (
    <div className="sticky-cta-container md:hidden" data-testid="sticky-cta-container">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className={`sticky-cta ${loading ? 'opacity-80 cursor-wait' : ''}`}
        data-testid="sticky-cta"
      >
        {loading ? 'Cargando…' : 'QUIERO SABER SI DEBO PAGAR'}
      </button>
    </div>
  );
};

const LandingPage = () => {
  return (
    <div className="landing-container pb-sticky-cta" data-testid="landing-page">
      <HeroSection />
      <FeaturesSection />
      <StepsSection />
      <UrgencySection />
      <Footer />
      <StickyCTA />
    </div>
  );
};

export default LandingPage;
