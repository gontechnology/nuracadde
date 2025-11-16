# Nura Cadde Emlak - Real Estate Website

🏠 Modern, responsive emlak web sitesi - Bağdat Caddesi, Kadıköy

## 📋 Özellikler

- ✅ Modern ve responsive tasarım
- ✅ Emlak ilanları (Satılık/Kiralık filtreleme)
- ✅ Hizmetler bölümü
- ✅ Müşteri referansları
- ✅ İletişim formu
- ✅ WhatsApp entegrasyonu
- ✅ SEO uyumlu

## 🛠️ Teknolojiler

### Frontend
- React 19
- Tailwind CSS
- Shadcn/UI Components
- Axios
- React Router

### Backend
- FastAPI (Python)
- MongoDB
- Motor (Async MongoDB driver)

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler
- Node.js (v18+)
- Python (3.9+)
- Yarn
- MongoDB Atlas hesabı

### 1. Repository'yi Clone'la

```bash
git clone <repository-url>
cd <project-folder>
```

### 2. Backend Kurulumu

```bash
cd backend

# Virtual environment oluştur
python -m venv venv

# Virtual environment'ı aktif et
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Gereksinimleri yükle
pip install -r requirements.txt

# .env dosyasını oluştur
cp .env.example .env
# .env dosyasını düzenle ve MongoDB bilgilerini ekle

# Sunucuyu başlat
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

Backend şimdi çalışıyor: `http://localhost:8001`

### 3. Frontend Kurulumu

**Yeni terminal aç:**

```bash
cd frontend

# Paketleri yükle
yarn install

# .env dosyasını oluştur
cp .env.example .env
# .env dosyasını düzenle (gerekirse)

# Development sunucusunu başlat
yarn start
```

Frontend şimdi çalışıyor: `http://localhost:3000`

## 📦 Production Build

### Frontend Build

```bash
cd frontend
yarn build
```

Build dosyaları `frontend/build/` klasöründe oluşur.

### Backend Production

```bash
cd backend
uvicorn server:app --host 0.0.0.0 --port 8001
```

## 🌐 Deployment Seçenekleri

### Seçenek 1: Vercel (Frontend) + Render (Backend)

#### Frontend - Vercel:
1. GitHub'a push et
2. Vercel'e kayıt ol: https://vercel.com
3. New Project → GitHub reposunu seç
4. Root Directory: `frontend`
5. Environment Variables:
   ```
   REACT_APP_BACKEND_URL=https://your-backend-url.onrender.com
   ```
6. Deploy!

#### Backend - Render:
1. Render'a kayıt ol: https://render.com
2. New Web Service → GitHub reposunu seç
3. Root Directory: `backend`
4. Build Command: `pip install -r requirements.txt`
5. Start Command: `uvicorn server:app --host 0.0.0.0 --port $PORT`
6. Environment Variables:
   ```
   MONGO_URL=mongodb+srv://...
   DB_NAME=nuracadde_sa
   ```
7. Deploy!

### Seçenek 2: Netlify (Frontend) + Railway (Backend)

#### Frontend - Netlify:
1. Netlify'a kayıt ol: https://netlify.com
2. New site from Git → GitHub reposunu seç
3. Base directory: `frontend`
4. Build command: `yarn build`
5. Publish directory: `build`
6. Environment variables ekle
7. Deploy!

#### Backend - Railway:
1. Railway'e kayıt ol: https://railway.app
2. New Project → Deploy from GitHub
3. Root path: `backend`
4. Environment variables ekle
5. Deploy!

### Seçenek 3: VPS (Digital Ocean, Linode, Hetzner)

1. Ubuntu VPS satın al
2. Nginx + PM2 kur
3. Frontend build dosyalarını `/var/www/html` dizinine kopyala
4. Backend'i PM2 ile çalıştır
5. Nginx'i reverse proxy olarak ayarla
6. SSL sertifikası ekle (Let's Encrypt)

## 📧 İletişim Bilgileri

- **Telefon:** 0555 535 13 13
- **E-posta:** nurcan.ersoy@nuracadde.com / info@nuracadde.com
- **WhatsApp:** https://wa.me/905555351313
- **Konum:** Bağdat Caddesi, Kadıköy / İstanbul

## 🔧 Geliştirme

### Backend API Endpoints

- `GET /api/` - Health check
- `POST /api/status` - Create status check
- `GET /api/status` - Get all status checks

### Yeni Endpoint Ekleme

`backend/server.py` dosyasına yeni route'lar ekleyebilirsin:

```python
@api_router.get("/properties")
async def get_properties():
    properties = await db.properties.find().to_list(1000)
    return properties
```

### Frontend Component Ekleme

`frontend/src/components/` klasörüne yeni component'ler ekle.

## 📝 Environment Variables

### Backend (.env)
```
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/
DB_NAME=your_database_name
```

### Frontend (.env)
```
REACT_APP_BACKEND_URL=http://localhost:8001
```

**ÖNEMLİ:** Production'da `REACT_APP_BACKEND_URL`'i canlı backend URL'iniz ile değiştirin!

## 🐛 Sorun Giderme

### CORS Hatası
`backend/server.py` dosyasında CORS ayarlarını kontrol edin:
```python
allow_origins=["*"]  # Production'da frontend URL'ini ekleyin
```

### MongoDB Bağlantı Hatası
- `.env` dosyasındaki `MONGO_URL`'i kontrol edin
- MongoDB Atlas'ta IP whitelist ayarlarını kontrol edin (0.0.0.0/0)
- Database user'ın doğru yetkilerinin olduğundan emin olun

### Frontend Backend'e Ulaşamıyor
- `.env` dosyasındaki `REACT_APP_BACKEND_URL`'i kontrol edin
- Backend'in çalıştığından emin olun
- CORS ayarlarını kontrol edin

## 📄 Lisans

© 2025 Nura Cadde Emlak. Tüm hakları saklıdır.

---

**Geliştirici Notları:**
- Mock data `frontend/src/mockData.js` dosyasında
- Shadcn/UI components `frontend/src/components/ui/` klasöründe
- Backend models ve routes `backend/server.py` dosyasında

**Sonraki Adımlar:**
- [ ] Backend'e property endpoints ekle
- [ ] Admin panel oluştur
- [ ] İlan detay sayfası ekle
- [ ] Resim upload sistemi
- [ ] Email notification sistemi
- [ ] Google Analytics entegrasyonu