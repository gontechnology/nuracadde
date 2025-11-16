import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#1e3a5f] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <div className="mb-6">
              <img
                src="https://customer-assets.emergentagent.com/job_0b59f305-05be-4f90-b21d-30a60031e6ca/artifacts/1rriep1t_nuracadde.jpeg"
                alt="Nura Cadde"
                className="h-16 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Bağdat Caddesi ve çevresinde 15 yıldır güvenilir emlak danışmanlığı hizmeti sunuyoruz.
            </p>
            {/* Social Media */}
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-[#c87941] rounded-lg flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-[#c87941] rounded-lg flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-[#c87941] rounded-lg flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white/10 hover:bg-[#c87941] rounded-lg flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Hızlı Erişim</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('home')}
                  className="text-gray-300 hover:text-[#c87941] transition-colors"
                >
                  Ana Sayfa
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('properties')}
                  className="text-gray-300 hover:text-[#c87941] transition-colors"
                >
                  İlanlar
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-gray-300 hover:text-[#c87941] transition-colors"
                >
                  Hizmetler
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-gray-300 hover:text-[#c87941] transition-colors"
                >
                  Hakkımızda
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('testimonials')}
                  className="text-gray-300 hover:text-[#c87941] transition-colors"
                >
                  Referanslar
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-300 hover:text-[#c87941] transition-colors"
                >
                  İletişim
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6">Hizmetlerimiz</h3>
            <ul className="space-y-3">
              <li className="text-gray-300">Konut Alım-Satım</li>
              <li className="text-gray-300">Kiralama Hizmetleri</li>
              <li className="text-gray-300">Emlak Değerleme</li>
              <li className="text-gray-300">Yatırım Danışmanlığı</li>
              <li className="text-gray-300">Hukuki Destek</li>
              <li className="text-gray-300">Özel Müşteri Hizmeti</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6">İletişim</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone className="w-5 h-5 mr-3 mt-1 text-[#c87941] flex-shrink-0" />
                <div>
                  <a
                    href="tel:05555351313"
                    className="text-gray-300 hover:text-[#c87941] transition-colors"
                  >
                    0555 535 13 13
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <Mail className="w-5 h-5 mr-3 mt-1 text-[#c87941] flex-shrink-0" />
                <div>
                  <a
                    href="mailto:nurcan.ersoy@nuracadde.com"
                    className="text-gray-300 hover:text-[#c87941] transition-colors block"
                  >
                    nurcan.ersoy@nuracadde.com
                  </a>
                  <a
                    href="mailto:info@nuracadde.com"
                    className="text-gray-300 hover:text-[#c87941] transition-colors block mt-1"
                  >
                    info@nuracadde.com
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 mt-1 text-[#c87941] flex-shrink-0" />
                <div className="text-gray-300">
                  Bağdat Caddesi<br />
                  Kadıköy / İstanbul
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© 2025 Nura Cadde Emlak. Tüm hakları saklıdır.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-[#c87941] transition-colors">
                Gizlilik Politikası
              </a>
              <a href="#" className="hover:text-[#c87941] transition-colors">
                Kullanım Koşulları
              </a>
              <a href="#" className="hover:text-[#c87941] transition-colors">
                KVKK
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;