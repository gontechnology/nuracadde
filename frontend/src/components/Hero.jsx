import React from 'react';
import { Search, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const Hero = () => {
  const handleSearch = (e) => {
    e.preventDefault();
    const element = document.getElementById('properties');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative pt-20 min-h-screen flex items-center">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1682942361507-32c6acba91d8"
          alt="Luxury Real Estate"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a5f]/95 via-[#1e3a5f]/85 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-block mb-6">
            <span className="bg-[#c87941] text-white px-6 py-2 rounded-full text-sm font-semibold tracking-wide">
              Bağdat Caddesi'nde 15 Yıllık Tecrübe
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Hayalinizdeki Evi
            <span className="block text-[#c87941]">Birlikte Bulalım</span>
          </h1>
          
          <p className="text-xl text-gray-200 mb-12 leading-relaxed">
            Kadıköy'ün en prestijli bölgelerinde; Bağdat Caddesi, Fenerbahçe ve Caddebostan'da 
            güvenilir emlak danışmanlığı hizmeti sunuyoruz.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-2xl p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  İlan Tipi
                </label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Satılık / Kiralık" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sale">Satılık</SelectItem>
                    <SelectItem value="rent">Kiralık</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Konum
                </label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Bölge Seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bagdat">Bağdat Caddesi</SelectItem>
                    <SelectItem value="fenerbahce">Fenerbahçe</SelectItem>
                    <SelectItem value="caddebostan">Caddebostan</SelectItem>
                    <SelectItem value="suadiye">Suadiye</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Oda Sayısı
                </label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seçiniz" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1+1</SelectItem>
                    <SelectItem value="2">2+1</SelectItem>
                    <SelectItem value="3">3+1</SelectItem>
                    <SelectItem value="4">4+1</SelectItem>
                    <SelectItem value="5">5+1 ve üzeri</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button
              type="submit"
              className="w-full bg-[#c87941] hover:bg-[#b86930] text-white text-lg py-6 transition-all hover:scale-[1.02]"
            >
              <Search className="w-5 h-5 mr-2" />
              İlan Ara
            </Button>
          </form>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">500+</div>
              <div className="text-sm text-gray-300">Mutlu Müşteri</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">350+</div>
              <div className="text-sm text-gray-300">Satılan Emlak</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">15+</div>
              <div className="text-sm text-gray-300">Yıl Tecrübe</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">50+</div>
              <div className="text-sm text-gray-300">Aktif İlan</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;