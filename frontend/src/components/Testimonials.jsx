import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { testimonials } from '../mockData';

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1e3a5f] mb-4">
            Müşteri Yorumları
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Müşterilerimizin memnuniyeti bizim en büyük başarımızdır
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="relative overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#c87941]"
            >
              <CardContent className="p-8">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-10">
                  <Quote className="w-16 h-16 text-[#c87941]" />
                </div>

                {/* Rating */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-[#c87941] text-[#c87941]"
                    />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-gray-600 mb-6 leading-relaxed italic">
                  "{testimonial.comment}"
                </p>

                {/* Author Info */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                  <div>
                    <h4 className="font-bold text-[#1e3a5f]">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(testimonial.date).toLocaleDateString('tr-TR', {
                      year: 'numeric',
                      month: 'long'
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2a5080] rounded-2xl p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              Siz de Mutlu Müşterilerimizden Biri Olun!
            </h3>
            <p className="text-gray-200 text-lg mb-8">
              Hayalinizdeki evi bulmak için bize ulaşın
            </p>
            <button
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-[#c87941] hover:bg-[#b86930] text-white px-8 py-4 rounded-xl font-semibold transition-all hover:scale-105 inline-block"
            >
              Hemen İletişime Geçin
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;