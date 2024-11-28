import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const industries = [
  {
    translationKey: 'healthcare',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80'
  },
  {
    translationKey: 'finance',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80'
  },
  {
    translationKey: 'manufacturing',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80'
  },
  {
    translationKey: 'retail',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80'
  }
];

export const Portfolio: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-secondary mb-4">{t('portfolio.title')}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('portfolio.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.translationKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative group"
            >
              <div className="relative h-80 overflow-hidden rounded-lg">
                <img
                  src={industry.image}
                  alt={t(`portfolio.industries.${industry.translationKey}.name`)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {t(`portfolio.industries.${industry.translationKey}.name`)}
                  </h3>
                  <ul className="text-gray-200 space-y-1">
                    {t(`portfolio.industries.${industry.translationKey}.projects`, { returnObjects: true }).map((project: string, idx: number) => (
                      <li key={idx}>{project}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};