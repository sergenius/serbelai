import React from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Chatbot } from './components/Chatbot';
import emailjs from '@emailjs/browser';

emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

function App() {
  const { t } = useTranslation();
  
  console.log('App component rendering');

  return (
    <div className="min-h-screen bg-white">
      <h1>Test Header</h1>
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <Contact />
      <Chatbot />
    </div>
  );
}

export default App;