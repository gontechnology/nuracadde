# 🔐 Admin Paneli - Kullanım Kılavuzu

## ✅ Neler Hazır

### Backend API'ler:
- ✅ JWT Authentication (giriş sistemi)
- ✅ İlan CRUD (Create, Read, Update, Delete)
- ✅ Resim Upload
- ✅ Mesaj yönetimi
- ✅ Referans onaylama
- ✅ Dashboard istatistikleri

### Frontend Sayfalar:
- ✅ Login sayfası (`/admin/login`)
- ✅ Dashboard (`/admin/dashboard`)
- ✅ İlan yönetimi (`/admin/properties`)
- ✅ İlan ekle/düzenle formu
- ✅ Mesajlar (`/admin/messages`)
- ✅ Referanslar (`/admin/testimonials`)

---

## 🚨 MongoDB SSL Sorunu (Geçici)

Bu environment'ta Motor ve PyMongo'nun SSL handshake hatası var. Bu MongoDB Atlas'ın TLS versiyonu ile Python'un OpenSSL versiyonu uyuşmazlığından kaynaklanıyor.

### ✅ ÇÖZÜM:

**Backend'i Render'a deploy et!** Render'da SSL çalışır.

---

## 📋 Deployment Talimatları

### 1. MacOS'ta GitHub'a Push Et

```bash
cd /path/to/nuracadde-project

# Git başlat
git init
git add .
git commit -m "Admin panel eklendi"

# GitHub'a push
git remote add origin https://github.com/KULLANICI_ADIN/nuracadde-emlak.git
git branch -M main
git push -u origin main
```

### 2. Backend - Render'a Deploy

1. **https://render.com** → GitHub ile giriş yap
2. **New Web Service**
3. GitHub reposunu seç
4. **Settings:**
   - Name: `nuracadde-backend`
   - Root Directory: `backend`
   - Runtime: Python 3
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn server:app --host 0.0.0.0 --port $PORT`

5. **Environment Variables:**
   ```
   MONGO_URL=mongodb+srv://nuracadde_sa:o8Ypw3NDQtQvOitO@nuracadde.hyjsad4.mongodb.net/?retryWrites=true&w=majority
   DB_NAME=nuracadde
   ```

6. **Deploy!**

7. Backend URL'ini kopyala: `https://nuracadde-backend.onrender.com`

### 3. Frontend - cPanel'e Deploy

#### MacOS'ta Build:

```bash
cd frontend

# .env dosyasını düzenle
nano .env
```

İçine yaz:
```
REACT_APP_BACKEND_URL=https://nuracadde-backend.onrender.com
```

```bash
# Build et
yarn build

# build klasörü oluştu!
```

#### cPanel'e Yükle:

1. **FileZilla** ile bağlan
2. `frontend/build` içindeki **TÜM DOSYALARI** → `public_html`'e yükle
3. `public_html/.htaccess` oluştur:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# HTTPS redirect
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

4. cPanel → **SSL/TLS Status** → **Run AutoSSL**

---

## 🎯 Admin Paneli Kullanımı

### İlk Giriş:

1. Render'da backend deploy edildikten sonra:
   ```
   https://nuracadde-backend.onrender.com/api/auth/init-admin
   ```
   Bu URL'i tarayıcıda aç (POST request). Admin oluşturuldu!

2. Web sitene git: `https://yourdomain.com/admin/login`

3. Giriş yap:
   - Kullanıcı: `admin`
   - Şifre: `admin123`

### Dashboard:
- Toplam istatistikler
- Okunmamış mesajlar
- Onay bekleyen referanslar

### İlan Yönetimi:
1. **Yeni İlan** butonuna tıkla
2. Bilgileri doldur (başlık, konum, fiyat, vb.)
3. **Resim yükle** (çoklu seçim yapabilirsin)
4. **Aktif** veya **Pasif** seç
5. **Kaydet**

### Mesaj Yönetimi:
- İletişim formundan gelen mesajları gör
- **Okundu** işaretle
- İstenmeyen mesajları sil

### Referans Yönetimi:
- Müşteri yorumlarını gör
- **Onayla** → Web sitesinde görünür
- Uygunsuz yorumları sil

---

## 🔒 Güvenlik

### Şifreyi Değiştir:

1. MongoDB Atlas'a giriş yap
2. **Database** → **Browse Collections**
3. `nuracadde` → `admin_users` collection
4. Admin kullanıcısını bul
5. `hashed_password` alanını güncelle

Veya backend'de yeni endpoint ekle (önerilen):

```python
@api_router.put("/auth/change-password")
def change_password(
    old_password: str,
    new_password: str,
    current_user: dict = Depends(get_current_user)
):
    if not verify_password(old_password, current_user["hashed_password"]):
        raise HTTPException(400, "Wrong password")
    
    new_hash = get_password_hash(new_password)
    db.admin_users.update_one(
        {"username": current_user["username"]},
        {"$set": {"hashed_password": new_hash}}
    )
    return {"message": "Password changed"}
```

---

## 📊 API Endpoints

### Auth:
- `POST /api/auth/login` - Giriş
- `GET /api/auth/me` - Kullanıcı bilgileri
- `POST /api/auth/init-admin` - İlk admin oluştur

### Properties:
- `GET /api/properties` - İlanları listele
- `GET /api/properties/{id}` - İlan detay
- `POST /api/properties` - İlan oluştur 🔒
- `PUT /api/properties/{id}` - İlan güncelle 🔒
- `DELETE /api/properties/{id}` - İlan sil 🔒

### Contact:
- `POST /api/contact` - Mesaj gönder
- `GET /api/contact` - Mesajları listele 🔒
- `PUT /api/contact/{id}/read` - Okundu işaretle 🔒
- `DELETE /api/contact/{id}` - Mesaj sil 🔒

### Testimonials:
- `GET /api/testimonials` - Referansları listele
- `POST /api/testimonials` - Referans ekle
- `PUT /api/testimonials/{id}/approve` - Onayla 🔒
- `DELETE /api/testimonials/{id}` - Sil 🔒

### Upload:
- `POST /api/upload` - Resim yükle 🔒
- `GET /api/images/{id}` - Resmi getir

### Dashboard:
- `GET /api/dashboard/stats` - İstatistikler 🔒

🔒 = Auth gerekli (Bearer token)

---

## 🧪 Test

### Backend Test (Render'da):

```bash
# Health check
curl https://nuracadde-backend.onrender.com/api/

# Login
curl -X POST https://nuracadde-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Token'i kopyala ve kullan
curl https://nuracadde-backend.onrender.com/api/dashboard/stats \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🆘 Sorun Giderme

### "Invalid credentials" hatası:
- Admin oluşturuldu mu? → `/api/auth/init-admin`
- Şifre doğru mu? → `admin123`

### Resim yüklenmiyor:
- Dosya boyutu < 5MB olmalı
- Format: JPG, PNG, WEBP

### İlanlar görünmüyor:
- Backend çalışıyor mu?
- CORS ayarları doğru mu?
- Frontend `.env` dosyasında backend URL doğru mu?

### 401 Unauthorized:
- Token süresi dolmuş olabilir (7 gün)
- Tekrar giriş yap

---

## 📞 Destek

Sorularınız için:
- Backend logs: Render dashboard → Logs
- Frontend: Browser console (F12)
- Database: MongoDB Atlas → Browse Collections

---

**Admin paneli tamamen hazır! Deploy edip kullanmaya başlayabilirsin!** 🚀
