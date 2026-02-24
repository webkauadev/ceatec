import { MessageCircle } from 'lucide-react';
import logoImage from '@/assets/logo-ceatec.png';
import logoDji from '@/assets/logo-dji-agriculture.png';
import { openWhatsApp } from '@/lib/whatsapp';

export const Footer = () => (
  <footer className="py-12 bg-[hsl(0_0%_2%)] text-muted-foreground">
    <div className="container-wide">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-3">
          <div className="flex items-center gap-3">
            <img src={logoImage} alt="CEATEC" className="h-20 brightness-0 invert" />
            <div className="h-10 border-l border-foreground/20" />
            <img src={logoDji} alt="DJI Agriculture" className="h-10 brightness-0 invert" />
          </div>
          <p className="text-sm text-center md:text-left">CEATEC LTDA — Centro Educacional, Assessoria, Tecnologia e Crédito.</p>
          <p className="text-xs opacity-60">Av. José do Patrocínio, 4515 - Centro, Vilhena - RO, 76980-180</p>
        </div>
        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="flex gap-4 text-sm">
            <a href="#" className="hover:text-foreground transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-foreground transition-colors">Termos de Uso</a>
          </div>
          <button onClick={() => openWhatsApp()} className="flex items-center gap-2 text-sm hover:text-primary transition-colors">
            <MessageCircle className="w-4 h-4" /> Atendimento via WhatsApp
          </button>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-border text-center text-xs opacity-60">© {new Date().getFullYear()} CEATEC. Todos os direitos reservados.</div>
    </div>
  </footer>
);
