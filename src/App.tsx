import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Chatbot } from './components/Chatbot';
import { Landing } from './pages/Landing';

const isLandingPath = () =>
  window.location.pathname.replace(/\/+$/, '') === '/landing';

function Home() {
  return (
    <div className="min-h-screen bg-white">
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

function App() {
  return isLandingPath() ? <Landing /> : <Home />;
}

export default App;
