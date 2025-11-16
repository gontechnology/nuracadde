import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Mail, MailOpen, Trash2, Phone, Calendar } from 'lucide-react';
import { getContactMessages, markMessageRead, deleteMessage } from '../../utils/api';
import { useToast } from '../../hooks/use-toast';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const { toast } = useToast();

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const data = await getContactMessages(false);
      setMessages(data);
    } catch (error) {
      toast({
        title: "Hata",
        description: "Mesajlar yüklenirken bir hata oluştu",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await markMessageRead(id);
      loadMessages();
      toast({
        title: "Başarılı",
        description: "Mesaj okundu olarak işaretlendi"
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Mesaj işaretlenirken bir hata oluştu",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Mesajı silmek istediğinizden emin misiniz?')) return;

    try {
      await deleteMessage(id);
      loadMessages();
      toast({
        title: "Başarılı",
        description: "Mesaj silindi"
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Mesaj silinirken bir hata oluştu",
        variant: "destructive"
      });
    }
  };

  const filteredMessages = messages.filter(msg => {
    if (filter === 'unread') return !msg.read;
    if (filter === 'read') return msg.read;
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
            <h1 className="text-3xl font-bold text-gray-900">Mesajlar</h1>
            <p className="text-gray-600 mt-1">{filteredMessages.length} mesaj listeleniyor</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            className={filter === 'all' ? 'bg-[#1e3a5f]' : ''}
          >
            Tümü ({messages.length})
          </Button>
          <Button
            variant={filter === 'unread' ? 'default' : 'outline'}
            onClick={() => setFilter('unread')}
            className={filter === 'unread' ? 'bg-yellow-600' : ''}
          >
            Okunmamış ({messages.filter(m => !m.read).length})
          </Button>
          <Button
            variant={filter === 'read' ? 'default' : 'outline'}
            onClick={() => setFilter('read')}
            className={filter === 'read' ? 'bg-green-600' : ''}
          >
            Okunmuş ({messages.filter(m => m.read).length})
          </Button>
        </div>

        {/* Messages List */}
        {filteredMessages.length === 0 ? (
          <Card>
            <CardContent className="flex items-center justify-center h-64">
              <div className="text-center text-gray-500">
                <p className="text-lg font-medium">Mesaj bulunamadı</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredMessages.map((message) => (
              <Card
                key={message.id}
                className={`hover:shadow-lg transition-shadow ${!message.read ? 'border-l-4 border-l-yellow-500' : ''}`}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-lg text-gray-900">
                              {message.name}
                            </h3>
                            <Badge className={message.read ? 'bg-green-600' : 'bg-yellow-600'}>
                              {message.read ? 'Okundu' : 'Okunmadı'}
                            </Badge>
                          </div>
                          <div className="flex flex-col gap-1 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              <a href={`mailto:${message.email}`} className="hover:text-[#c87941]">
                                {message.email}
                              </a>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4" />
                              <a href={`tel:${message.phone}`} className="hover:text-[#c87941]">
                                {message.phone}
                              </a>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Calendar className="w-4 h-4" />
                              {new Date(message.created_at).toLocaleString('tr-TR')}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
                      </div>
                    </div>

                    <div className="flex lg:flex-col gap-2">
                      {!message.read && (
                        <Button
                          onClick={() => handleMarkRead(message.id)}
                          variant="outline"
                          size="sm"
                          className="flex-1 lg:flex-none"
                        >
                          <MailOpen className="w-4 h-4 lg:mr-0 mr-2" />
                          <span className="lg:hidden">Okundu</span>
                        </Button>
                      )}
                      <Button
                        onClick={() => handleDelete(message.id)}
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:bg-red-50 flex-1 lg:flex-none"
                      >
                        <Trash2 className="w-4 h-4 lg:mr-0 mr-2" />
                        <span className="lg:hidden">Sil</span>
                      </Button>
                    </div>
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

export default Messages;