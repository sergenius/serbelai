import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight,
  Check,
  MessageCircle,
  Sparkles,
  Zap,
  LineChart,
} from 'lucide-react';
import { Logo } from '../components/Logo';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { Chatbot } from '../components/Chatbot';
import { submitContactForm } from '../utils/contactForm';

const WHATSAPP_URL =
  'https://wa.me/573157597079?text=' +
  encodeURIComponent('Hola, quiero agendar una sesión sobre soluciones de IA.');

const PRODUCTS = [
  {
    key: 'assistant',
    icon: MessageCircle,
    image:
      'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    key: 'automation',
    icon: Zap,
    image:
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    key: 'insights',
    icon: LineChart,
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
  },
] as const;

const PLANS = [
  { key: 'kickoff', featured: false },
  { key: 'build', featured: true },
  { key: 'scale', featured: false },
] as const;

const CASES = [
  {
    key: 'retail',
    image:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80',
  },
  {
    key: 'ops',
    image:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80',
  },
  {
    key: 'support',
    image:
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=80',
  },
] as const;

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

export const Landing: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>(
    'idle'
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await submitContactForm(formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-white text-secondary">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-secondary/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="/" aria-label="serbelAI">
            <Logo />
          </a>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => scrollTo('pricing')}
              className="hidden text-sm text-white/80 transition-colors hover:text-white md:inline"
            >
              {t('landing.nav.pricing')}
            </button>
            <LanguageSwitcher variant="dark" />
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-light"
            >
              {t('landing.nav.cta')}
            </a>
          </div>
        </div>
      </nav>

      <section className="relative min-h-[92vh] overflow-hidden bg-secondary pt-16">
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2400&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/85 to-secondary/40" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary-light">
              <Sparkles className="h-3.5 w-3.5" />
              {t('landing.hero.badge')}
            </p>
            <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
              {t('landing.hero.title')}
            </h1>
            <p className="mt-5 max-w-lg text-lg text-gray-300">
              {t('landing.hero.subtitle')}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary/30 transition hover:bg-primary-light"
              >
                {t('landing.hero.cta')}
                <ArrowRight className="h-5 w-5" />
              </a>
              <button
                type="button"
                onClick={() => scrollTo('pricing')}
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-4 text-base font-semibold text-white transition hover:bg-white/10"
              >
                {t('landing.hero.ctaSecondary')}
              </button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1400&q=80"
              alt={t('landing.hero.imageAlt')}
              className="h-[420px] w-full rounded-3xl object-cover shadow-2xl ring-1 ring-white/10"
            />
            <div className="absolute -bottom-6 left-6 right-6 grid grid-cols-3 gap-3">
              {(['clients', 'delivery', 'roi'] as const).map((stat) => (
                <div
                  key={stat}
                  className="rounded-2xl bg-white p-3 text-center shadow-xl"
                >
                  <p className="text-xl font-bold text-primary md:text-2xl">
                    {t(`landing.stats.${stat}.value`)}
                  </p>
                  <p className="text-[11px] font-medium text-gray-500 md:text-xs">
                    {t(`landing.stats.${stat}.label`)}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between gap-4">
            <h2 className="text-3xl font-bold md:text-4xl">
              {t('landing.products.title')}
            </h2>
            <p className="hidden max-w-sm text-right text-gray-500 md:block">
              {t('landing.products.subtitle')}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {PRODUCTS.map((product, index) => (
              <motion.article
                key={product.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group overflow-hidden rounded-3xl bg-secondary shadow-lg"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={product.image}
                    alt={t(`landing.products.items.${product.key}.title`)}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent" />
                  <product.icon className="absolute left-5 top-5 h-8 w-8 text-white" />
                </div>
                <div className="p-6 pt-2">
                  <h3 className="text-xl font-semibold text-white">
                    {t(`landing.products.items.${product.key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm text-gray-300">
                    {t(`landing.products.items.${product.key}.caption`)}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">
              {t('landing.pricing.title')}
            </h2>
            <p className="mt-3 text-gray-500">{t('landing.pricing.subtitle')}</p>
          </div>
          <div className="grid items-stretch gap-6 lg:grid-cols-3">
            {PLANS.map((plan, index) => {
              const features = t(`landing.pricing.plans.${plan.key}.features`, {
                returnObjects: true,
              }) as string[];

              return (
                <motion.article
                  key={plan.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex flex-col rounded-3xl p-8 shadow-lg ${
                    plan.featured
                      ? 'scale-[1.02] bg-secondary text-white ring-4 ring-primary'
                      : 'bg-white text-secondary'
                  }`}
                >
                  {plan.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-xs font-bold uppercase tracking-wide text-white">
                      {t('landing.pricing.popular')}
                    </span>
                  )}
                  <h3 className="text-lg font-semibold">
                    {t(`landing.pricing.plans.${plan.key}.name`)}
                  </h3>
                  <p
                    className={`mt-4 text-4xl font-bold ${plan.featured ? 'text-white' : 'text-primary'}`}
                  >
                    {t(`landing.pricing.plans.${plan.key}.price`)}
                  </p>
                  <p
                    className={`mt-1 text-sm ${plan.featured ? 'text-gray-300' : 'text-gray-500'}`}
                  >
                    {t(`landing.pricing.plans.${plan.key}.period`)}
                  </p>
                  <ul className="mt-8 flex-1 space-y-3">
                    {features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <Check
                          className={`mt-0.5 h-4 w-4 shrink-0 ${plan.featured ? 'text-primary-light' : 'text-primary'}`}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className={`mt-8 inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition ${
                      plan.featured
                        ? 'bg-primary text-white hover:bg-primary-light'
                        : 'bg-secondary text-white hover:bg-secondary-light'
                    }`}
                  >
                    {t('landing.pricing.cta')}
                  </a>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-10 text-3xl font-bold md:text-4xl">
            {t('landing.cases.title')}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {CASES.map((item, index) => (
              <motion.article
                key={item.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative h-80 overflow-hidden rounded-3xl"
              >
                <img
                  src={item.image}
                  alt={t(`landing.cases.items.${item.key}.label`)}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 p-6 text-white">
                  <p className="text-3xl font-bold">
                    {t(`landing.cases.items.${item.key}.metric`)}
                  </p>
                  <p className="mt-1 text-sm text-gray-200">
                    {t(`landing.cases.items.${item.key}.label`)}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative overflow-hidden bg-secondary py-20 pb-28 md:pb-20">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000&q=80"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-bold text-white md:text-5xl">
              {t('landing.cta.title')}
            </h2>
            <p className="mt-4 max-w-md text-lg text-gray-300">
              {t('landing.cta.subtitle')}
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-4 text-base font-semibold text-white transition hover:brightness-110"
            >
              <MessageCircle className="h-5 w-5" />
              {t('landing.cta.whatsapp')}
            </a>
          </div>

          <form
            name="contact"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="space-y-4 rounded-3xl bg-white p-8 shadow-2xl"
          >
            <input type="hidden" name="form-name" value="contact" />
            <p className="hidden">
              <label>
                Don’t fill this out:{' '}
                <input name="bot-field" tabIndex={-1} autoComplete="off" />
              </label>
            </p>
            <h3 className="text-xl font-bold">{t('landing.cta.formTitle')}</h3>
            <input
              type="text"
              name="name"
              required
              placeholder={t('contact.form.name')}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none ring-primary focus:ring-2"
            />
            <input
              type="email"
              name="email"
              required
              placeholder={t('contact.form.email')}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none ring-primary focus:ring-2"
            />
            <textarea
              name="message"
              required
              rows={3}
              placeholder={t('contact.form.message')}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none ring-primary focus:ring-2"
            />
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full rounded-full bg-primary py-3 font-semibold text-white transition hover:bg-primary-dark disabled:opacity-50"
            >
              {status === 'sending'
                ? t('contact.form.sending')
                : t('landing.cta.submit')}
            </button>
            {status === 'success' && (
              <p className="text-sm text-green-600">{t('contact.form.success')}</p>
            )}
            {status === 'error' && (
              <p className="text-sm text-red-600">{t('contact.form.error')}</p>
            )}
          </form>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-secondary/95 p-3 backdrop-blur md:hidden">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 font-semibold text-white"
        >
          {t('landing.hero.cta')}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <Chatbot />
    </div>
  );
};
