import React from 'react';
import { Home, Key, Calculator, TrendingUp, FileText, Users } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { services } from '../mockData';

const iconMap = {
  home: Home,
  key: Key,
  calculator: Calculator,
  trendingUp: TrendingUp,
  fileText: FileText,
  users: Users
};

const Services = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1e3a5f] mb-4">
            Hizmetlerimiz
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Gayrimenkul ihtiyaçlarınız için eksiksiz ve güvenilir hizmetler sunuyoruz
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = iconMap[service.icon];
            return (
              <Card
                key={service.id}
                className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-[#c87941]"
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-[#c87941]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#c87941] transition-colors">
                    <IconComponent className="w-8 h-8 text-[#c87941] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1e3a5f] mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;