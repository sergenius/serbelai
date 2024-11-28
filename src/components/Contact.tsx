import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';

export const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  useEffect(() => {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (!publicKey) {
      console.error('EmailJS public key is not defined in environment variables');
      return;
    }
    emailjs.init(publicKey);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.error('Required EmailJS configuration is missing');
      setStatus('error');
      return;
    }
    
    try {
      const result = await emailjs.sendForm(
        serviceId,
        templateId,
        e.currentTarget,
        publicKey
      );
      
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-secondary mb-4">{t('contact.title')}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-lg shadow-md"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  {t('contact.form.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  {t('contact.form.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  {t('contact.form.message')}
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50"
              >
                {status === 'sending' ? t('contact.form.sending') : t('contact.form.send')}
              </button>
              {status === 'success' && (
                <p className="text-green-600">{t('contact.form.success')}</p>
              )}
              {status === 'error' && (
                <p className="text-red-600">{t('contact.form.error')}</p>
              )}
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-start space-x-4">
              <Mail className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold text-secondary">{t('contact.info.email.label')}</h3>
                <p className="text-gray-600">{t('contact.info.email.value')}</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Phone className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold text-secondary">{t('contact.info.phone.label')}</h3>
                <p className="text-gray-600">{t('contact.info.phone.value')}</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold text-secondary">{t('contact.info.location.label')}</h3>
                <p className="text-gray-600">{t('contact.info.location.value')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};