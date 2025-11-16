# ⚡ Hızlı Başlangıç Rehberi

Bu dosya, projeyi hızlıca çalıştırman için kısa yol haritası!

---

## 🎯 Seçenekler

### 1️⃣ Sadece Test Etmek İstiyorum (Local)
→ **Süre:** 5 dakika
→ **Bkz:** [Local Test](#local-test)

### 2️⃣ GitHub'a Yüklemek İstiyorum
→ **Süre:** 2 dakika
→ **Bkz:** `GITHUB_PUSH.md`

### 3️⃣ Canlıya Almak İstiyorum (Deploy)
→ **Süre:** 10-15 dakika
→ **Bkz:** `DEPLOYMENT.md`

---

## 📦 Local Test

### Backend Çalıştır:

```bash
cd backend

# Virtual environment oluştur
python -m venv venv

# Aktif et
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Paketleri yükle
pip install -r requirements.txt

# Çalıştır
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

✅ Backend: `http://localhost:8001`

### Frontend Çalıştır:

**YENİ terminal aç:**

```bash
cd frontend

# Paketleri yükle
yarn install

# Çalıştır
yarn start
```

✅ Frontend: `http://localhost:3000`

---

## 🗂️ Proje Yapısı

```
/app
├── frontend/               # React uygulaması
│   ├── src/
│   │   ├── components/    # UI componentleri
│   │   ├── mockData.js    # Test verileri
│   │   └── App.js         # Ana uygulama
│   ├── package.json
│   └── .env.example       # Environment örneği
│
├── backend/               # FastAPI uygulaması
│   ├── server.py         # Ana backend dosyası
│   ├── requirements.txt  # Python gereksinimleri
│   └── .env.example      # Environment örneği
│
├── README.md             # Genel bilgiler
├── DEPLOYMENT.md         # Deploy rehberi
├── GITHUB_PUSH.md        # GitHub push rehberi
└── QUICK_START.md        # Bu dosya
```

---

## 🔑 Environment Variables

### Backend `.env`:
```
MONGO_URL=mongodb+srv://nuracadde_sa:o8Ypw3NDQtQvOitO@nuracadde.hyjsad4.mongodb.net/
DB_NAME=nuracadde_sa
```

### Frontend `.env`:
```
REACT_APP_BACKEND_URL=http://localhost:8001
```

**PROD:** Production'da backend URL'ini güncelle!

---

## 📋 Özellikler

- ✅ Responsive tasarım
- ✅ Modern UI (Tailwind + Shadcn)
- ✅ Emlak ilanları
- ✅ İletişim formu
- ✅ WhatsApp entegrasyonu
- ✅ SEO uyumlu
- ✅ MongoDB veritabanı

---

## 🚀 Deploy Önerisi

**En Kolay:** Vercel (Frontend) + Render (Backend)

1. GitHub'a push et → `GITHUB_PUSH.md`
2. Vercel'e deploy → `DEPLOYMENT.md` (Bölüm 1)
3. Render'a deploy → `DEPLOYMENT.md` (Bölüm 1)
4. ✅ Canlı!

**Toplam Süre:** ~15 dakika

---

## 📞 İletişim Bilgileri (Sitede)

- Telefon: 0555 535 13 13
- Email: nurcan.ersoy@nuracadde.com, info@nuracadde.com
- WhatsApp: 0555 535 13 13
- Konum: Bağdat Caddesi, Kadıköy

---

## ❓ Sık Sorulanlar

### Backend çalışmıyor?
```bash
# Logları kontrol et
tail -f backend_log.txt

# MongoDB bağlantısını test et
python -c "from pymongo import MongoClient; print(MongoClient('MONGO_URL').server_info())"
```

### Frontend backend'i bulamıyor?
- `.env` dosyasında `REACT_APP_BACKEND_URL` doğru mu?
- Backend çalışıyor mu? `http://localhost:8001/api/` test et

### Port zaten kullanımda?
```bash
# Port 8001'i öldür (Backend)
# Windows:
netstat -ano | findstr :8001
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:8001 | xargs kill -9

# Port 3000'i öldür (Frontend)
lsof -ti:3000 | xargs kill -9
```

---

## 📚 Daha Fazla Bilgi

- **Genel Bilgi:** `README.md`
- **Deployment:** `DEPLOYMENT.md`
- **GitHub Push:** `GITHUB_PUSH.md`

---

**Başarılar! 🎉**
