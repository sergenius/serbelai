import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Check, MessageCircle } from 'lucide-react';
import { Logo } from '../components/Logo';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

const WHATSAPP_URL =
  'https://wa.me/573157597079?text=' +
  encodeURIComponent('Hola, quiero agendar una sesión sobre soluciones de IA.');

const PLANS = [
  {
    key: 'kickoff',
    featured: false,
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
  },
  {
    key: 'build',
    featured: true,
    image:
      'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=800&q=80',
  },
  {
    key: 'scale',
    featured: false,
    image:
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80',
  },
] as const;

export const Landing: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    const html = document.documentElement;
    const { body } = document;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, []);

  return (
    <div className="relative h-dvh max-h-dvh overflow-hidden overscroll-none bg-secondary text-white">
      <img
        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2400&q=80"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary/90 to-primary/40" />

      <div className="relative flex h-full min-h-0 flex-col px-3 py-2 sm:px-6 sm:py-3 lg:px-8">
        <header className="flex h-12 shrink-0 items-center justify-between sm:h-14">
          <a href="/" aria-label="serbelAI" className="scale-90 sm:scale-100">
            <Logo />
          </a>
          <div className="flex items-center gap-3">
            <LanguageSwitcher variant="dark" />
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-3 py-1.5 text-xs font-semibold text-white sm:px-4 sm:py-2 sm:text-sm"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="hidden sm:inline">{t('landing.cta.whatsapp')}</span>
              <span className="sm:hidden">{t('landing.nav.cta')}</span>
            </a>
          </div>
        </header>

        <main className="grid min-h-0 flex-1 grid-rows-[auto_minmax(0,1fr)] gap-3 py-2 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:grid-rows-1 lg:items-stretch lg:gap-6 lg:py-3">
          <section className="flex min-h-0 flex-col justify-center lg:pr-4">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary-light sm:text-xs">
              {t('landing.hero.badge')}
            </p>
            <h1 className="max-w-xl text-[clamp(1.6rem,4.2vh,3.5rem)] font-bold leading-[1.05]">
              {t('landing.hero.title')}
            </h1>
            <p className="mt-2 max-w-md text-[clamp(0.8rem,1.8vh,1.125rem)] text-gray-200">
              {t('landing.hero.subtitle')}
            </p>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold shadow-lg shadow-primary/30 transition hover:bg-primary-light sm:px-7 sm:py-3 sm:text-base"
            >
              {t('landing.hero.cta')}
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </a>

            <div className="mt-4 hidden gap-2 sm:flex">
              {(['clients', 'delivery', 'roi'] as const).map((stat) => (
                <div
                  key={stat}
                  className="rounded-2xl bg-white/95 px-3 py-2 text-center text-secondary shadow-lg"
                >
                  <p className="text-lg font-bold leading-none text-primary lg:text-xl">
                    {t(`landing.stats.${stat}.value`)}
                  </p>
                  <p className="mt-1 text-[10px] font-medium text-gray-500 lg:text-xs">
                    {t(`landing.stats.${stat}.label`)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid min-h-0 grid-cols-3 gap-2 sm:gap-3">
            {PLANS.map((plan) => {
              const features = (
                t(`landing.pricing.plans.${plan.key}.features`, {
                  returnObjects: true,
                }) as string[]
              ).slice(0, 3);

              return (
                <a
                  key={plan.key}
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className={`group relative flex min-h-0 flex-col overflow-hidden rounded-2xl shadow-xl transition hover:-translate-y-0.5 sm:rounded-3xl ${
                    plan.featured
                      ? 'ring-2 ring-primary-light'
                      : 'ring-1 ring-white/15'
                  }`}
                >
                  <div className="relative h-[22%] min-h-[4.5rem] shrink-0 overflow-hidden sm:h-[32%] sm:min-h-[6rem]">
                    <img
                      src={plan.image}
                      alt={t(`landing.pricing.plans.${plan.key}.name`)}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
                    {plan.featured && (
                      <span className="absolute left-2 top-2 rounded-full bg-primary px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide sm:text-[10px]">
                        {t('landing.pricing.popular')}
                      </span>
                    )}
                  </div>

                  <div
                    className={`flex min-h-0 flex-1 flex-col p-2 sm:p-3 lg:p-4 ${
                      plan.featured ? 'bg-primary' : 'bg-white text-secondary'
                    }`}
                  >
                    <h2
                      className={`text-[11px] font-semibold sm:text-sm ${
                        plan.featured ? 'text-white' : 'text-secondary'
                      }`}
                    >
                      {t(`landing.pricing.plans.${plan.key}.name`)}
                    </h2>
                    <p
                      className={`mt-1 text-[clamp(0.95rem,2.4vh,1.6rem)] font-bold leading-tight ${
                        plan.featured ? 'text-white' : 'text-primary'
                      }`}
                    >
                      {t(`landing.pricing.plans.${plan.key}.price`)}
                    </p>
                    <p
                      className={`text-[10px] sm:text-xs ${
                        plan.featured ? 'text-white/80' : 'text-gray-500'
                      }`}
                    >
                      {t(`landing.pricing.plans.${plan.key}.period`)}
                    </p>
                    <ul className="mt-2 hidden min-h-0 space-y-1 overflow-hidden md:block">
                      {features.map((feature) => (
                        <li
                          key={feature}
                          className={`flex items-start gap-1.5 text-[11px] leading-snug lg:text-xs ${
                            plan.featured ? 'text-white/90' : 'text-gray-600'
                          }`}
                        >
                          <Check className="mt-0.5 h-3 w-3 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <span
                      className={`mt-auto inline-flex items-center justify-center gap-1 rounded-full px-2 py-1.5 text-[10px] font-semibold sm:mt-3 sm:py-2 sm:text-xs ${
                        plan.featured
                          ? 'bg-white text-primary'
                          : 'bg-secondary text-white'
                      }`}
                    >
                      {t('landing.pricing.cta')}
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </a>
              );
            })}
          </section>
        </main>
      </div>
    </div>
  );
};
