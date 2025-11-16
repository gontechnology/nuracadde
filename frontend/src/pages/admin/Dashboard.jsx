import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Home, MessageSquare, Star, Eye, TrendingUp, AlertCircle } from 'lucide-react';
import { getDashboardStats } from '../../utils/api';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error('Stats load error:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Toplam İlan',
      value: stats?.total_properties || 0,
      icon: Home,
      color: 'bg-blue-500',
      subtext: `${stats?.active_properties || 0} aktif`
    },
    {
      title: 'Mesajlar',
      value: stats?.total_messages || 0,
      icon: MessageSquare,
      color: 'bg-green-500',
      subtext: `${stats?.unread_messages || 0} okunmamış`
    },
    {
      title: 'Referanslar',
      value: stats?.total_testimonials || 0,
      icon: Star,
      color: 'bg-yellow-500',
      subtext: `${stats?.pending_testimonials || 0} bekliyor`
    },
    {
      title: 'Toplam Görüntüleme',
      value: stats?.total_views || 0,
      icon: Eye,
      color: 'bg-purple-500',
      subtext: 'İlan görüntülenmeleri'
    },
  ];

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
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Hoş geldiniz! İşte sisteminizin genel bakışı.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        {stat.title}
                      </p>
                      <p className="text-3xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {stat.subtext}
                      </p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-full`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Hızlı İstatistikler
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Aktif İlan Oranı</span>
                  <span className="font-bold text-green-600">
                    {stats?.total_properties > 0
                      ? Math.round((stats.active_properties / stats.total_properties) * 100)
                      : 0}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Okunmamış Mesaj Oranı</span>
                  <span className="font-bold text-yellow-600">
                    {stats?.total_messages > 0
                      ? Math.round((stats.unread_messages / stats.total_messages) * 100)
                      : 0}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Ortalama İlan Görüntülemesi</span>
                  <span className="font-bold text-blue-600">
                    {stats?.total_properties > 0
                      ? Math.round(stats.total_views / stats.total_properties)
                      : 0}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Dikkat Gereken Konular
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats?.unread_messages > 0 && (
                  <div className="flex items-center gap-2 text-sm text-yellow-700 bg-yellow-50 p-3 rounded-lg">
                    <MessageSquare className="w-4 h-4" />
                    <span>{stats.unread_messages} okunmamış mesaj var</span>
                  </div>
                )}
                {stats?.pending_testimonials > 0 && (
                  <div className="flex items-center gap-2 text-sm text-blue-700 bg-blue-50 p-3 rounded-lg">
                    <Star className="w-4 h-4" />
                    <span>{stats.pending_testimonials} referans onay bekliyor</span>
                  </div>
                )}
                {stats?.unread_messages === 0 && stats?.pending_testimonials === 0 && (
                  <div className="text-sm text-green-700 bg-green-50 p-3 rounded-lg">
                    ✅ Her şey tamamlanmış!
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;