import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

type LanguageSwitcherProps = {
  variant?: 'light' | 'dark';
};

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'light',
}) => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'pt', name: 'Português' },
    { code: 'fr', name: 'Français' }
  ];

  const triggerClass =
    variant === 'dark'
      ? 'flex items-center gap-2 text-white hover:text-primary-light transition-colors'
      : 'flex items-center gap-2 text-secondary hover:text-primary transition-colors';

  return (
    <div className="relative group">
      <button className={triggerClass}>
        <Globe className="w-5 h-5" />
        <span className="hidden md:inline">
          {languages.find(
            (lang) => i18n.resolvedLanguage === lang.code || i18n.language.startsWith(lang.code)
          )?.name}
        </span>
      </button>
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            className="block w-full text-left px-4 py-2 text-sm text-secondary hover:bg-primary hover:text-white transition-colors"
          >
            {lang.name}
          </button>
        ))}
      </div>
    </div>
  );
};