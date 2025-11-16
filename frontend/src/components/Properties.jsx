import React, { useState } from 'react';
import { Bed, Bath, Maximize, MapPin, Heart } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { featuredProperties } from '../mockData';

const Properties = () => {
  const [filter, setFilter] = useState('all');
  const [favorites, setFavorites] = useState([]);

  const filteredProperties =
    filter === 'all'
      ? featuredProperties
      : featuredProperties.filter((p) => p.type === filter);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  };

  const handleContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="properties" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1e3a5f] mb-4">
            Öne Çıkan İlanlar
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Kadıköy'ün en prestijli bölgelerinde sizin için seçtiğimiz lüks konutlar
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-12 flex-wrap gap-4">
          <Button
            onClick={() => setFilter('all')}
            variant={filter === 'all' ? 'default' : 'outline'}
            className={`transition-all ${
              filter === 'all'
                ? 'bg-[#c87941] hover:bg-[#b86930] text-white'
                : 'hover:border-[#c87941] hover:text-[#c87941]'
            }`}
          >
            Tümü
          </Button>
          <Button
            onClick={() => setFilter('Satılık')}
            variant={filter === 'Satılık' ? 'default' : 'outline'}
            className={`transition-all ${
              filter === 'Satılık'
                ? 'bg-[#c87941] hover:bg-[#b86930] text-white'
                : 'hover:border-[#c87941] hover:text-[#c87941]'
            }`}
          >
            Satılık
          </Button>
          <Button
            onClick={() => setFilter('Kiralık')}
            variant={filter === 'Kiralık' ? 'default' : 'outline'}
            className={`transition-all ${
              filter === 'Kiralık'
                ? 'bg-[#c87941] hover:bg-[#b86930] text-white'
                : 'hover:border-[#c87941] hover:text-[#c87941]'
            }`}
          >
            Kiralık
          </Button>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <Card
              key={property.id}
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-[#c87941] text-white border-0">
                    {property.type}
                  </Badge>
                </div>
                <button
                  onClick={() => toggleFavorite(property.id)}
                  className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.includes(property.id)
                        ? 'fill-red-500 text-red-500'
                        : 'text-gray-600'
                    }`}
                  />
                </button>
                {property.featured && (
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-white text-[#1e3a5f] border-0 font-semibold">
                      Öne Çıkan
                    </Badge>
                  </div>
                )}
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <MapPin className="w-4 h-4 mr-1 text-[#c87941]" />
                  {property.location}
                </div>
                
                <h3 className="text-xl font-bold text-[#1e3a5f] mb-3 line-clamp-2">
                  {property.title}
                </h3>
                
                <div className="flex items-center justify-between mb-4 text-gray-600">
                  <div className="flex items-center">
                    <Bed className="w-4 h-4 mr-1" />
                    <span className="text-sm">{property.bedrooms}</span>
                  </div>
                  <div className="flex items-center">
                    <Bath className="w-4 h-4 mr-1" />
                    <span className="text-sm">{property.bathrooms}</span>
                  </div>
                  <div className="flex items-center">
                    <Maximize className="w-4 h-4 mr-1" />
                    <span className="text-sm">{property.area} m²</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    <div className="text-2xl font-bold text-[#c87941]">
                      ₺{parseFloat(property.price).toLocaleString('tr-TR')}
                    </div>
                  </div>
                  <Button
                    onClick={handleContact}
                    className="bg-[#1e3a5f] hover:bg-[#152a45] text-white transition-colors"
                  >
                    Detaylar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button
            onClick={handleContact}
            size="lg"
            className="bg-[#c87941] hover:bg-[#b86930] text-white px-8 py-6 text-lg transition-all hover:scale-105"
          >
            Tüm İlanları Görüntüle
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Properties;