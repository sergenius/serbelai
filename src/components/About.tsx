import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Award, Briefcase, GraduationCap, Users } from 'lucide-react';

export const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-secondary mb-4">{t('about.title')}</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {t('about.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-secondary">{t('about.sergio.name')}</h3>
            <p className="text-gray-600">{t('about.sergio.intro')}</p>
            
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-secondary flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                {t('about.experience.title')}
              </h4>
              <div className="space-y-4 pl-7">
                {['aws', 'datavail', 'vozip', 'intelbras', 'quadritech'].map((role) => (
                  <motion.div
                    key={role}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="border-l-2 border-primary pl-4"
                  >
                    <h5 className="font-semibold text-secondary">{t(`about.experience.${role}.title`)}</h5>
                    <p className="text-gray-600">{t(`about.experience.${role}.description`)}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-xl font-semibold text-secondary mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary" />
                {t('about.education.title')}
              </h4>
              <p className="text-gray-600">{t('about.education.degree')}</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-xl font-semibold text-secondary mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                {t('about.leadership.title')}
              </h4>
              <ul className="space-y-2 text-gray-600">
                {['leadership1', 'leadership2', 'leadership3'].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    {t(`about.leadership.${item}`)}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-xl font-semibold text-secondary mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                {t('about.mission.title')}
              </h4>
              <p className="text-gray-600">{t('about.mission.description')}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};