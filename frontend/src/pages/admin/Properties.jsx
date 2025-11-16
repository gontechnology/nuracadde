import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Plus, Edit, Trash2, Eye, MapPin } from 'lucide-react';
import { getProperties, deleteProperty } from '../../utils/api';
import { useToast } from '../../hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      const data = await getProperties(false);
      setProperties(data);
    } catch (error) {
      console.error('Properties load error:', error);
      toast({
        title: "Hata",
        description: "İlanlar yüklenirken bir hata oluştu",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('İlanı silmek istediğinizden emin misiniz?')) return;

    try {
      await deleteProperty(id);
      toast({
        title: "Başarılı",
        description: "İlan başarıyla silindi"
      });
      loadProperties();
    } catch (error) {
      toast({
        title: "Hata",
        description: "İlan silinirken bir hata oluştu",
        variant: "destructive"
      });
    }
  };

  const filteredProperties = properties.filter(prop => {
    if (filter === 'active') return prop.active;
    if (filter === 'inactive') return !prop.active;
    if (filter === 'sale') return prop.type === 'Satılık';
    if (filter === 'rent') return prop.type === 'Kiralık';
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
            <h1 className="text-3xl font-bold text-gray-900">İlan Yönetimi</h1>
            <p className="text-gray-600 mt-1">{filteredProperties.length} ilan listeleniyor</p>
          </div>
          <Button
            onClick={() => navigate('/admin/properties/new')}
            className="bg-[#c87941] hover:bg-[#b86930] text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Yeni İlan
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            className={filter === 'all' ? 'bg-[#1e3a5f]' : ''}
          >
            Tümü ({properties.length})
          </Button>
          <Button
            variant={filter === 'active' ? 'default' : 'outline'}
            onClick={() => setFilter('active')}
            className={filter === 'active' ? 'bg-green-600' : ''}
          >
            Aktif ({properties.filter(p => p.active).length})
          </Button>
          <Button
            variant={filter === 'inactive' ? 'default' : 'outline'}
            onClick={() => setFilter('inactive')}
            className={filter === 'inactive' ? 'bg-gray-600' : ''}
          >
            Pasif ({properties.filter(p => !p.active).length})
          </Button>
          <Button
            variant={filter === 'sale' ? 'default' : 'outline'}
            onClick={() => setFilter('sale')}
            className={filter === 'sale' ? 'bg-blue-600' : ''}
          >
            Satılık ({properties.filter(p => p.type === 'Satılık').length})
          </Button>
          <Button
            variant={filter === 'rent' ? 'default' : 'outline'}
            onClick={() => setFilter('rent')}
            className={filter === 'rent' ? 'bg-purple-600' : ''}
          >
            Kiralık ({properties.filter(p => p.type === 'Kiralık').length})
          </Button>
        </div>

        {/* Properties Grid */}
        {filteredProperties.length === 0 ? (
          <Card>
            <CardContent className="flex items-center justify-center h-64">
              <div className="text-center text-gray-500">
                <p className="text-lg font-medium">Henüz ilan yok</p>
                <p className="text-sm mt-1">Yeni ilan eklemek için üst köşedeki butona tıklayın</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <Card key={property.id} className="hover:shadow-lg transition-shadow">
                <div className="relative">
                  {property.images && property.images[0] ? (
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
                      <span className="text-gray-400">Resim yok</span>
                    </div>
                  )}
                  <div className="absolute top-2 left-2 flex gap-2">
                    <Badge className={property.active ? 'bg-green-600' : 'bg-gray-600'}>
                      {property.active ? 'Aktif' : 'Pasif'}
                    </Badge>
                    <Badge className="bg-[#c87941]">{property.type}</Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-lg text-gray-900 line-clamp-2">
                      {property.title}
                    </h3>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    {property.location}
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-[#c87941]">
                      ₺{parseFloat(property.price).toLocaleString('tr-TR')}
                    </span>
                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                      <Eye className="w-4 h-4" />
                      <span>{property.views || 0}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => navigate(`/admin/properties/edit/${property.id}`)}
                      variant="outline"
                      className="flex-1"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Düzenle
                    </Button>
                    <Button
                      onClick={() => handleDelete(property.id)}
                      variant="outline"
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
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

export default Properties;