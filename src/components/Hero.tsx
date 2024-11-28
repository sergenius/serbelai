import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Hero: React.FC = () => {
  const { t } = useTranslation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="home" className="relative min-h-screen bg-gradient-to-br from-secondary to-secondary-light">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] opacity-20 bg-cover bg-center" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {t('hero.title')}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-md transition-colors inline-flex items-center justify-center gap-2"
            >
              {t('hero.getStarted')}
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollToSection('portfolio')}
              className="border border-white text-white hover:bg-white/10 px-8 py-3 rounded-md transition-colors"
            >
              {t('hero.viewPortfolio')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};