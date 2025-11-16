import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock form submission
    toast({
      title: "Mesajınız alındı!",
      description: "En kısa sürede size dönüş yapacağız.",
    });
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/905555351313', '_blank');
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1e3a5f] mb-4">
            İletişime Geçin
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Sorularınız için bize ulaşın, size yardımcı olmaktan mutluluk duyarız
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            {/* Phone */}
            <Card className="hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#c87941]">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[#c87941]/10 rounded-xl flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-[#c87941]" />
                </div>
                <h3 className="font-bold text-[#1e3a5f] mb-2">Telefon</h3>
                <a
                  href="tel:05555351313"
                  className="text-gray-600 hover:text-[#c87941] transition-colors"
                >
                  0555 535 13 13
                </a>
              </CardContent>
            </Card>

            {/* Email */}
            <Card className="hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#c87941]">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[#c87941]/10 rounded-xl flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-[#c87941]" />
                </div>
                <h3 className="font-bold text-[#1e3a5f] mb-2">E-posta</h3>
                <a
                  href="mailto:nurcan.ersoy@nuracadde.com"
                  className="text-gray-600 hover:text-[#c87941] transition-colors block mb-1"
                >
                  nurcan.ersoy@nuracadde.com
                </a>
                <a
                  href="mailto:info@nuracadde.com"
                  className="text-gray-600 hover:text-[#c87941] transition-colors block"
                >
                  info@nuracadde.com
                </a>
              </CardContent>
            </Card>

            {/* Location */}
            <Card className="hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#c87941]">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[#c87941]/10 rounded-xl flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-[#c87941]" />
                </div>
                <h3 className="font-bold text-[#1e3a5f] mb-2">Adres</h3>
                <p className="text-gray-600">
                  Bağdat Caddesi<br />
                  Kadıköy / İstanbul
                </p>
              </CardContent>
            </Card>

            {/* Working Hours */}
            <Card className="hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#c87941]">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-[#c87941]/10 rounded-xl flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-[#c87941]" />
                </div>
                <h3 className="font-bold text-[#1e3a5f] mb-2">Çalışma Saatleri</h3>
                <p className="text-gray-600">
                  Pazartesi - Cumartesi<br />
                  09:00 - 19:00
                </p>
              </CardContent>
            </Card>

            {/* WhatsApp CTA */}
            <Button
              onClick={handleWhatsApp}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg transition-all hover:scale-105"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              WhatsApp ile İletişim
            </Button>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-[#1e3a5f] mb-6">
                  Bize Mesaj Gönderin
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Adınız Soyadınız
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Örn: Ahmet Yılmaz"
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        E-posta
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="ornek@email.com"
                        required
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefon
                    </label>
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="0555 555 55 55"
                      required
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mesajınız
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Lütfen bize nasıl yardımcı olabileceğimizi anlatın..."
                      required
                      rows={6}
                      className="w-full"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#c87941] hover:bg-[#b86930] text-white py-6 text-lg transition-all hover:scale-[1.02]"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Mesaj Gönder
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;