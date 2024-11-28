import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Logo />
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-secondary hover:text-primary transition-colors"
            >
              {t('nav.home')}
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-secondary hover:text-primary transition-colors"
            >
              {t('nav.services')}
            </button>
            <button
              onClick={() => scrollToSection('portfolio')}
              className="text-secondary hover:text-primary transition-colors"
            >
              {t('nav.portfolio')}
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-secondary hover:text-primary transition-colors"
            >
              {t('nav.about')}
            </button>
            <LanguageSwitcher />
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
            >
              {t('nav.contactUs')}
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <LanguageSwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-secondary hover:text-primary transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              onClick={() => scrollToSection('home')}
              className="block w-full text-left px-3 py-2 text-secondary hover:text-primary transition-colors"
            >
              {t('nav.home')}
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="block w-full text-left px-3 py-2 text-secondary hover:text-primary transition-colors"
            >
              {t('nav.services')}
            </button>
            <button
              onClick={() => scrollToSection('portfolio')}
              className="block w-full text-left px-3 py-2 text-secondary hover:text-primary transition-colors"
            >
              {t('nav.portfolio')}
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="block w-full text-left px-3 py-2 text-secondary hover:text-primary transition-colors"
            >
              {t('nav.about')}
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full mt-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
            >
              {t('nav.contactUs')}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};