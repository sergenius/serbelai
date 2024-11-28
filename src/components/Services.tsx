import React from 'react';
import { motion } from 'framer-motion';
import { 
  Lightbulb,
  Code2, 
  BarChart4, 
  Cog, 
  Brain, 
  Shield, 
  Database, 
  Network 
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

const services = [
  {
    icon: Lightbulb,
    translationKey: 'strategy'
  },
  {
    icon: Code2,
    translationKey: 'custom'
  },
  {
    icon: BarChart4,
    translationKey: 'analysis'
  },
  {
    icon: Cog,
    translationKey: 'implementation'
  },
  {
    icon: Brain,
    translationKey: 'nlp'
  },
  {
    icon: Shield,
    translationKey: 'ethical'
  },
  {
    icon: Database,
    translationKey: 'data'
  },
  {
    icon: Network,
    translationKey: 'training'
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const Services: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-secondary mb-4">{t('services.title')}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.translationKey}
              variants={item}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow"
            >
              <service.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-secondary mb-2">
                {t(`services.items.${service.translationKey}.title`)}
              </h3>
              <p className="text-gray-600">
                {t(`services.items.${service.translationKey}.description`)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};