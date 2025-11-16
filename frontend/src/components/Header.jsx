import React, { useState, useEffect } from 'react';
import { Phone, Mail, Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="https://customer-assets.emergentagent.com/job_0b59f305-05be-4f90-b21d-30a60031e6ca/artifacts/1rriep1t_nuracadde.jpeg"
              alt="Nura Cadde"
              className="h-12 w-auto object-contain"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className="text-gray-700 hover:text-[#c87941] transition-colors font-medium"
            >
              Ana Sayfa
            </button>
            <button
              onClick={() => scrollToSection('properties')}
              className="text-gray-700 hover:text-[#c87941] transition-colors font-medium"
            >
              İlanlar
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-gray-700 hover:text-[#c87941] transition-colors font-medium"
            >
              Hizmetler
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-[#c87941] transition-colors font-medium"
            >
              Hakkımızda
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="text-gray-700 hover:text-[#c87941] transition-colors font-medium"
            >
              Referanslar
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-[#c87941] transition-colors font-medium"
            >
              İletişim
            </button>
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <a
              href="tel:05555351313"
              className="flex items-center text-gray-700 hover:text-[#c87941] transition-colors"
            >
              <Phone className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">0555 535 13 13</span>
            </a>
            <Button
              onClick={() => scrollToSection('contact')}
              className="bg-[#c87941] hover:bg-[#b86930] text-white transition-colors"
            >
              İletişime Geç
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700 hover:text-[#c87941] transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('home')}
                className="text-gray-700 hover:text-[#c87941] transition-colors font-medium text-left"
              >
                Ana Sayfa
              </button>
              <button
                onClick={() => scrollToSection('properties')}
                className="text-gray-700 hover:text-[#c87941] transition-colors font-medium text-left"
              >
                İlanlar
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="text-gray-700 hover:text-[#c87941] transition-colors font-medium text-left"
              >
                Hizmetler
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-[#c87941] transition-colors font-medium text-left"
              >
                Hakkımızda
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="text-gray-700 hover:text-[#c87941] transition-colors font-medium text-left"
              >
                Referanslar
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 hover:text-[#c87941] transition-colors font-medium text-left"
              >
                İletişim
              </button>
              <div className="pt-4 border-t border-gray-200">
                <a
                  href="tel:05555351313"
                  className="flex items-center text-gray-700 hover:text-[#c87941] transition-colors mb-3"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  <span className="text-sm font-medium">0555 535 13 13</span>
                </a>
                <Button
                  onClick={() => scrollToSection('contact')}
                  className="w-full bg-[#c87941] hover:bg-[#b86930] text-white transition-colors"
                >
                  İletişime Geç
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;