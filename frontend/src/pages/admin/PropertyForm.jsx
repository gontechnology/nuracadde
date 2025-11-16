import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Label } from '../../components/ui/label';
import { Switch } from '../../components/ui/switch';
import { Upload, X } from 'lucide-react';
import { createProperty, updateProperty, getProperty, uploadImage } from '../../utils/api';
import { useToast } from '../../hooks/use-toast';

const PropertyForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    type: 'Satılık',
    bedrooms: 1,
    bathrooms: 1,
    area: 0,
    description: '',
    images: [],
    featured: false,
    active: true
  });

  useEffect(() => {
    if (isEdit) {
      loadProperty();
    }
  }, [id]);

  const loadProperty = async () => {
    try {
      const data = await getProperty(id);
      setFormData(data);
    } catch (error) {
      toast({
        title: "Hata",
        description: "İlan yüklenirken bir hata oluştu",
        variant: "destructive"
      });
      navigate('/admin/properties');
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    const uploadedUrls = [];

    try {
      for (const file of files) {
        const result = await uploadImage(file);
        uploadedUrls.push(`${process.env.REACT_APP_BACKEND_URL}${result.url}`);
      }

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls]
      }));

      toast({
        title: "Başarılı",
        description: `${files.length} resim yüklendi`
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Resim yüklenirken bir hata oluştu",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEdit) {
        await updateProperty(id, formData);
        toast({
          title: "Başarılı",
          description: "İlan güncellendi"
        });
      } else {
        await createProperty(formData);
        toast({
          title: "Başarılı",
          description: "İlan oluşturuldu"
        });
      }
      navigate('/admin/properties');
    } catch (error) {
      toast({
        title: "Hata",
        description: "İlan kaydedilirken bir hata oluştu",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {isEdit ? 'İlan Düzenle' : 'Yeni İlan'}
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Temel Bilgiler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Title */}
              <div>
                <Label htmlFor="title">Başlık *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="örn: 4+1 Lüks Daire - Bağdat Caddesi"
                  required
                />
              </div>

              {/* Location */}
              <div>
                <Label htmlFor="location">Konum *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  placeholder="örn: Bağdat Caddesi, Kadıköy"
                  required
                />
              </div>

              {/* Type & Price */}
              <div className="grid grid-cols-2 gap-4"}
                <div>
                  <Label>Tür *</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => handleChange('type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Satılık">Satılık</SelectItem>
                      <SelectItem value="Kiralık">Kiralık</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="price">Fiyat (₺) *</Label>
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={(e) => handleChange('price', e.target.value)}
                    placeholder="örn: 5000000"
                    required
                  />
                </div>
              </div>

              {/* Bedrooms, Bathrooms, Area */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="bedrooms">Oda Sayısı *</Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    min="1"
                    value={formData.bedrooms}
                    onChange={(e) => handleChange('bedrooms', parseInt(e.target.value))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="bathrooms">Banyo Sayısı *</Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    min="1"
                    value={formData.bathrooms}
                    onChange={(e) => handleChange('bathrooms', parseInt(e.target.value))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="area">Alan (m²) *</Label>
                  <Input
                    id="area"
                    type="number"
                    min="0"
                    value={formData.area}
                    onChange={(e) => handleChange('area', parseInt(e.target.value))}
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Açıklama</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="İlan hakkında detaylı bilgi..."
                  rows={5}
                />
              </div>

              {/* Images */}
              <div>
                <Label>Resimler</Label>
                <div className="mt-2">
                  <label className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center cursor-pointer hover:border-[#c87941] transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">
                      {uploading ? 'Yükleniyor...' : 'Resim seçmek için tıklayın'}
                    </span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                      disabled={uploading}
                    />
                  </label>
                </div>

                {/* Image Preview */}
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {formData.images.map((img, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={img}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Toggles */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="featured">Öne Çıkan İlan</Label>
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => handleChange('featured', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="active">Aktif</Label>
                  <Switch
                    id="active"
                    checked={formData.active}
                    onCheckedChange={(checked) => handleChange('active', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-4 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/properties')}
              className="flex-1"
            >
              İptal
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#c87941] hover:bg-[#b86930]"
              disabled={loading}
            >
              {loading ? 'Kaydediliyor...' : 'Kaydet'}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default PropertyForm;