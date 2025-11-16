import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Star, CheckCircle, Trash2, Calendar, MapPin } from 'lucide-react';
import { getTestimonials, approveTestimonial, deleteTestimonial } from '../../utils/api';
import { useToast } from '../../hooks/use-toast';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const { toast } = useToast();

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const data = await getTestimonials(false);
      setTestimonials(data);
    } catch (error) {
      toast({
        title: "Hata",
        description: "Referanslar yüklenirken bir hata oluştu",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await approveTestimonial(id);
      loadTestimonials();
      toast({
        title: "Başarılı",
        description: "Referans onaylandı"
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Referans onaylanırken bir hata oluştu",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Referansı silmek istediğinizden emin misiniz?')) return;

    try {
      await deleteTestimonial(id);
      loadTestimonials();
      toast({
        title: "Başarılı",
        description: "Referans silindi"
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Referans silinirken bir hata oluştu",
        variant: "destructive"
      });
    }
  };

  const filteredTestimonials = testimonials.filter(test => {
    if (filter === 'pending') return !test.approved;
    if (filter === 'approved') return test.approved;
    return true;
  });

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Yükleniyor...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Referanslar</h1>
            <p className="text-gray-600 mt-1">{filteredTestimonials.length} referans listeleniyor</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            className={filter === 'all' ? 'bg-[#1e3a5f]' : ''}
          >
            Tümü ({testimonials.length})
          </Button>
          <Button
            variant={filter === 'pending' ? 'default' : 'outline'}
            onClick={() => setFilter('pending')}
            className={filter === 'pending' ? 'bg-yellow-600' : ''}
          >
            Bekliyor ({testimonials.filter(t => !t.approved).length})
          </Button>
          <Button
            variant={filter === 'approved' ? 'default' : 'outline'}
            onClick={() => setFilter('approved')}
            className={filter === 'approved' ? 'bg-green-600' : ''}
          >
            Onaylı ({testimonials.filter(t => t.approved).length})
          </Button>
        </div>

        {/* Testimonials Grid */}
        {filteredTestimonials.length === 0 ? (
          <Card>
            <CardContent className="flex items-center justify-center h-64">
              <div className="text-center text-gray-500">
                <p className="text-lg font-medium">Referans bulunamadı</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredTestimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className={`hover:shadow-lg transition-shadow ${!testimonial.approved ? 'border-l-4 border-l-yellow-500' : ''}`}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-lg text-gray-900">
                          {testimonial.name}
                        </h3>
                        <Badge className={testimonial.approved ? 'bg-green-600' : 'bg-yellow-600'}>
                          {testimonial.approved ? 'Onaylı' : 'Bekliyor'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <MapPin className="w-4 h-4" />
                        {testimonial.location}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {new Date(testimonial.date).toLocaleDateString('tr-TR')}
                      </div>
                    </div>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-[#c87941] text-[#c87941]" />
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4 mb-4">
                    <p className="text-gray-700 italic">"{testimonial.comment}"</p>
                  </div>

                  <div className="flex gap-2">
                    {!testimonial.approved && (
                      <Button
                        onClick={() => handleApprove(testimonial.id)}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Onayla
                      </Button>
                    )}
                    <Button
                      onClick={() => handleDelete(testimonial.id)}
                      variant="outline"
                      className={`text-red-600 hover:bg-red-50 ${!testimonial.approved ? '' : 'flex-1'}`}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Sil
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Testimonials;