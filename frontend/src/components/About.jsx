import React from 'react';
import { Award, Users, Target, Heart } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1e3a5f] mb-6">
              Hakkımızda
            </h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              <strong className="text-[#c87941]">Nura Cadde Emlak</strong>, 15 yıldır Bağdat Caddesi 
              ve çevresinde güvenilir emlak danışmanlığı hizmeti sunmaktadır. Kadıköy'ün en prestijli 
              bölgelerinde; Fenerbahçe, Caddebostan ve Suadiye'de uzmanlaşmış ekibimizle, 
              müşterilerimize hayallerindeki evi bulmalarında yardımcı oluyoruz.
            </p>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Sektördeki derin tecrübemiz, yerel pazar bilgimiz ve müşteri memnuniyeti odaklı 
              yaklaşımımızla, her aşamada yanınızdayız. Amacımız, sadece bir emlak bulmak değil, 
              sizin için doğru yatırımı ve yaşam alanını keşfetmektir.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-[#c87941]/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <Award className="w-6 h-6 text-[#c87941]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1e3a5f] mb-1">15 Yıllık Tecrübe</h4>
                  <p className="text-sm text-gray-600">Sektörde uzmanlık</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-[#c87941]/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <Users className="w-6 h-6 text-[#c87941]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1e3a5f] mb-1">500+ Mutlu Müşteri</h4>
                  <p className="text-sm text-gray-600">Güvenilir hizmet</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-[#c87941]/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <Target className="w-6 h-6 text-[#c87941]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1e3a5f] mb-1">Bölge Uzmanlığı</h4>
                  <p className="text-sm text-gray-600">Kadıköy'de lider</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-[#c87941]/10 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                  <Heart className="w-6 h-6 text-[#c87941]" />
                </div>
                <div>
                  <h4 className="font-bold text-[#1e3a5f] mb-1">Müşteri Memnuniyeti</h4>
                  <p className="text-sm text-gray-600">%100 öncelik</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1551836022-d5d88e9218df"
                alt="Professional Consultation"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f]/80 via-transparent to-transparent"></div>
              
              {/* Stats Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="grid grid-cols-3 gap-4">
                  <Card className="bg-white/95 backdrop-blur-sm">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold text-[#c87941]">500+</div>
                      <div className="text-xs text-gray-600 mt-1">Mutlu Müşteri</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/95 backdrop-blur-sm">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold text-[#c87941]">350+</div>
                      <div className="text-xs text-gray-600 mt-1">Satış</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/95 backdrop-blur-sm">
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl font-bold text-[#c87941]">15+</div>
                      <div className="text-xs text-gray-600 mt-1">Yıl</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
            
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-[#c87941]/10 rounded-2xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;