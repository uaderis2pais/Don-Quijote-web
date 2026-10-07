import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import WelcomeSection from '../components/WelcomeSection';
import MenuPromoSection from '../components/MenuPromoSection';
import StoryAndFeatures from '../components/StoryAndFeatures';
import VisitUsSection from '../components/VisitUsSection';

export const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Bienvenido a Don Quijote (3 Cards Layout) */}
      <WelcomeSection />

      {/* Invitación a La Carta Completa */}
      <MenuPromoSection />

      {/* Nuestra Historia & 4 Feature Circles & Panoramic Quote Banner */}
      <StoryAndFeatures />

      {/* Vení a Visitarnos (3 Cards: Datos, Mapa & Consulta) */}
      <VisitUsSection />
    </>
  );
};

export default HomePage;
