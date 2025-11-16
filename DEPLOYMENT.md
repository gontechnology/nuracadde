# 🚀 Nura Cadde Emlak - Deployment Rehberi

Bu rehber, projeyi farklı platformlara nasıl deploy edeceğinizi adım adım anlatır.

---

## 📋 İçindekiler

1. [Hızlı Başlangıç - Vercel + Render](#1-vercel--render-en-kolay)
2. [Netlify + Railway](#2-netlify--railway)
3. [VPS Deployment](#3-vps-deployment)
4. [Domain Bağlama](#4-domain-bağlama)

---

## 1. Vercel + Render (EN KOLAY) ⭐

### A) Frontend - Vercel'e Deploy

#### 1. GitHub'a Push Et
```bash
# Projenin ana dizininde
git init
git add .
git commit -m "Initial commit - Nura Cadde Emlak"
git remote add origin <GITHUB_REPO_URL>
git push -u origin main
```

#### 2. Vercel'e Deploy
1. **https://vercel.com** adresine git ve GitHub ile giriş yap
2. **"Add New Project"** butonuna tıkla
3. GitHub reposunu seç
4. **Framework Preset:** Create React App
5. **Root Directory:** `frontend` yaz
6. **Build Command:** `yarn build` (otomatik gelir)
7. **Output Directory:** `build` (otomatik gelir)
8. **Environment Variables** ekle:
   ```
   REACT_APP_BACKEND_URL = https://your-backend-url.onrender.com
   ```
   (Backend URL'ini adım B'den sonra alıp buraya ekleyeceksin)
9. **Deploy** butonuna bas!

#### 3. Vercel URL'ini Kaydet
Deploy bittikten sonra:
```
https://nuracadde-frontend.vercel.app
```
gibi bir URL alacaksın. Bunu kaydet!

---

### B) Backend - Render'a Deploy

#### 1. Render'a Kayıt Ol
**https://render.com** adresine git ve GitHub ile giriş yap

#### 2. Web Service Oluştur
1. **"New +"** butonu → **"Web Service"**
2. GitHub reposunu seç
3. **Name:** `nuracadde-backend`
4. **Root Directory:** `backend`
5. **Runtime:** Python 3
6. **Build Command:**
   ```
   pip install -r requirements.txt
   ```
7. **Start Command:**
   ```
   uvicorn server:app --host 0.0.0.0 --port $PORT
   ```
8. **Instance Type:** Free

#### 3. Environment Variables Ekle
**Environment** sekmesine git ve ekle:
```
MONGO_URL = mongodb+srv://nuracadde_sa:o8Ypw3NDQtQvOitO@nuracadde.hyjsad4.mongodb.net/
DB_NAME = nuracadde_sa
```

#### 4. Deploy Butonuna Bas!
Deploy bittikten sonra:
```
https://nuracadde-backend.onrender.com
```
gibi bir URL alacaksın.

#### 5. Backend URL'ini Frontend'e Ekle
**ÖNEMLİ:** Şimdi Vercel'e geri dön!
1. Vercel dashboard → Projen → **Settings** → **Environment Variables**
2. `REACT_APP_BACKEND_URL`'i güncelle:
   ```
   REACT_APP_BACKEND_URL = https://nuracadde-backend.onrender.com
   ```
3. **Redeploy** yap (Deployments sekmesinden)

---

### C) CORS Ayarı (Backend)

**ÖNEMLİ:** Backend'de CORS ayarını yap!

`backend/server.py` dosyasını aç ve güncelle:

```python
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=[
        "http://localhost:3000",
        "https://nuracadde-frontend.vercel.app",  # Senin Vercel URL'in
        "https://*.vercel.app",  # Tüm Vercel domainleri
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Değişikliği GitHub'a push et, Render otomatik deploy eder.

---

### D) Test Et!

1. Vercel URL'ini aç: `https://nuracadde-frontend.vercel.app`
2. Developer Console'u aç (F12)
3. Network sekmesine bak, backend'e istek gidiyor mu?
4. İletişim formu ve diğer özellikleri test et!

---

## 2. Netlify + Railway

### A) Frontend - Netlify

#### 1. Netlify'a Kayıt Ol
**https://netlify.com** adresine git

#### 2. Site Oluştur
1. **"Add new site"** → **"Import from Git"**
2. GitHub reposunu seç
3. **Base directory:** `frontend`
4. **Build command:** `yarn build`
5. **Publish directory:** `frontend/build`
6. **Environment variables:**
   ```
   REACT_APP_BACKEND_URL = https://your-backend.railway.app
   ```
7. **Deploy!**

### B) Backend - Railway

#### 1. Railway'e Kayıt Ol
**https://railway.app** adresine git

#### 2. Proje Oluştur
1. **"New Project"** → **"Deploy from GitHub"**
2. GitHub reposunu seç
3. **Root path:** `backend`
4. **Environment variables ekle:**
   ```
   MONGO_URL = mongodb+srv://nuracadde_sa:o8Ypw3NDQtQvOitO@nuracadde.hyjsad4.mongodb.net/
   DB_NAME = nuracadde_sa
   PORT = 8001
   ```
5. Railway otomatik başlatır!

#### 3. Public URL Al
1. Settings → **"Generate Domain"**
2. URL'i kopyala: `https://nuracadde-backend.railway.app`

#### 4. Netlify'da Frontend'i Güncelle
1. Site settings → Environment variables
2. `REACT_APP_BACKEND_URL`'i güncelle
3. Redeploy yap

---

## 3. VPS Deployment (Ubuntu)

### Gereksinimler
- Ubuntu 20.04+ VPS (Digital Ocean, Linode, Hetzner)
- Root erişimi
- Domain (opsiyonel)

### A) VPS'e Bağlan

```bash
ssh root@YOUR_VPS_IP
```

### B) Sistem Güncellemesi

```bash
apt update && apt upgrade -y
```

### C) Gerekli Programları Yükle

```bash
# Node.js ve Yarn
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
apt install -y nodejs
npm install -g yarn

# Python
apt install -y python3 python3-pip python3-venv

# Nginx
apt install -y nginx

# PM2 (Process Manager)
npm install -g pm2

# Certbot (SSL)
apt install -y certbot python3-certbot-nginx
```

### D) Projeyi Clone'la

```bash
cd /var/www
git clone <YOUR_GITHUB_REPO> nuracadde
cd nuracadde
```

### E) Backend Kurulumu

```bash
cd /var/www/nuracadde/backend

# Virtual environment
python3 -m venv venv
source venv/bin/activate

# Gereksinimleri yükle
pip install -r requirements.txt

# .env dosyasını oluştur
cat > .env << EOF
MONGO_URL=mongodb+srv://nuracadde_sa:o8Ypw3NDQtQvOitO@nuracadde.hyjsad4.mongodb.net/
DB_NAME=nuracadde_sa
EOF

# PM2 ile başlat
pm2 start "uvicorn server:app --host 0.0.0.0 --port 8001" --name nuracadde-backend
pm2 save
pm2 startup
```

### F) Frontend Build

```bash
cd /var/www/nuracadde/frontend

# .env oluştur
cat > .env << EOF
REACT_APP_BACKEND_URL=https://api.nuracadde.com
EOF

# Paketleri yükle ve build et
yarn install
yarn build

# Build dosyalarını Nginx dizinine kopyala
mkdir -p /var/www/nuracadde-frontend
cp -r build/* /var/www/nuracadde-frontend/
```

### G) Nginx Ayarları

#### Frontend için:

```bash
cat > /etc/nginx/sites-available/nuracadde-frontend << 'EOF'
server {
    listen 80;
    server_name nuracadde.com www.nuracadde.com;
    
    root /var/www/nuracadde-frontend;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

ln -s /etc/nginx/sites-available/nuracadde-frontend /etc/nginx/sites-enabled/
```

#### Backend için:

```bash
cat > /etc/nginx/sites-available/nuracadde-backend << 'EOF'
server {
    listen 80;
    server_name api.nuracadde.com;
    
    location / {
        proxy_pass http://127.0.0.1:8001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

ln -s /etc/nginx/sites-available/nuracadde-backend /etc/nginx/sites-enabled/
```

#### Nginx'i test et ve başlat:

```bash
nginx -t
systemctl restart nginx
```

### H) SSL Sertifikası (Let's Encrypt)

```bash
# Frontend için
certbot --nginx -d nuracadde.com -d www.nuracadde.com

# Backend için
certbot --nginx -d api.nuracadde.com
```

### I) Otomatik Yenileme

```bash
# Certbot otomatik yenileme testi
certbot renew --dry-run
```

### J) Firewall Ayarları

```bash
ufw allow 'Nginx Full'
ufw allow OpenSSH
ufw enable
```

---

## 4. Domain Bağlama

### A) Domain DNS Ayarları

Domain sağlayıcınızda (GoDaddy, Namecheap, vb.) DNS ayarlarını yapın:

#### Vercel/Netlify için:
```
A Record:     @           →  Vercel/Netlify IP (platform sağlar)
CNAME Record: www         →  nuracadde-frontend.vercel.app
CNAME Record: api         →  nuracadde-backend.onrender.com
```

#### VPS için:
```
A Record:     @           →  YOUR_VPS_IP
A Record:     www         →  YOUR_VPS_IP
A Record:     api         →  YOUR_VPS_IP
```

### B) Platform'da Domain Ekle

#### Vercel:
1. Project Settings → Domains
2. Domain ekle: `nuracadde.com`
3. DNS ayarlarını takip et

#### Netlify:
1. Site settings → Domain management
2. Add custom domain
3. DNS ayarlarını doğrula

---

## 🔧 Sorun Giderme

### CORS Hatası
```python
# backend/server.py
allow_origins=[
    "https://your-frontend-domain.com",
    "http://localhost:3000",  # Development için
]
```

### MongoDB Bağlantı Hatası
1. MongoDB Atlas'ta IP whitelist kontrol et (0.0.0.0/0)
2. Database user''ın doğru yetkilerini kontrol et
3. Connection string'i doğrula

### Build Hatası
```bash
# Cache'i temizle
cd frontend
rm -rf node_modules yarn.lock
yarn install
yarn build
```

### PM2 Logları Görüntüleme (VPS)
```bash
pm2 logs nuracadde-backend
pm2 status
pm2 restart nuracadde-backend
```

---

## ✅ Checklist

### Deploy Öncesi:
- [ ] MongoDB Atlas kuruldu ve bağlantı test edildi
- [ ] .env dosyaları doğru ayarlandı
- [ ] .gitignore kontrol edildi (.env dahil değil)
- [ ] Local'de her şey çalışıyor

### Deploy Sonrası:
- [ ] Frontend canlı ve erişilebilir
- [ ] Backend canlı ve API çalışıyor
- [ ] Frontend-Backend iletişimi çalışıyor
- [ ] İletişim formu test edildi
- [ ] WhatsApp butonu çalışıyor
- [ ] Mobile responsive test edildi
- [ ] SSL sertifikası aktif (HTTPS)
- [ ] Domain doğru yönleniyor

---

## 📞 Destek

Soruların varsa:
- GitHub Issues: <REPO_URL>/issues
- Email: info@nuracadde.com

**İyi deploy'lar! 🚀**